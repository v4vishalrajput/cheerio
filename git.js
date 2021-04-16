const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
let finalData=[];
let totalTopics=0;
request("https://github.com/topics",callback)
function callback(err,res,html){
   
    if(!err){
        fs.writeFileSync("q1.html",html);
        let $=cheerio.load(html);
        let topic=$(".no-underline.d-flex.flex-column.flex-justify-center");
        
        for(let i=0;i<topic.length;i++){
            let projectUrl="https://github.com"+$(topic[i]).attr("href");
            let projectName=$($(topic[i]).find("p")[0]).text().split(" ")[8].split("\n")[0];
            finalData.push({
                "projectName":projectName,
                "projectUrl":projectUrl,
                "gitRepos":[]
            })
            request(projectUrl,getRepositories.bind(this,i));
        }
    }
}
let count=0;
function getRepositories(finalIdx,err,res,html){
    if(!err){
       
        fs.writeFileSync("q2.html",html);
        let $=cheerio.load(html);
        let repoLinks=$("a.text-bold");
        totalTopics+=repoLinks.length<8?repoLinks.length:8;
        for(let i=0;i<8 && i<repoLinks.length;i++){
            let repoName=$(repoLinks[i]).text().split(" ")[12].split("\n")[0];
            let repoUrl="https://github.com"+$(repoLinks[i]).attr("href");
            finalData[finalIdx]["gitRepos"].push({
                "repoName": repoName,
                "repoUrl": repoUrl,
                "issues": []
            });
            request(repoUrl+"/issues",getIssues.bind(this,finalIdx,i));
        }
       
        
    }
}
function getIssues(finalIdx,repoIdx,err,res,html){
    if(!err){
        count++;
        let $=cheerio.load(html);
     let issueLinks=$(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
     for(let i=0;i<8 && i<issueLinks.length;i++){
         let issueName=$(issueLinks[i]).text();
         let issueUrl="https://github.com"+$(issueLinks[i]).attr("href");
         finalData[finalIdx]["gitRepos"][repoIdx]["issues"].push({
             "issueName":issueName,
             "issueUrl":issueUrl
         });
     }
     if(count==totalTopics){
         fs.writeFileSync("finalGit.json",JSON.stringify(finalData));
     }
    }
}