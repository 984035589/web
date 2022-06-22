const { spawn, exec, execFile, fork } = require("child_process");
const util = require("util");
const ls = spawn("ls", ["-lh", "/usr"]);
const execPromise = util.promisify(exec);

// ls.stdin.on("data", (data) => {
//     console.error(`stdin: ${data}`);
//   });

// ls.stdout.on("data", (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on("data", (data) => {
//   console.error(`stderr: ${data}`);
// });

// ls.on("close", (code) => {
//   console.log(`child process exited with code ${code}`);
// });

// const echo = exec('echo "The \\$HOME variable is $HOME"');
// echo.stdout.on('data', (data) => {
//     console.log(data)
// })

// 回调
// exec("cat *.js missing_file | wc -l", (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });

// 同步
// async function lsExample() {
//   const { stdout, stderr } = await execPromise("ls");
//   console.log("stdout:", stdout);
//   console.error("stderr:", stderr);
// }
// lsExample();

// 执行文件
// const child = execFile("node", ["--version"], (error, stdout, stderr) => {
//   if (error) {
//     throw error;
//   }
//   console.log(stdout);
// });

//  AbortController 上调用 .abort() 与在子进程上调用 .kill()
// const controller = new AbortController();
// const { signal } = controller;
// const child = execFile("node", ["--version"], { signal }, (error) => {
//   console.log(error); // 一个 AbortError
// });
// controller.abort();

// if (process.argv[2] === "child") {
//   setTimeout(() => {
//     console.log(`Hello from ${process.argv[2]}!`);
//   }, 1_000);
// } else {
//     console.log(`-----`)
//   const controller = new AbortController();
//   const { signal } = controller;
//   const child = fork(__filename, ["child"], { signal });
//   child.on("error", (err) => {
//     // 如果控制器中止，则这将在 err 为 AbortError 的情况下被调用
//   });
//   controller.abort(); // 停止子进程
// }

// 从终端读取参数执行命令
// const controller = new AbortController();
// const { signal } = controller;
// const ps = spawn("ps", [process.argv[2]], { signal });
// ps.stdout.on("data", (data) => {
//   console.log(data.toString());
// });

// ps.stderr.on("data", (data) => {
//   console.error(`ps stderr: ${data}`);
// });

// ps.on("error", (err) => {
//   console.log(`GG: ${err}`);
//   controller.abort();
// });

// ps.stderr.on("data", (data) => {
//     console.log(`gg`)
// });

// ps.on("close", (code) => {
//   if (code !== 0) {
//     console.log(`ps process exited with code ${code}`);
//   }
// });
