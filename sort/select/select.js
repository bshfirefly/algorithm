/**
 * 辅助函数：用于交换数组中两个元素的位置
 */
const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

/**
 * 选择排序函数
 */
const selectionSort = (arr) => {
  // 复制一份数组，避免修改原数组
  const array = [...arr];
  const n = array.length;

  if (n <= 1) {
    return array;
  }

  // 外层循环：控制“已排序”区域的边界
  // i 是“未排序”区域的起始索引
  // 只需要循环到 n-2 (即 < n-1)，因为当 i = n-1 时，
  // 最后一个元素自然就在正确的位置了。
  for (let i = 0; i < n - 1; i++) {
    // 1. 假设 "未排序" 区域的第一个元素 (i) 就是最小的
    let minIndex = i;

    // 2. 内层循环：从 i+1 开始，遍历所有 "未排序" 元素
    //    目的是为了找到 "未排序" 区域中，真正最小的那个元素的索引
    for (let j = i + 1; j < n; j++) {
      // 3. 如果找到了一个比当前 minIndex 更小的元素
      if (array[j] < array[minIndex]) {
        // 4. 更新 minIndex
        minIndex = j;
      }
    }

    // 5. 内层循环结束后，minIndex 就是 "未排序" 区最小值的索引
    //    现在，把这个最小值和 "未排序" 区的第一个元素 (i) 交换

    // (一个微小的优化)
    // 如果 minIndex 没有变 (即 i 位置的元素本来就是最小的)，
    // 就不需要自己和自己交换
    if (minIndex !== i) {
      swap(array, i, minIndex);
    }
  }

  return array;
};

// 示例：
const arr = [10, 7, 8, 9, 1, 5, 3, 4, 6, 2];
const sortedArr = selectionSort(arr);

console.log("选择排序前:", arr);
console.log("选择排序后:", sortedArr); // 输出: [1. 2. 3, 4, 5, 6, 7, 8, 9, 10]
