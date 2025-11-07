export const insert = function (arr) {
  const array = [...arr];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    // 1.暂存
    let current = array[i];

    // 2. 分割点
    let j = i - 1;

    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }

    array[j + 1] = current;
  }

  return array;
};

// module.exports = insert;

const insert_two = function (arr) {
  const array = [...arr];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    let j = i - 1;
    let cur = arr[i];

    while (j >= 0 && cur < array[j]) {
      array[j + 1] = array[j];
      j--;
    }

    array[j + 1] = cur;
  }

  return array;
};
