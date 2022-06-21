// fill
// const buf1 = Buffer.alloc(10);
// buf1.fill("1", 5, 8);
// console.log(buf1);
// console.log(buf1.toString());

// write
// const buf1 = Buffer.alloc(10);
// buf1.write("我", 2);
// console.log(buf1);
// console.log(buf1.toString());

// tostring
// const buf1 = Buffer.from("你好哇!");
// console.log(buf1);
// console.log(buf1.toString("utf-8", 3));

// slice
// const buf1 = Buffer.from("A李银河！");
// const buf2 = buf1.slice(0,1);
// buf2[0] = 50
// console.log(buf1, buf1.toString());
// console.log(buf2, buf2.toString());

// indexOf
// const buf1 = Buffer.from('山有木兮木有枝，心悦君兮君不知');
// console.log(buf1.indexOf('木', 8));

// copy
// const buf1 = Buffer.from("ABAB");
// const buf2 = Buffer.alloc(4);
// buf1.copy(buf2, 1, 1, 3);
// buf2[2] = 100
// console.log(buf1.toString(), buf2.toString());

// contact
// const buf1 = Buffer.from("AB");
// const buf2 = Buffer.from("CD");
// const buf3 = Buffer.concat([buf1, buf2]);
// buf1[0] = 101;
// console.log(buf1.toString(), buf3.toString());
// console.log(Buffer.isBuffer(buf1));

// define split
Buffer.prototype.split = function (sep) {
  const len = Buffer.from(sep).length;
  const arr = [];
  let current = 0;
  let offset = 0;
  while ((offset = this.indexOf(sep, current)) !== -1) {
    arr.push(this.slice(current, offset));
    current = offset + len;
  }
  arr.push(this.slice(current));
  return arr;
};

const buf = Buffer.from("山有木兮木有枝，心悦君兮君不知");
const arr = buf.split("木");
arr.forEach((element) => {
  console.log(element.toString());
});

// Buffer.prototype.split =
//   Buffer.prototype.split ||
//   function (seq) {
//     // 存储最终切割的内容
//     let arr = [];

//     // 当前位置--
//     let current = 0;

//     // pos--在buffer中找到某个符合seq条件片段的索引位置
//     let position = 0;

//     const len = Buffer.from(seq).length;

//     while (this.indexOf(seq, current) !== -1) {
//       // 在这个位置找到符合条件的内容
//       position = this.indexOf(seq, current);

//       // 将符合条件的前面一段buffer切出来
//       let prevBuffer = this.slice(current, position);

//       arr.push(prevBuffer);

//       // 现在从新的位置开始继续找
//       current = position + len;
//     }

//     // 上面while结束，表示再也找不到符合seq的buffer了，现在需要将最后一段buffer装进数组
//     arr.push(this.slice(current));

//     return arr;
//   };

// // 测试
// let buf = Buffer.from("山有木兮木有枝，心悦君兮君不知");

// let arr = buf.split("木");

// arr.forEach((element) => {
//   console.log(element.toString());
// });
