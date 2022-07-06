const { EventEmitter } = require("events");
const fs = require("fs");

class MyReadStream extends EventEmitter {
  actions = {
    data: this.read,
  };

  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || "r";
    this.mode = options.mode || 438;
    this.start = options.start || 0;
    this.end = options.end;
    this.autoClose = options.autoClose || true;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.readOffset = 0;
    this.open();
    this.on("newListener", (type) => {
      this.actions[type]?.call(this);
    });
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

  read() {
    if (typeof this.fd !== "number") {
      return this.once("open", this.read);
    }
    const buf = Buffer.alloc(this.highWaterMark);
    let readMuch;
    if (this.end) {
      readMuch = Math.min(this.end - this.readOffset + 1, this.highWaterMark);
    } else {
      readMuch = this.highWaterMark;
    }
    fs.read(
      this.fd,
      buf,
      0,
      readMuch,
      this.readOffset,
      (err, bytesRead, readBuf) => {
        if (bytesRead) {
          this.readOffset += bytesRead;
          this.emit("data", readBuf.slice(0, bytesRead));
          this.read();
        } else {
          this.emit("end");
          this.close();
        }
      }
    );
  }

  close() {
    fs.close(this.fd, () => {
      this.emit("close");
    });
  }

  pipe(cw) {
    this.on("data", (data) => {
      const flags = cw.write(data);
      if (!flags) {
        this.pause();
      }
    });
    cw.on("drain", () => {
      this.resume();
    });
  }
}

const myReadStream = new MyReadStream("../test.txt", {
  highWaterMark: 4,
  end: 7,
});

myReadStream.on("error", (err) => {
  console.log("error is ", err);
});

myReadStream.on("open", (fd) => {
  console.log(`open the file`, fd);
});

myReadStream.on("data", (data) => {
  console.log(data);
});

myReadStream.on("close", () => {
  console.log("close");
});

myReadStream.on("end", () => {
  console.log("end");
});

module.exports = MyReadStream;
