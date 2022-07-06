const fs = require("fs");
const { EventEmitter } = require("events");
const Queue = require("./010-linked-list");

class MyWriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || "w";
    this.mode = options.mode || 438;
    this.start = options.start || 0;
    this.end = options.end;
    this.highWaterMark = options.highWaterMark || 16 * 1024;
    this.encoding = options.encoding;
    this.open();

    this.writeOffset = this.start;
    this.writing = false;
    this.needDrain = false;
    this.writeLength = 0;
    this.cache = new Queue();
  }

  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.emit("error", err);
        return;
      }
      this.fd = fd;
      this.emit("open", fd);
    });
  }

  write(chunk, en, cb) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.writeLength += chunk.length;
    const flags = chunk.length < this.highWaterMark;
    this.needDrain = !flags;

    if (this.writing) {
      // 放缓存
      this.cache.enQueue({ chunk, en, cb });
    } else {
      // 执行写入
      this.writing = true;
      this._write(chunk, en, () => {
        cb && cb();
        this._clearBuffer();
      });
    }
    return flags;
  }

  _write(chunk, en, cb) {
    if (typeof this.fd !== "number") {
      return this.once("open", () => this._write(chunk, en, cb));
    }
    fs.write(
      this.fd,
      chunk,
      0,
      chunk.length,
      this.writeOffset,
      (err, written) => {
        this.writeOffset += written;
        this.writeLength -= written;
        cb && cb();
      }
    );
  }

  _clearBuffer() {
    const node = this.cache.deQueue();
    if (node) {
      this._write(node.element.chunk, node.element.en, () => {
        node.element.cb && node.element.cb();
        this._clearBuffer();
      });
    } else {
      if (this.needDrain) {
        this.needDrain = false;
        this.emit("drain");
      }
    }
  }
}

const myWriteStream = new MyWriteStream("../test-write.txt", {
  highWaterMark: 1,
});

myWriteStream.on("error", (err) => {
  console.log("error is ", err);
});

myWriteStream.on("open", (fd) => {
  console.log("fd is ", fd);
});

myWriteStream.write("12112312321312", "", () => {
  console.log("write完成");
});
myWriteStream.write("121312312312312", "", () => {
  console.log("write完成");
});

myWriteStream.on("drain", () => {
  console.log("drain");
});
