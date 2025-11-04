var numOfSubarrays = function (arr, k, threshold) {
  var count = 0;
  var sum = 0;
  var avg = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (i >= k) {
      sum -= arr[i - k];
    }
    if (i >= k - 1) {
      avg = sum / k;
      if (avg >= threshold) {
        count++;
      }
    }
  }
  return count;
};
