const { nextTick } = require("process");
const { Duplex } = require("stream");
const { Transform } = require("stream");

// Duplex 和 Transform的区别：
// Duplex内部可读流和可写流互不干扰，不能写了之后，读再去使用；而Transform可以，可读流和可写流通过_transform互相转换

// class MyDuplex extends Duplex {
//   constructor(source) {
//     super();
//     this.source = source;
//   }

//   _read() {
//     const data = this.source.shift() || null;
//     this.push(data);
//   }

//   _write(chunk, en, cb) {
//     process.stdout.write(chunk.toString());
//     nextTick(cb);
//   }
// }

// const source = ["吉利", "a", "bn"];

// const myDuplex = new MyDuplex(source);
// myDuplex.on("data", (data) => {
//   console.log(data.toString());
// });

// myDuplex.write("haha", () => {
//   console.log("写入完成");
// });

class MyTransform extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, en, cb) {
    this.push(chunk.toString().toUpperCase());
    cb(null); //  cb(null, chunk); cb如果把chunk传递出去，那么在data事件会收到原始数据
  }
}

const myTransform = new MyTransform();

myTransform.write("adasdsa");
myTransform.write("dasd鲁大师");
myTransform.end("gG");

myTransform.on("data", (data) => {
  console.log(data.toString());
});
