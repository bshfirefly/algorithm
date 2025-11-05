const quickSort_easy = function (arr) {
  // 递归的基线条件（Base Case）：
  // 如果数组为空或只有一个元素，它已经“排好序”了
  if (arr.length <= 1) {
    return arr;
  }

  // 1. 选择基准 (Pivot)
  // 我们简单地选择第一个元素
  // 使用 shift() 会从原数组中“弹出”第一个元素，并返回它
  const pivot = arr.shift();

  // 2. 分区 (Partition)
  const left = [];
  const right = [];

  // 遍历剩余的元素
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]); // 放入 left 数组
    } else {
      right.push(arr[i]); // 放入 right 数组
    }
  }

  // 3. 递归 (Recurse) & 4. 合并 (Combine)
  // 使用 ES6 的 ... (spread) 语法来合并数组
  return [
    ...quickSort_easy(left), // 递归排序 left
    pivot, // 放入基准
    ...quickSort_easy(right), // 递归排序 right
  ];
};

// 示例：
const arr1 = [10, 7, 8, 9, 1, 5, 3, 4, 6, 2];
console.log("易于理解版:", quickSort_easy([...arr1])); // 传入一个副本以防原数组被修改

/**
 *
 * @param {Array} arr
 */
const quick = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr.shift();

  let left = [],
    right = [];

  for (let i = 0; i < arr.length; i++) {
    if (pivot > arr[i]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quick(left), pivot, ...quick(right)];
};

console.log("易于理解版2:", quick([...arr1]));

/**
 * 辅助函数：交换数组中两个元素的位置
 */
const swap = function (arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

/**
 * 辅助函数：分区 (Partition)
 * （这里使用的是 Lomuto 分区方案）
 */
const partition = function (arr, left, right) {
  // 1. 选择最右边的元素作为基准 (Pivot)
  const pivot = arr[right];

  // 2. i 是 "已排序" 的分界点（指向第一个 >= pivot 的元素）
  let i = left;

  // 3. 遍历从 left 到 right-1 的所有元素
  for (let j = left; j < right; j++) {
    // 如果当前元素 (j) 小于基准
    if (arr[j] < pivot) {
      // 把它和分界点 (i) 的元素交换
      swap(arr, i, j);
      // 分界点向右移动一位
      i++;
    }
  }
  // 4. 循环结束后，i 指向的位置就是基准应该在的位置
  // 将基准 (arr[right]) 和 arr[i] 交换
  swap(arr, i, right);

  // 5. 返回基准的最终索引
  return i;
};

/**
 * 快速排序的递归实现
 */
const quickSort_recursive = function (arr, left, right) {
  // 基线条件：如果子数组至少有两个元素
  if (left < right) {
    // 1. 执行分区，拿到基准的索引
    const pivotIndex = partition(arr, left, right);

    // 2. 递归地对基准左边的子数组进行排序
    quickSort_recursive(arr, left, pivotIndex - 1);

    // 3. 递归地对基准右边的子数组进行排序
    quickSort_recursive(arr, pivotIndex + 1, right);
  }
};

/**
 * 快速排序的主函数（用户调用的接口）
 */
const quickSort_inplace = function (arr) {
  // 启动递归，对整个数组进行排序 (索引从 0 到 arr.length - 1)
  quickSort_recursive(arr, 0, arr.length - 1);
  // 因为是原地排序，直接返回修改后的原数组
  return arr;
};

// 示例：
const arr2 = [10, 7, 8];
console.log("原地排序版:", quickSort_inplace(arr2));
// 注意：arr2 本身已经被修改了
console.log("原数组 (arr2):", arr2);
