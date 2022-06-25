const { nextTick } = require("process");
const { Writable } = require("stream");

const writeArr = [];

class MyWritable extends Writable {
  constructor() {
    super();
  }

  _write(chunk, en, done) {
    writeArr.push(chunk);
    nextTick(done);
  }
}

const myWritable = new MyWritable();

setTimeout(() => {
  console.log("haha");
}, 1000);

myWritable.write("蛋糕", () => {
  console.log(writeArr.toString());
});
