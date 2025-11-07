export const merge_sort = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);

  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(merge_sort(left), merge_sort(right));
};

const merge = function (left, right) {
  let j = 0;
  let i = 0;

  const sorted = [];

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      sorted.push(left[i]);

      i++;
    } else {
      sorted.push(right[j]);
      j++;
    }
  }

  return [...sorted, ...left.slice(i), ...right.slice(j)];
};
