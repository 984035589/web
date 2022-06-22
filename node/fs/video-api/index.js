const {
  readFile,
  writeFile,
  appendFile,
  copyFile,
  watchFile,
  unwatchFile,
  open,
  close,
  read,
  write,
} = require("fs");
const path = require("path");

const filePath = path.resolve("./data.txt");

// 1. readFile，不加编码utf-8读取出来的是buffer
// readFile(filePath, 'utf-8', (err, data) => {
//   console.log(data);
// });

// 2. writeFile ,写入文件，不加参数时把文件清空了写入
// writeFile(filePath, "，冉阿让", (err) => {
//   console.log(err);
// });

// 如果要追加写入的话flag要设置成a+，最好还是使用appendFile
// writeFile(
//   filePath,
//   "五谷",
//   { encoding: "utf-8", mode: 438, flag: "a+" },
//   (err) => {
//     !err && console.log(`写入成功`);
//   }
// );

// 3. appendFile追加写入
// appendFile(filePath, "hahahah", (err, data) => {
//   console.log(err, data);
// });

// 4. copyFile拷贝
// copyFile(filePath, path.resolve("./dest.txt"), (err, data) => {
//   console.log(err, data);
// });

// 5. watchFile 监听文件变化, unwatchFile 解除监听文件
// watchFile(filePath, { interval: 20 }, (cur, pre) => {
//   console.log(cur, pre);
//   if (cur.mtime !== pre.mtime) {
//     console.log(`文件修改了`);
//     unwatchFile(filePath);
//   }
// });

// 6. open close
// open(filePath, "r", (err, fd) => {
//   console.log(err, fd);
//   close(fd, (err, fdc) => {
//     console.log(err, fdc);
//   });
// });

// 7. read读大文件
// open(filePath, "r", (err, fd) => {
//   if (err) {
//     throw err;
//   }
//   const buf = Buffer.alloc(1024);
//   read(fd, buf, 0, buf.length, 0, (err, readBytes, data) => {
//     console.log(readBytes, data.toString());
//   });
// });

// 8. write写入文件
open(filePath, "w", (err, fd) => {
  if (err) {
    throw err;
  }
  const buf = Buffer.from("要下班了");
  write(fd, buf, 0, buf.length, 0, (err, writeBytes, data) => {
    console.log(writeBytes, data.toString());
  });
});
