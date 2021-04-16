const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");

request("https://www.espncricinfo.com/series/ipl-2021-1249214/mumbai-indians-vs-royal-challengers-bangalore-1st-match-1254058/full-scorecard",callback);
function callback(err,res,html){
    if(!err){
       fs.writeFileSync("q2.html",html);
       let $=cheerio.load(html);
       let tables=$(".table.batsman");
       let rows=$(tables[0]).find("tr");
        console.log();
       console.log("                     /////    MUMBAI INDIANS   /////                 ");
           console.log();
           console.log();
       for(let i=0;i<rows.length;i++){
          let columns=$(rows[i]).find("td");
           let anchor=$(columns[0]).find("a");
           let lnk=anchor.attr("href");
           request("https://www.espncricinfo.com"+lnk,cbk);
           
           function cbk(er,re,htm){
 if(!er){
           fs.writeFileSync("q1.html",htm);
           let $=cheerio.load(htm);
           let details=$(".player-card-description.gray-900");
          
           let born=$(details[1]).text();
           let role=$(details[5]).text();
           console.log(anchor.text()+"  -->  "+role+"                 BORN : "+born);
           console.log();
       }}}
    }}