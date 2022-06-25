const { createReadStream } = require("fs");

const cr = createReadStream("../test.txt", {
  encoding: null,
  flags: null,
  autoClose: true,
  start: 0,
  end: 100,
  mode: 438,
  fd: null,
  highWaterMark: 10000,
});

// cr.on("readable", () => {
//   while ((data = cr.read()) !== null) {
//     console.log(data.toString());
//   }
// });

// cr.on("data", (data) => {
//   console.log(data.toString());
//   cr.pause();

//   setTimeout(() => {
//     cr.resume();
//   }, 1000);
// });

// 文件打开时
cr.on("open", (fd) => {
  console.log(`文件打开了${fd}`);
});

// 报错时
cr.on("error", (err) => {
  console.log(err);
});

const bufs = [];
cr.on("data", (data) => {
  bufs.push(data);
});

// 数据消费完时
cr.on("end", () => {
  console.log(Buffer.concat(bufs).toString());
});

cr.on("close", () => {
  console.log("文件关闭时");
});
