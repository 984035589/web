const net = require("net");
const Packet = require("../packet-splice/packet");

const connection = net.createConnection({ port: 2222 });
const packet = new Packet();

let overageBuffer = null;

// connection.on("connect", () => {
connection.write(packet.encode("山有木"));
connection.write(packet.encode("山有木兮木有枝2"));
connection.write(packet.encode("山有木兮木有枝3"));
connection.write(packet.encode("山有木兮木有枝4"));
//   connection.write("hslj1");
//   connection.write("hslj2");
//   connection.write("hslj3");
// });

connection.on("data", (chunk) => {
  if (overageBuffer) {
    chunk = Buffer.concat([overageBuffer, chunk]);
  }
  let packageLength = 0;
  while ((packageLength = packet.getPackageLen(chunk))) {
    const packageCon = chunk.slice(0, packageLength);
    chunk = chunk.slice(packageLength);
    const ret = packet.decode(packageCon);
    console.log(ret);
  }
  overageBuffer = chunk;
});

connection.on("close", () => {
  console.log("关闭了");
});
