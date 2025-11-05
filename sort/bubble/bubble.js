/**
 * 辅助函数：用于交换数组中两个元素的位置
 */
const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

/**
 * 冒泡排序函数
 */
const bubbleSort = (arr) => {
  // 复制一份数组，避免修改原数组（这是一个好习惯）
  // 如果你想原地排序，可以直接用 arr
  const array = [...arr];
  const n = array.length;

  // 如果数组为空或只有一个元素，直接返回
  if (n <= 1) {
    return array;
  }

  // 外层循环：控制“趟数” (Passes)
  // i 代表已经有多少个元素被“冒泡”到了正确的位置
  for (let i = 0; i < n - 1; i++) {
    // 关键优化点 2：设置一个标记
    // 假设这一趟没有发生任何交换
    let didSwap = false;

    // 内层循环：执行实际的“比较和交换”
    // 关键优化点 1：
    // (n - 1 - i)
    // -1 是因为我们要比较 j 和 j+1，j 的最大值是 n-2
    // -i 是因为每过一趟(i)，末尾的 i 个元素就已经是排好序的
    // 所以我们不需要再比较它们了
    for (let j = 0; j < n - 1 - i; j++) {
      // 比较相邻的两个元素（升序排列）
      if (array[j] > array[j + 1]) {
        // 如果顺序不对，就交换
        swap(array, j, j + 1);

        // 标记发生了交换
        didSwap = true;
      }
    }

    // 关键优化点 2：检查标记
    // 如果这一整趟 (j 循环) 都没有发生任何交换
    // 说明数组已经完全有序，可以提前终止外层循环
    if (!didSwap) {
      break;
    }
  }

  return array;
};

// 示例：
const arr = [10, 7, 8, 9, 1, 5, 3, 4, 6, 2];
const sortedArr = bubbleSort(arr);

console.log("冒泡排序前:", arr);
console.log("冒泡排序后:", sortedArr); // 输出: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
