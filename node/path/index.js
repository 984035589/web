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
// console.log(path.parse(fileName))
// console.log(path.parse('/a/c/../s'))
// console.log(path.parse('./a/c/s'))

// 5. 序列化路径
// console.log(path.format(path.parse(fileName)))

// 6. 判断当前路径是否是绝对路径
// console.log(path.isAbsolute('ff'))
// console.log(path.isAbsolute('/ff'))
// console.log(path.isAbsolute(fileName))
// console.log(path.isAbsolute('./'))

// 7. 路径拼接join
// console.log(path.join("/a/b", "c", "index.html"));
// console.log(path.join(__dirname, "/a/b", "c", "index.html"));
// console.log(path.join(__dirname, "/a/b", "c",'../', "index.html"));
// console.log(path.join(''))

// 8. 规范化路径
// console.log(path.normalize(''))
// console.log(path.normalize('a/s/f/sad/.././sa'))
// console.log(path.normalize('/a\s\s/dsa\f/dsa/das.../das/../'))
// console.log(path.normalize('a//\b\c\\/d'))

// 9. 拼接路径|绝对路径
console.log(path.resolve("index.html"));
console.log(path.resolve("/a", "./index.html"));
console.log(path.resolve("a", "./index.html"));
console.log(path.resolve("a", "index.html"));
console.log(path.resolve("a", "../index.html"));
