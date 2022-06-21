// process.on("beforeExit", function (code) {
//   console.log(code);
// });
// process.on("exit", function (code) {
//   console.log(code);
// });
// console.log(`---`, process.arch, process.argv, process.cwd(), process.env);

// console.log(process.getuid(), process.pid, process.ppid)
// process.kill(process.pid)

// console.log(process.memoryUsage())

// process.nextTick(() => {
//     console.log(`---1`)
// })
// console.log(`---2`)

// 测量运行间隔的纳秒数
// console.log(process.hrtime());
// console.log(`---2`)
// console.log(process.hrtime());

// console.log(process.platform, process.release, process.report)

// process.report.writeReport('./report.json', 'erro');

// console.log(process.title, process.traceDeprecation)

// 内存、cpu
// console.log(process.memoryUsage(), process.cpuUsage())

// 运行目录、node环境、cpu架构、用户环境、系统平台
// console.log(process.cwd())
// console.log(process.version, process.versions)
// console.log(process.arch)
// console.log(process.env.NODE_ENV)
// console.log(process.platform)
// console.log(process.env.PATH)
// console.log(process.env.HOME) // mac
// console.log(process.env.USERPROFILE) // win

// 启动参数、pid、运行时间
// console.log(process.argv)
// console.log(process.argv0)
// console.log(process.execArgv)
// console.log(pid)

// 标准输入、标准输出
// console.log = (data) => {
//   process.stdin.write("---" + data + "\n");
// };
// console.log(11)

// const fs = require("fs");
// fs.createReadStream("./test.txt").pipe(process.stdout);

// process.stdin.pipe(process.stdout)
// process.stdin.pipe(process.stdout)

// process.stdin.setEncoding('utf-8')
// process.stdin.on('data', (data) => {
//     let chunk = process.stdin.read()
//     if (chunk !== null) {
//         process.stdout.write(`data: ${chunk}`)
//     }
// })

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ask user for the anme input
rl.question(`What's your name? `, (name) => {
  // ask for nationality
  rl.question(`What are you from? `, (country) => {
    // log user details
    console.log(`${name} is from ${country}`);

    // close the stream
    rl.close();
  });
});

rl.on("close", () => {
  console.log("Goodbye 👋");

  // exit the process
  process.exit(0);
});
