const insertionSort = (arr) => {
  // 复制数组，避免修改原数组
  const array = [...arr];
  const n = array.length;

  // 从第二个元素开始（i=1），因为第一个元素(i=0)默认已排序
  for (let i = 1; i < n; i++) {
    // 1. 拿出"新牌"（未排序区的第一个元素）
    let current = array[i];

    // 2. j 指向"已排序区"的最后一个元素
    let j = i - 1;

    // 3. 在"已排序区"中从后往前找位置
    //    如果已排序的元素(array[j])比"新牌"(current)大...
    while (j >= 0 && array[j] > current) {
      // ...就把这个已排序的元素往右挪一位
      array[j + 1] = array[j];
      j--;
    }

    // 4. 找到了合适的位置(j+1)，把"新牌"插进去
    array[j + 1] = current;
  }

  return array;
};

// --- 测试一下 ---
const originalArray = [5, 3, 8, 4];
const sortedArray = insertionSort(originalArray);

console.log(sortedArray); // 输出: [2, 3, 4, 5, 8, 10]
console.log(originalArray); // 输出: [5, 3, 8, 4, 2, 10] (原数组不变)
