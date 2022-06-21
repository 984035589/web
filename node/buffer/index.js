// const buf1 = Buffer.alloc(10);
// const buf2 = Buffer.allocUnsafe(10);

// console.log(buf1, buf2);

// const buf1 = Buffer.from([0xe4, 0xb8, 0xad]);
// console.log(buf1.toString());

// const buf1 = Buffer.from('中国');
// console.log(buf1)

// const buf1 = Buffer.from([2, 4, 100, 1, 0xe4, 0xb8, 0xad]);
// console.log(buf1.toString());
// console.log(buf1);

// const buf1 = Buffer.alloc(10);
// const buf2 = Buffer.from(buf1);
// console.log(buf1.compare(buf2));

// buf1[0] = 100;
// console.log(buf1.compare(buf2));

// const arr = new Array(10);
// console.log(arr.fill(1,2,4));

// const buffer = Buffer.from("A我10");
// console.log(buffer);
// console.log(buffer.toString());

// console.log(String.fromCharCode(65));

const buf1 = Buffer.from('中')
console.log(buf1.length);