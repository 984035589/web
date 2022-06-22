const { spawn } = require("child_process");

const child = spawn("ls", ["-la"]);

child.stdout.on("data", (data) => {
  console.log(data.toString());
});

// code是0的时候是正常的退出
child.on("exit", (code) => {
  console.log(code);
});
