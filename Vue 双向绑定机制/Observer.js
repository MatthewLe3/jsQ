// 劫持data，进行监听
// watcher变化
// 渲染视图

class Watcher{
    constructor(vm,expr,callBack){
        this.vm = vm;
        this.expr = expr;
        this.callBack = callBack;
        this.oldVal = this.getOldVal()
    }
    update(){
        const newVal = compileUtil.getVal(this.expr,this.vm);
        if(newVal !== this.oldVal){
            this.callBack(newVal);
        }
    }
    getOldVal(){
        Dep.target = this;

        const oldVal = compileUtil.getVal(this.expr,this.vm);

        Dep.target = null;

        return oldVal;
    }
}

class Dep{
    constructor(){
        this.subs = [];
    }
    // 收集观察者
    addSub(watcher){
        this.subs.push(watcher);
    }
    // 通知观察者去更新
    notify(){
        this.subs.forEach(w=>w.update())
    }
}

class Observer{
    constructor(data){
        this.observe(data);
    }
    observe(data){
        // person:{
        //     name:'aa';
        //     age:18;
        //     vv:{};
        // }
        if(data && typeof data == 'object'){
            Object.keys(data).forEach(key=>{
                this.defineReactive(data,key,data[key])
            })
        }
    }
    defineReactive(obj,key,value){
        // 递归遍历
        this.observe(value);
        const dep = new Dep();
        //劫持
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:false,
            get(){
                // 订阅数据变化时，往Dep中添加观察者
                // 收集每个观察者的依赖
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set:newVal => {
                this.observe(newVal);//新值需要添加劫持操作
                if(newVal !== value){
                    value = newVal;
                }
                // 告诉Dep，通知变化
                dep.notify();
            }
        })
    }
}