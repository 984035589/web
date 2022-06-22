const { exec } = require("child_process");
// demo 1
// exec("ls -l", (err, stdout, stdin) => {
//   console.log(err, stdout, stdin);
// });

// demo 2 统计行数
const options = {
  timeout: 1000,
  killSignale: "SIGKILL",
  maxBuffer: 1024 * 1024, // stdout、stdin的最大容量 小了程序无输出，会自动终止
};
exec("cat *.js | wc -l", options, (err, stdout, stdin) => {
  console.log(stdout);
});


