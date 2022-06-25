const { Readable } = require("stream");

const source = ["lj", "cx", "dsa"];

class MyReadable extends Readable {
  constructor() {
    super();
    this.source = source;
  }

  _read() {
    const data = source.shift() || null;
    this.push(data);
  }
}

const myReadable = new MyReadable();

// readable事件配合read使用
myReadable.on("readable", () => {
  let data = null;
  while ((data = myReadable.read()) !== null) {
    console.log(data.toString());
  }
});

// 和readable不要再一起使用，数据会一致
myReadable.on("data", (data) => {
  console.log(data.toString());
});
