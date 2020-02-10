// new MVVM()
// 解析指令 Compile
// 更新视图 Update

const compileUtil = {
    getVal(expr,vm){
        return expr.split('.').reduce((data,currentVal)=>{
            return data[currentVal];
        },vm.$data)
    },
    setVal(expr,vm,inputVal){
        return expr.split('.').reduce((data,currentVal)=>{
            data[currentVal] = inputVal ;
        },vm.$data)
    },
    getContentVal(expr,vm){
        return expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            return this.getVal(args[1],vm);
        })
    },
    text(node, expr, vm){   //expr:msg
        let value
        if(expr.includes('{{')){
            // {{dd}}----{{bb}}
            value = expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
                // 绑定观察者，将来数据发生变化，触发这里的回调，进行视图的更新
                new Watcher(vm,args[1],(newVal)=>{
                    this.updater.textUpdater(node,this.getContentVal(expr,vm));
                })
                return this.getVal(args[1],vm);
            })
        }else{
            value = this.getVal(expr,vm);
        }
    
        this.updater.textUpdater(node,value);
    },
    html(node, expr, vm){
        const value = this.getVal(expr,vm)
        new Watcher(vm,expr,(newVal)=>{
            this.updater.htmlUpdater(node,newVal);
        })
        this.updater.htmlUpdater(node,value);
    },
    model(node, expr, vm){
        const value = this.getVal(expr,vm);
        // 绑定更新函数 数据=》视图
        new Watcher(vm,expr,(newVal)=>{
            this.updater.modelUpdater(node,newVal);
        })
        // 视图 =》数据 =》 视图
        node.addEventListener('input',e=>{
            // 设置值
            this.setVal(expr,vm,e.target.value);
        })
        this.updater.modelUpdater(node,value);
    },
    on(node, expr, vm, eventName){
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName,fn.bind(vm),false)
    },
    updater:{
        textUpdater(node,value){
            node.textContent = value;
        },
        htmlUpdater(node,value){
            node.innerHtml = value;
        },
        modelUpdater(node,value){
            node.value = value;
        }
    },
}

class Compile{
    constructor(el,vm){
        // 判断el是否为元素节点对象
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        // 1.获取文档碎片对象，放入内存中，会减少页面的回流和重绘
        const fragment = this.node2Fragment(this.el);
        // 2.编译模板
        this.compile(fragment);
        // 3.追加子元素到根元素
        this.el.appendChild(fragment);
    }
    isElementNode(node){
        return node.nodeType === 1;
    }
    node2Fragment(el){
        // 创建文档碎片
        // 将所有子节点存储进文档碎片对象中
        const f = document.createDocumentFragment();
        const childNodes = el.childNodes;
        let firstChild;
        while (firstChild = el.firstChild){
            f.appendChild(firstChild);
        }
        return f;
    }
    compile(fragment){
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(child=>{
            if(this.isElementNode(child)){
                // 1.当前节点为元素节点
                // 2.编译元素节点
                this.compileElement(child)
            }else{
                // 文本节点
                // 编译文本节点
                this.compileText(child)
            }

            if(child.childNodes && child.childNodes.length){
                this.compile(child)
            }
        })
    }
    compileElement(node){
        // console.log('元素',node)
        const attributes = node.attributes;
        [...attributes].forEach(attr=>{
            //console.log(attr)   //v-html v-model v-text type v-on:click
            const {name,value} = attr;
            if(this.isDirective(name)){
                const [,directive] = name.split('-'); //html model text on:click
                const [dirName,eventName] = directive.split(':')
                // 更新数据，数据驱动视图
                compileUtil[dirName](node,value,this.vm,eventName)

                // 删除有指令的标签上的指令
                node.removeAttribute('v-' + directive)
            }else if(this.isEventName(name)){ //@click
                let [,eventName] = name.split('@');
                compileUtil['on'](node,value,this.vm,eventName)
            }
        })
    }
    compileText(node){
        // console.log('文本',node) {{}}
        const content = node.textContent;

        if(/\{\{(.+?)\}\}/.test(content)){
            compileUtil['text'](node,content,this.vm)
        }
    }
    isDirective(str){
        return str.startsWith('v-')
    }
    isEventName(attrName){
        return attrName.startsWith('@')
    }
}

class MVue{
    constructor(options){
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        if(this.$el){
            // 1.实现一个数据观察者
            new Observer(this.$data)
            // 2.实现一个指令解析器
            new Compile(this.$el,this)

            // this.$data 代理
            this.proxyData(this.$data)
        }
    }
    proxyData(data){
        for(const key in data){
            Object.defineProperty(this,key,{
                get(){
                    return data[key];
                },
                set(newVal){
                    data[key] = newVal
                }
            })
        }
    }
}

// vue采用数据劫持配合发布者-订阅者模式的方式，通过 Object.defineProperty() 来劫持
// 各个属性的setter和getter，在数据变动时，发布消息给订阅者(dep,依赖收集器)，通知观察者，
// 做出对应的回调函数，去更新视图。

// MVVM作为绑定的入口，整合了 Observer，Compile和Watcher三者，通过Observe
// 监听model的数据变化，通过Compile来解析编译模版指令，最终，利用Watcher，
// 搭起了Observer，Compile之间的通信桥梁，达到数据变化去影响视图的更新，
// 视图交互的变化，影响数据model的更新，实现双向绑定效果。