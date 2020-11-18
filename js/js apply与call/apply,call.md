#### js中的apply（），call（）

---

- ##### 作用：每个函数包含两个非继承的方法 apply(),call()。两者用途为，在特定的作用域中调用函数，等于重新设置函数体内this对象的值。

- ##### 区别：接收参数的方式不同

  - ###### apply() 	调用一个对象的一个方法，用另一个对象替换当前对象。

    - ###### 例如：B.apply(A, arguments);即A对象应用B对象的方法。

    - ###### 第一个参数为调用apply的函数运行的作用域

    - ###### 第二个参数可以是 Array实例，也可以是 arguments对象

  - ###### call()     调用一个对象的一个方法，用另一个对象替换当前对象。

    - ###### 例如：B.call(A, args1,args2);即A对象调用B对象的方法。

    - ###### 第一个参数是this的值，与apply()相同
    
    - ###### 其余参数都直接传递给函数
    
    ```javascript
    function Obj(name,age){
        this.name = name
        this.age  = age
        this.getName = function(){
            console.log(this.name)
        }
    }
    
    function curObj(name,age){
        Obj.call(this,name,age)
    }
    
    let cur = new curObj('taotao',18)
    
    console.log(cur)    //{}
    cur.getName()       //taotao
    
    //curObj 通过call 继承了Obj的属性与方法
    ```
    
    ```javascript
    function Obj(name,age){
        this.name = name
        this.age  = age
        this.getName = function(){
            console.log(this.name)
        }
    }
    
    function curObj(name,age){
        Obj.apply(this,[name,age])      //apply 需要传入Arr
    }
    
    let cur = new curObj('taotao',18)
    
    console.log(cur)    //{}
    cur.getName()       //taotao
    
    //curObj 通过call 继承了Obj的属性与方法
    ```
    
    
