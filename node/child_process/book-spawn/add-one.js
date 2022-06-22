process.stdin.resume();
process.stdin.on("data", (data) => {
  let number;
  try {
    number = parseInt(data, 10);
    ++number;
    process.stdout.write(number + "\n");
  } catch (err) {
    process.stderr.write(err, +"\n");
  }
});
