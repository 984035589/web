const { readFile, writeFile, watchFile } = require("fs");
const path = require("path");
const mdFilePath = path.resolve(process.argv[2]);
const cssFilePath = path.resolve("./forest.css");
const marked = require("marked");
const htmlPath = mdFilePath.replace(path.extname(mdFilePath), ".html");
const browserSync = require("browser-sync");

const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    {{css}}
  </style>
  <body>
    {{html}}
  </body>
</html>
`;

watchFile(mdFilePath, (cur, pre) => {
  if (cur.mtime !== pre.mtime) {
    readFile(mdFilePath, "utf-8", (err, data) => {
      if (err) {
        throw err;
      }
      const htmlStr = marked.parse(data);
      readFile(cssFilePath, "utf-8", (err, css) => {
        const retHtml = template
          .replace(`{{html}}`, htmlStr)
          .replace(`{{css}}`, css);
        writeFile(htmlPath, retHtml, (err) => {
          if (!err) {
            console.log(`写入成功`);
          }
        });
      });
    });
  }
});

browserSync.init({
  browser: "",
  server: __dirname,
  watch: true,
  index: path.basename(htmlPath),
});
