let fs = require("fs");
let path = require("path");
let destPath;
function treeFn(dirPath)
{
   // console.log(" Tree command implemented for",dirPath);
   if(dirPath == undefined) 
      {
         treeHelper(process.cwd(),"");
         return;
      }
      else
      {
         let doesExist = fs.existsSync(dirPath);
    
       if(doesExist)     {
           // 2. create -> organized files -> directory
           destPath = path.join(dirPath,"organized_files");
           if(fs.existsSync(destPath)==false)
               {
                  fs.mkdirSync(destPath);
               }
            treeHelper(dirPath,"");      
            }
       else
       {
           console.log("Kindly plz Enter the correct Path");
           return;
       }
    }
}

function treeHelper(dirPath,indent)
{
  //is file or folder
 let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile==true)
      {
        let fileName = path.basename(dirPath);
        console.log(indent+"├─"+fileName);
      }
    else
    {
        let dirName=path.basename(dirPath);
        console.log(indent+"└──" +dirName );
        let childrens = fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++)
            {
               let childPath = path.join(dirPath,childrens[i]);
               treeHelper(childPath,indent+"\t");
            }
    }
}

module.exports={
    treeKey:treeFn
}