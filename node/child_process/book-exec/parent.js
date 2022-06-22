const { exec } = require("child_process");
exec("node child.js", { env: { number: 12 } }, (err, stdout, stdin) => {
  if (err) {
    throw err;
  }
  console.log(`stdout: `, stdout);
  console.log(`stdout: `, stdin);
});
