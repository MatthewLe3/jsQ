#### async、await 和 promise 的区别

---

1. ##### promise

   ```javascript
   new Promise(
   	function(resolve,reject){
   		resolve('成功')
   		reject('失败')
   	}
   ).then(
   	(res)=>{
   		console.log('成功')
   	}	
   	(err)=>{
   		console.log('失败')
   	}
   ).catch(
   	function(data){
   		console.log('失败',data)
   	}
   )
   ```

   ```javascript
   let a = new Promise(...)
   let b = new Promise(...)
   
   Promise.all([a,b]).then(
   	function(results)=>{
   
   	}
   )
   
   Promise.race([a,b]).then(
   	function(results)=>{
   
   	}
   )
   ```

   

2. ##### async、await

   - ###### 优势在于处理then()链

