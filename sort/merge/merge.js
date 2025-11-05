/**
 * 归并排序（主函数 - 递归版）
 */
function mergeSort(arr) {
  // 1. 递归终止条件
  if (arr.length <= 1) {
    return arr;
  }

  // 2. 分解 (Divide)
  const mid = Math.floor(arr.length / 2);
  // 使用 .slice() 切分数组
  const leftHalf = arr.slice(0, mid);
  const rightHalf = arr.slice(mid);

  // 3. 递归地对左右两半进行排序，然后合并 (Conquer & Combine)
  return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}

/**
 * 辅助函数：合并两个已排序的数组 (left 和 right)
 */
function merge(left, right) {
  const mergedArray = [];
  let i = 0; // left 数组的指针
  let j = 0; // right 数组的指针

  // 核心：比较两个数组，将较小的元素推入新数组
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      mergedArray.push(left[i]);
      i++;
    } else {
      mergedArray.push(right[j]);
      j++;
    }
  }

  // 循环结束后，将剩余的元素（if any）拼接到末尾
  // (使用 ... 展开操作符可以简洁地处理)
  return [...mergedArray, ...left.slice(i), ...right.slice(j)];
}

// --- 示例 ---
const myList = [8, 3, 1, 7, 0, 10, 2];
const sortedList = mergeSort(myList);

console.log(`原始数组: ${myList}`);
console.log(`排序后数组: ${sortedList}`);
