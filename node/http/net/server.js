const net = require("net");
const Packet = require("../packet-splice/packet");

const server = net.createServer();
const packet = new Packet();

let overageBuffer = null;

console.log(Buffer.from([0x00, 0x03, 0x00, 0x16, 0xe5, 0xb1, 0xb1]).toString() == '山');

server.listen(2222);

server.on("connection", (socket) => {
  socket.on("data", (chunk) => {
    if (overageBuffer) {
      chunk = Buffer.concat([overageBuffer, chunk]);
    }
    let packageLength = 0;
    while ((packageLength = packet.getPackageLen(chunk))) {
      console.log(chunk, chunk.toString(), packageLength);
      const packageCon = chunk.slice(0, packageLength);
      chunk = chunk.slice(packageLength);
      const ret = packet.decode(packageCon);
      //   console.log(ret);
      socket.write(packet.encode(ret.body, ret.serialNum));
    }
    overageBuffer = chunk;
  });
});

server.on("close", () => {
  console.log("关闭了");
});

server.on("error", (err) => {
  if (err.code === "EADDRINGUSE") {
    console.log("端口被占用");
  } else {
    console.log(err);
  }
});

server.on("listening", (data) => {
  console.log("监听了端口" + data);
});
