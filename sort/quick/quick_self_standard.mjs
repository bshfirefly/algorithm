const swap = function (arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

const partition = function (arr, left, right) {
  // 1. 随机产生基准值
  const pivot = arr[right];

  let i = left;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      swap(arr, i, j);
      i++;
    }
  }

  swap(arr, i, right);

  return i;
};

const quickSort_recursive = function (arr, left, right) {
  if (left < right) {
    const baseValue = partition(arr, left, right);
    quickSort_recursive(arr, left, baseValue - 1);
    quickSort_recursive(arr, baseValue + 1, right);
  }
};

export const quick_standard = function (arr) {
  quickSort_recursive(arr, 0, arr.length - 1);

  return arr;
};

// module.exports = quick_standard;
