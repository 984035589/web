const { createReadStream, createWriteStream } = require("fs");

const cr = createReadStream('../flower.webm')
const cw = createWriteStream('../flower1.webm')

cr.pipe(cw)
// cr.pipe(process.stdout)
