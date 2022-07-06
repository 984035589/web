class Packet {
  constructor() {
    this.packageHeaderLen = 4;
    this.serialNum = 0;
    this.serialLen = 2;
  }

  // 编码
  encode(data, serialNum) {
    const body = Buffer.from(data);
    const headerBuf = Buffer.alloc(4);
    headerBuf.writeInt16BE(serialNum || this.serialNum);
    headerBuf.writeInt16BE(body.length, this.serialLen);
    if (serialNum === undefined) {
      this.serialNum++;
    }
    return Buffer.concat([headerBuf, body]);
  }

  // 解码
  decode(buf) {
    const headerBuf = buf.slice(0, this.packageHeaderLen);
    const bodyBuf = buf.slice(this.packageHeaderLen);

    return {
      serialNum: headerBuf.readInt16BE(),
      bodyLen: headerBuf.readInt16BE(this.serialLen),
      body: bodyBuf.toString(),
    };
  }

  // 获取包长度的方法
  getPackageLen(buffer) {
    if (buffer.length < this.packageHeaderLen) {
      return 0;
    } else {
      return this.packageHeaderLen + buffer.readInt16BE(this.serialLen);
    }
  }
}

module.exports = Packet;
const packet = new Packet();
console.log(packet.encode("山有木", 10).toString().trim());

// const encodeData = packet.encode("你好哇", 1);
// console.log(Buffer.from("你好哇"));
// console.log(encodeData);

// const decodeData = packet.decode(encodeData);
// console.log(packet.decode(encodeData));

// console.log(packet.getPackageLen(encodeData));
