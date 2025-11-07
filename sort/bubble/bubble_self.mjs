const swap = function (arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

export const bubble_standard = function (arr) {
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < array.length; i++) {
    let swapFlag = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        swapFlag = true;
      }
    }

    if (!swapFlag) {
      break;
    }
  }

  return array;
};

// module.exports = bubble_standard;
