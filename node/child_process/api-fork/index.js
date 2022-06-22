const cp = require("child_process");
const childProcess = cp.fork("./sub.js");

childProcess.on("message", (msg) => {
  console.log("Parent got message: ", msg);
  childProcess.kill();
});

childProcess.on("close", (msg) => {
  console.log(`kill childProcess`);
});

childProcess.send({ name: "lj", buf: Buffer.from("你好啊") });
