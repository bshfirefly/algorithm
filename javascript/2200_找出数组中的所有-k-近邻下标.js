var findKDistantIndices = function (nums, key, k) {
  let last = -Infinity;

  for (let i = k - 1; i >= 0; i--) {
    if (nums[i] === key) {
      last = i;
      break;
    }
  }

  let ans = [];
  let n = nums.length;

  for (let i = 0; i < nums.length; i++) {
    if (i + k < n && nums[i + k] == key) {
      last = i + k;
    }

    if (last >= i - k) {
      ans.push(i);
    }
  }

  return ans;
};
