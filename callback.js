const fs=require("fs");
let count=1;
function print(err, data){
    count++;
    if(!err){
    console.log(data);
    if(count<=2){
        fs.readFile("q"+count+".html","utf-8",print);
    }
    }
}

fs.readFile("q1.html","utf-8",print);