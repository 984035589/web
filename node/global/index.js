console.log(__dirname);
console.log(__filename);
console.log(this);
console.log(this === true); // false
(function () {
  console.log(this === global); // true
})();

// console.log(global)
