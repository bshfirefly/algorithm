const twoSum = function (nums, target) {
  const dict = new Map();
  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];

    if (dict.has(diff)) {
      return [dict.get(diff), i];
    }

    dict.set(nums[i], i);
  }

  return [];
};

console.log(twoSum([1, 2, 3, 4, 3, 5], 7));

const findAllSumsMap = function (nums, target) {
  const dict = new Map(); // 存储: number -> [index1, index2, ...]
  const results = [];
  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const diff = target - currentNum;
    // 1. 查找是否有补数
    if (dict.has(diff)) {
      const complementIndices = dict.get(diff);
      for (const complementIndex of complementIndices) {
        // 我们总能保证 complementIndex < i
        results.push([complementIndex, i]);
      }
    }

    // 2. 将当前数字和索引存入 map
    // (这是你原来的逻辑，它很好)
    // if (!dict.has(currentNum)) {
    //     dict.set(currentNum, [i]);
    // } else {
    //     dict.get(currentNum).push(i);
    // }

    // (这是另一种写法，功能相同，只是风格不同)
    const indices = dict.get(currentNum) || [];
    indices.push(i);
    dict.set(currentNum, indices);
  }

  console.log(dict, "test");

  return results;
};

// 示例：
console.log(findAllSumsMap([1, 2, 3, 4, 3, 5], 7)); // 输出: [[1, 4], [2, 3]]
