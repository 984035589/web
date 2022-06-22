const { spawn } = require("child_process");
const child = spawn("node", ["./add-one.js"]);

setInterval(() => {
  let number = Math.floor(Math.random() * 10000);
  child.stdin.write(number + "\n");
  child.stdout.once("data", (data) => {
    console.log(`child replied to ${number} with: ${data}`);
    child.kill();
  });
}, 1000);

child.on("exit", (code, signal) => {
  if (code) {
    console.log(`code is ${code}`);
  } else if (signal) {
    console.log(`code is ${signal}`);
  }
});
