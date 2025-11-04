var longestPalindrome = function (s) {
  const n = s.length;
  if (n < 2) return s;

  let start = 0,
    end = 0;

  const expandCenter = (l, r) => {
    while (l >= 0 && r < n && s.charAt(l) === s.charAt(r)) {
      l--;
      r++;
    }
    // 跳出时 [l+1, r-1] 区间仍然是回文
    return r - l - 1; // 回文长度
  };

  for (let i = 0; i < n; i++) {
    const len1 = expandCenter(i, i); // 奇数长度中心
    const len2 = expandCenter(i, i + 1); // 偶数长度中心
    const maxLen = Math.max(len1, len2);

    if (maxLen > end - start + 1) {
      const newStart = i - Math.floor((maxLen - 1) / 2);
      const newEnd = i + Math.floor(maxLen / 2);
      start = newStart;
      end = newEnd;
    }
  }

  return s.substring(start, end + 1);
};
