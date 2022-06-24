const {
  access,
  stat,
  mkdir,
  rmdir,
  readdir,
  unlink,
  accessSync,
  mkdirSync,
} = require("fs");
const path = require("path");
const filePath = path.resolve("./index.js");
const util = require("util");
const asyncAccess = util.promisify(access);
const asyncMkdir = util.promisify(mkdir);

// 1. access
// access(filePath, (err) => {
//   if (!err) {
//     console.log(`存在`);
//   }
// });

// 2. stat文件信息
// stat(filePath, (err, stats) => {
//   console.log(stats);
//   console.log(stats.isFile());
//   console.log(stats.isDirectory());
// });

// 3. mkdir 创建目录
// mkdir("a/b/c", { recursive: true }, (err) => {
//   console.log(err);
// });

// 4. rmdir 删除目录
// rmdir("a", { recursive: true }, (err) => {
//   console.log(err);
// });

// 5. readdir 读取目录中内容 withFileTypes: true 读取文件或目录的stat
// readdir("a", { withFileTypes: true }, (err, res) => {
//   if (!err) {
//     console.log(res[1].isDirectory());
//   }
// });

// 6. unlink 删除
// unlink("a/a.txt", (err) => {
//   console.log(err);
// });

// 7. 同步创建目录
// function mkdirDirSync(dirPath) {
//   const items = dirPath.split(path.sep);
//   for (let i = 1; i <= items.length; i++) {
//     const item = items.slice(0, i).join(path.sep);
//     try {
//       accessSync(item);
//     } catch (err) {
//       mkdirSync(item);
//     }
//   }
// }

// mkdirDirSync("a\\b\\c");

// 8. 异步创建目录
// function mkdirDir(dirPath, cb) {
//   const items = dirPath.split(path.sep);
//   let i = 1;
//   function next() {
//     if (i > items.length) {
//       cb();
//     }
//     const item = items.slice(0, i++).join(path.sep);
//     access(item, (err) => {
//       if (err) {
//         mkdir(item, next);
//       }
//     });
//   }
//   next();
// }

// mkdirDir("a\\b\\c", () => {
//   console.log("创建成功");
// });

// 9. 异步创建目录
// async function mkdirDir(dirPath, cb) {
//   const items = dirPath.split(path.sep);
//   for (let i = 1; i <= items.length; i++) {
//     const item = items.slice(0, i).join(path.sep);
//     try {
//       await asyncAccess(item);
//     } catch (err) {
//       await asyncMkdir(item);
//     }
//   }
//   cb && cb();
// }

// mkdirDir("a\\b\\c", () => {
//   console.log("创建成功");
// });

// 10. 异步递归删除目录
// 读取目录、判断是文件还是目录，是目录在递归
function rmDir(dirPath, cb) {
  stat(dirPath, (err, stats) => {
    if (stats.isFile()) {
      unlink(dirPath, (err) => {
        if (!err) {
          cb && cb();
        }
      });
    } else {
      readdir(dirPath, (err, ret) => {
        const dirs = ret.map((e) => {
          return dirPath + path.sep + e;
        });
        let index = 0;
        function next() {
          if (index === ret.length) {
            return rmdir(dirPath, cb);
          }
          let cur = dirs[index++];
          rmDir(cur, next);
        }
        next();
      });
    }
  });
  //   readdir(dirPath, { withFileTypes: true }, (err, ret) => {
  //     if (!err) {
  //       for (let i = 0; i < ret.length; i++) {
  //         if (ret[i].isFile()) {
  //         }
  //       }
  //     }
  //   });
}

rmDir("a", () => {
  console.log("删除成功");
});
