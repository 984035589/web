const { createWriteStream } = require("fs");

const cw = createWriteStream("../test1.txt", { highWaterMark: 10 });

const str = "激励的卡萨丁进啊是大";
const source = str.split("");
let num = 0;
let flag = true;

function execWrite() {
  while (num < source.length && flag) {
    flag = cw.write(source[num++]);
  }
}

cw.on("drain", () => {
  console.log("可以写入了");
  flag = true;
  execWrite();
});

execWrite();
