const { createReadStream, createWriteStream } = require("fs");
const MyReadStream = require("./09-self-read-stream");

const cr = createReadStream("../test.txt");

const mycr = new MyReadStream("../test.txt");

const cw = createWriteStream("../test1.txt");

mycr.pipe(cw);
