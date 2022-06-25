const { createReadStream, createWriteStream } = require("fs");

const cr = createReadStream("../test.txt");

const cw = createWriteStream("../test2.txt", { highWaterMark: 4 });

cr.on("data", (chunk) => {
  if (!cw.write(chunk)) {
    cr.pause();
  }
});

cw.on("drain", () => {
  cr.resume();
});

// const cr = createReadStream("../flower.webm", {
//   highWaterMark: 40 * 1024,
// });
// const cw = createWriteStream("../flower.png");

// cr.on("data", (data) => {
//   if (!cw.write(data)) {
//     console.log(data);
//     cr.pause();
//   }
// });
