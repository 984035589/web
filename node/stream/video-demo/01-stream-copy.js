const { createReadStream, createWriteStream } = require("fs");

const cr = createReadStream("../flower.webm");
const cw = createWriteStream("../flower1.webm");

cr.pipe(cw);

cr.on("data", (data) => {
  console.log(data.toString());
});

// cr.pipe(process.stdout)
