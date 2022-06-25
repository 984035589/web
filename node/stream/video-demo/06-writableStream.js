const { createWriteStream } = require("fs");

const cw = createWriteStream("../test1.txt", {
  flags: "w",
  fd: null,
  mode: 438,
  encoding: "utf-8",
  start: 0,
  highWaterMark: 2,
});

// write返回true时
cw.on("drain", () => {
  cw.write("dasdsa");
});

cw.write("12");
const res = cw.write(
  "345324345324345324345324345324345324345324345324345324345324345324345324345324"
);
console.log(res);
cw.end("dasdas");
// cw.write("345324");

cw.on("open", (fd) => {
  console.log("文件打开了", fd);
});

// end方法时触发
cw.on("finish", () => {
  console.log("完成了");
});

// error时触发
cw.on("error", (err) => {
  console.log(err);
});

cw.on("close", () => {
  console.log("文件关闭了");
});
