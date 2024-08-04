let fs = require("fs");
let path = require("path");
let types ={
    media: ['mp3',"mp4", "mkv",'mov','m4a', 'm4v', 'mpg','mpeg', 'wmv', 'avi', 'flv', '3gp', '3gpp', '3g2', '3gp2'],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images:['jpeg','jpg','bmp','png','gif','raw','eps','cr2','nef','orf','sr2','tiff','tif'],
}

function organizeFn(dirPath)
{
   // console.log(" Organize command implemented for",dirPath);

   // 1. input -> Directory Path given
    let destPath;
    if(dirPath == undefined) 
     {
        destPath == process.cwd();
        return;
     }
    else
     {
        let doesExist = fs.existsSync(dirPath);
     
        if(doesExist)     
        {
            // 2. create -> organized files -> directory
            destPath = path.join(dirPath,"organized_files");
            if(fs.existsSync(destPath)==false)
                {
                   fs.mkdirSync(destPath);
                }
        }
        else
        {
            console.log("Kindly plz Enter the correct Path");
            return;
        }
     }
     organizeHelper(dirPath,destPath);

}
function organizeHelper(src,dest)
{
  // 3. identify -> identify categories of all files presesnt in that input directory
  let  childNames = fs.readdirSync(src);
 // console.log(childNames);

    for(let i=0;i<childNames.length;i++) 
        {
            let childAddress=path.join(src,childNames[i]);
            let isFile = fs.lstatSync(childAddress).isFile();
            if(isFile)
                {
                   // console.log(childNames[i]);
                  let category= getCategory(childNames[i]);
                  console.log(childNames[i],"belongs to -->",category);
                  sendFiles(childAddress,dest,category);
                }
        }
}

function sendFiles(srcFilePath, dest , category)
{
    let categoryPath = path.join(dest,category);
    if(fs.existsSync(categoryPath)==false)
        {
            fs.mkdirSync(categoryPath);
        }
        let fileName = path.basename(srcFilePath);
        let destFilePath = path.join(categoryPath,fileName);
        fs.copyFileSync(srcFilePath, destFilePath);
        fs.unlinkSync(srcFilePath);
        console.log(fileName,"copied to", category);
}


function getCategory(name)
{
    let ext = path.extname(name);
    ext = ext.slice(1);
   // console.log(ext);
   for(let type in types)
    {
        let cTypeArray = types[type];
          for (let i=0; i<cTypeArray.length; i++)
            {
                if(ext == cTypeArray[i])
                    {
                        return type;
                    }
            }
    }
    return "others";
}
module.exports ={ organizeKey:organizeFn}