console.log(1);
await (()=>{
    Promise.resolve().then(()=>{
        console.log(3);
    }).then(()=>{
        console.log(4);
    }).then(()=>{
        console.log(6)
    })
})();
await (()=>{
    console.log(5);
})();
console.log(2);