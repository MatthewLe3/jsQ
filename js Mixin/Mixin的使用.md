#### Mixin(混入)模式

---

- ##### Mixin用来提供能够被一个或一组子类简单继承功能的类。通过原型链属性，将功能引用复制到原型链上，达到功能的注入

- ##### 将多个对象合称为一个新的对象，新对象具有所有成员的借口

- ##### Mixin混合模式继承就是让继承的类成为一个变量，根据不同的需求继承不同的类

  ```javascript
  const a = {
      a:'a'
  }
  
  const b = {
      b:'b'
  }
  
  const c = {...a,...b}
  
  console.log(c)      //{ a: 'a', b: 'b' }
  ```

  ###### js创建类：

  ```javascript
  //创建类的第一种方式
  class Mixin1 {
      constructor () {
          console.log("这是一个Mixin类")
      }
  }
   
   
  //创建类的第二种方式
  const Mixin2 = class  {
      constructor () {
          console.log("这是一个Mixin类")
      }
  }
   
  //两种创建类的方式等价的【和函数的原理一致】
  new Mixin2()
  
  ```

  ###### Mixin混合模式实现多继承	（该方法相当于一层层循环继承，不合理）

  ```javascript
  // 共同的特性
  class Base {
      constructor () {
          console.log("Base");
      }
  }
   
  // 鱼类的特性【创建一个鱼类并继承Base】
  const FishMixin = (superClass) => class extends superClass {
      constructor () {
          super();
          console.log("FishMixin");
      }
  };
   
  // 狗的特性【创建一个狗类并继承Base】
  const DogMixin = (superClass) => class extends superClass {
      constructor () {
          super();
          console.log("DogMixin");
      }
  };
   
  // FishMixin 和 DogMixin 是没有任何继承关系的,如何Test都继承,就是多继承了
  class Test extends DogMixin(FishMixin(Base)) {
   
  }
  
  let cur = new Test()  //输出  Base,FishMixin,DogMixin
  ```

  ###### Mixin混合多继承

  ```javascript
  function mix(...mixins) {
    class Mix {
        constructor(...args) {
          for (let mixin of mixins) {
              copyProperties(this, new mixin(args)); // 拷贝实例属性
          }
        }
    }
  
    for (let mixin of mixins) {
        copyProperties(Mix, mixin); // 拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }
  
    return Mix;
  }
  
  function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if ( key !== 'constructor' && key !== 'prototype' && key !== 'name'){
        	let desc = Object.getOwnPropertyDescriptor(source, key);
        	Object.defineProperty(target, key, desc);
        }
    }
  }
  ```

  

#### Vue中使用 mixin

---

- ##### 用来高效实现组件的复用,可直接使用子组件中fun，钩子相同时，先执行mixin的。

- ##### 父子组件调用，相当于两个独立模块。mixin，相当于把子组件扩展到父组件中。

- ##### 用法

  - ###### 定义一个js文件（mixin.js）

    ```javascript
    export default {
       data() {
          return {
           	name: 'mixin'
          }
       },
       created() {
        	console.log('mixin...', this.name);
       },
       mounted() {},
       methods: {}
    }
    ```

    

  - ###### 在vue中使用mixin

    ```javascript
    import '@/mixin'; // 引入mixin文件
    
    export default {
     	mixins: [mixin]
    }
    ```

    