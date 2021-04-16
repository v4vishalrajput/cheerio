const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");

request("https://www.espncricinfo.com/series/pakistan-tour-of-south-africa-2021-1251556/south-africa-vs-pakistan-3rd-odi-1251574/full-scorecard",callback);
// function callback(err,res,html){
//     if(!err){
//        fs.writeFileSync("q1.html",html);
//        let $=cheerio.load(html);
//        let rows=$(".table.bowler tbody tr");
//        let maxWik=0;
//        let MaxPlayer="";
//        for(let i=0;i<rows.length;i++){
        
//         let columns=$(rows[i]).find("td");
        
//        let currentWkt=parseInt($(columns[4]).text());
//        if(currentWkt>maxWik){
//            maxWik=currentWkt;
//          MaxPlayer=$(columns[0]).text();
//        }
//        }
      
//        console.log("Maximum wickets is "+maxWik+" taken by "+MaxPlayer);
//     }

//    }
function callback(err,res,html){
   if(!err){
             fs.writeFileSync("q1.html",html);
             let $=cheerio.load(html);
             let anchor=$(".batsman-cell.text-truncate.out a");
            for(let i=0;i<anchor.length;i++){
               let lnk=($(anchor[i]).attr("href"));
              
             request("https://www.espncricinfo.com"+lnk,cbk);
             function cbk(er,re,htm){
   if(!er){
             fs.writeFileSync("q1.html",htm);
             let $=cheerio.load(htm);
             let details=$(".player-card-description.gray-900");
             let name=$(details[0]).text();
             let born=$(details[1]).text();
             console.log(name+" born on "+born);

   // }
   //           }
            }
         }
      }
   }}
