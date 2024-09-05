const fs = require("node:fs/promises");
const path = require("node:path");

const foo = async ()=>{
     await fs.mkdir('./BaseFolder', {recursive:true})

     for (let i = 0; i < 5; i++) {
          await fs.mkdir(path.join(__dirname,'BaseFolder',`dir${i+1}`),{recursive:true});
          console.log(`\ndirectory №${i+1} path:${path.join(__dirname,'BaseFolder',`dir${i+1}`)}`)

          for (let j = 0; j < 5; j++) {
               await fs.writeFile(path.join(__dirname,'BaseFolder',`dir${i+1}`,`file${j+1}.txt`),'some text')
               const stat = await fs.stat(path.join(__dirname,'BaseFolder',`dir${i+1}`,`file${j+1}.txt`))
               console.log(`file${j+1}.txt is file:${(stat).isFile()}`)
          }
     }
}

void foo();