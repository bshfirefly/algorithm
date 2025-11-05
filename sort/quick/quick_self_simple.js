// 简易版本

/**
 *
 * @param {Array} arr
 */
const quick_simple = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const left = [],
    right = [];

  const pivot = arr.shift();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quick_simple(left), pivot, ...quick_simple(right)];
};

module.exports = quick_simple;

// console.log("简易版本", quick([9, 1, 2, 3, 8, 7, 5, 6, 4, 0]));
