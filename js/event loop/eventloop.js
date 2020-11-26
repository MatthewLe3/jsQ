setTimeout(function() {
    console.log('setTimeout');
})

new Promise(function(resolve) {
    console.log('promise');
    resolve() //如果没有resolve，则不执行then
}).then(function() {
    console.log('then');
})

console.log('console');
