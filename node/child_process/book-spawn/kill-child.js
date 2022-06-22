const { spawn } = require("child_process");
const child = spawn("sleep", ["10"]);

setTimeout(() => {
  child.kill();
}, 1000);

// code 是null  signal是SIGTERM
child.on("exit", (code, signal) => {
  console.log(code, signal);
});
