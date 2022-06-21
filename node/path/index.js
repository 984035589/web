const path = require("path");

const fileName = __filename;

// 1. basename
// console.log(path.basename(fileName));
// console.log(path.basename('/a/b'))
// console.log(path.basename('/a/b/'))
// console.log(path.basename('/a/b/.ex'))

// 2. dirname
// console.log(path.dirname(fileName))
// console.log(path.dirname('/a/b'))
// console.log(path.dirname('/a/b/'))
// console.log(path.dirname('/a/b/.dir'))

// 3. extname
// console.log(path.extname(fileName));
// console.log(path.extname("/a/b/test.js.css"));
// console.log(path.extname("/a/b/"));
// console.log(path.extname("/a/b"));

// 4. 解析路径
