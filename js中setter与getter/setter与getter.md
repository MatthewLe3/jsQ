### js中的getter与setter方法

---

1. #### 对象属性或方法的读写操作,对象拥有数据属性，访问器属性（存取器属性）

2. #### getter 查询值（读），setter 写

   - ##### 只声明get（）或者set（）时，该对象只读或者只可写，读取到的是 undefined

     ```javascript
     let per = {
       name:'tt',
       get sex(){
     		return 'man'
       }
     }
     
     per.sex = 'woman'			//无效，因为没有set
     console.log(per.sex)	//man
     ```

     

   - ##### 同时声明set，get

     ```javascript
     var per = {
         name:'tt',
         get sex(){
             if(this.sexx){
                 return this.sexx; 
             }else{
                 return 'man'; 
             }
         }, 
       	set sex(val){
             this.sexx = val; 
         }
     };
     per.sex = 'woman';
     console.log(per.sex); //woman
     ```

   