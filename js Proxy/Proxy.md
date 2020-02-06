### js中 Proxy 的概念与用法

---

1. #### 概念：Proxy 用于修改对象的某些默认行为，可以对外界的访问进行过滤和改写。

2. #### 作用：Proxy 可以让我们对任何Object的绝大部分行为进行监听和干涉，实现更多自定义程序行为。在目标对象之前设置一层代理，外界对targetObj的访问，都要经过该代理。

3. #### 用法

   1. ##### Proxy拦截target对象，对target属性进行修改

      ```javascript
      let obj = {
          name:"taotao"
      }
      
      let curProxy = new Proxy(obj,{
          get(target,key){
              return 'tao'
          },
          set(target,key,value){
              target[key] = value
          }
      })
      
      console.log(curProxy.name)      //tao
      curProxy.name = 'TAO'           //通过set，修改的是 obj的name 属性
      console.log(curProxy.name)      //tao
      console.log(obj.name)           //TAO
      ```
      
      ```javascript
      let obj = {
          name:"taotao",
          age:18,
      }
      
      let curProxy = new Proxy(obj,{
          get(target,key){
              if(key[0] != '_'){
                  return target[key]
              }
          },
          set(target,key,value){
              if(key[0] != '_'){
                  return target[key] = value
              }
          },
          defineProperty(target,key){
              if(key[0] != '_'){
                  delete target[key]
              }
          }
      })
      
      console.log(curProxy.name)      //tao
      console.log(obj.name)           //tao
      console.log(obj.age)            //18
      
      curProxy.name = 'TAO'           //通过set，修改的是 obj的name 属性
      console.log(curProxy.name)      //TAO
      console.log(obj.name)           //TAO
      console.log(obj.age)            //18
      
      delete curProxy.name						//删除name属性
      console.log(curProxy.name)      //undefined
      console.log(obj.name)           //undefined
      console.log(obj.age)            //18
      
      ```
      
      
      
   2. ##### 通过has 和 in 关键字 进行拦截
   
      ```javascript
      let obj = {
          name:"taotao",
          age:18,
      }
      
      let curProxy = new Proxy(obj,{
          has(target,key){
              if(key[0] === '_'){
                  return false
              }else{
                  return key in target
              }
          }
      })
      
      console.log('name' in curProxy)         //true
      console.log('name2' in curProxy)        //false
      ```
   
      
   
   3. ##### 通过ownKeys 和 for in 遍历过滤
   
      ```javascript
      let obj = {
          name:"taotao",
          age:18,
      }
      
      let curProxy = new Proxy(obj,{
          ownKeys(target){
              return Reflect.ownKeys(target).filter(key => key[0] !== '_')
          }
      })
      
      for (let key in curProxy){
          console.log(key)            //name, age
      }
      ```
   
      
   
   4. ##### 通过apply（）对函数调用进行拦截
   
      ```javascript
      function test(){
          console.log('hello world')
      }
      
      let curTest = new Proxy(test,{
          apply(target,ctx,args){
              console.log('proxy apply')
              return Reflect.apply(target,ctx,args)
          }
      })
      
      curTest()               //proxy apply,  hello world
      curTest.apply()         //proxy apply,  hello world
      curTest.call()          //proxy apply,  hello world
      ```
   
      
   
   5. ##### 通过construct对构造函数实例化进行拦截
   
      ```javascript
      function test(){
          console.log('hello world')
      }
      
      let curTest = new Proxy(test,{
          construct(target, args){
              console.log('proxy construct')
              return Reflect.construct(target, args)
          }
      })
      
      new curTest()               //proxy construct,  hello world
      curTest.apply()             //hello world
      curTest.call()              //hello world
      ```

   6. ##### proxy中的fun
   
      ```json
      {
        get:'',
        set:'',
        deleteProperty:'删除key',
        enumerate:'枚举',
        ownKeys:'获取所有key',
        has:'是否有该key',
        defineProperty:'如何defineProperty',
        getOwnPropertyDescriptor:'获取属性描述代理',
        getPrototypeOf:'找原型时的代理',
        setPrototypeOf:'设置原型时的代理',
        isExtensible:'判断对象是否可扩展时的代理',
        preventExtensions:'阻止对象扩展时的代理',
        apply:'执行调用操作时的代理',
        construct:'执行实例化时的代理'
      }
      ```
   
      