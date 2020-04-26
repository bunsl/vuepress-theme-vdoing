/**
 *  读取所有md文件数据
 */
const fs = require('fs'); // 文件模块
const path = require('path'); // 路径模块
const docsRoot = path.join(__dirname, '..', '..', 'docs'); // docs文件路径

function readFileList(dir = docsRoot, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach( (item, index) => {
      let filePath = path.join(dir, item);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && item !== '.vuepress') {
        readFileList(path.join(dir, item), filesList);  //递归读取文件
      } else {
        if(path.basename(dir) !== 'docs'){ // 过滤docs目录级下的文件
          let [order, name, type] = path.basename(filePath).split('.');
          order = parseInt(order, 10);
          if(type === 'md'){ // 过滤非md文件
            filesList.push({
              order,
              name,
              filePath
            });
          }
        }
      }        
  });
  return filesList;
}

module.exports = readFileList;