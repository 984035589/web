const { spawn } = require("child_process");

const child = spawn("sleep", ["10"]);

setTimeout(() => {
  child.kill();
}, 1000);

child.kill("SIGUSR2");

child.on("exit", (code, signal) => {
  console.log(code, signal);
});

process.on("SIGUSR2", () => {
  console.log(`get SIGUSR2 signal`);
});
