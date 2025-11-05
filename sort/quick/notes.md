## 快速排序


快速排序思路很简单，就是将一个数组找一个基准值，将小于基准值的放在左边，大于基准值的放在右边

然后再把左边的数组和右边的数组分别再次找基准值重复这一个过程知道数组长度小于2位置

基于这个原理可以写出一个简易版的快速排序，他的效率并没有达到最高，取决于基准值的精确程度，如果基准值越接近数组中间，那么速度也快

```js
/**
 * 简易版本
 * @param {Array} arr
 */
const quick_simple = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const left = [],
    right = [];

  const pivot = arr.shift();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quick_simple(left), pivot, ...quick_simple(right)];
};
```

以上最简单的快排就完成了，但是如果要对数组进行原地修改，空间优化那么则需要对此进行升级

标准版核心函数如下

```js
const partition = function (arr, left, right) {
  const pivot = arr[right];

  let i = left;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      swap(arr, i, j);
      i++;
    }
  }

  swap(arr, i, right);

  return i;
};

```

如上述函数所示，这个函数负责实际的交换以及产生随机的基准值

重点在于如下代码

```js

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      swap(arr, i, j);
      i++;
    }
  }

```


j这个指针负责检查数字是否小于基准值，如果小于则将它放在i的后面，从这单讲，i相当于基准值的位置，一个左右的分界点

一旦发生了交换，那么i就要向前挪动一步

这个其实很好理解，想象一下，一个检查员和一个保安

j就相当于检查员，i就相当于保安，当j发现一个数字比基准值大的时候，就把他放在i的身后，那么i就自然而然的要向前一步

这样遍历之后i的左边肯定都是比基准值小的，i的右边则是比基准值大的

最后再将基准值的位置和i的位置的数字相互换一下即可

然后将i作为基准值再次返回，之后重复这个递归的过程



```js

const quickSort_recursive = function (arr, left, right) {
  if (left < right) {
    const baseValue = partition(arr, left, right);
    quickSort_recursive(arr, left, baseValue - 1);
    quickSort_recursive(arr, baseValue + 1, right);
  }
};

const quick_standard = function (arr) {
  quickSort_recursive(arr, 0, arr.length - 1);

  return arr;
};

```

这两个函数就是启动函数，需要注意的是
```js
  if (left < right) {

  }

```
这个条件并不能少，不然会无限递归下去，这个条件就是用来约束的，也就是保证一个数组的元素至少要有两个


剩下的则是边界的问题
```js
quickSort_recursive(arr, left, baseValue - 1);
quickSort_recursive(arr, baseValue + 1, right);
```

第一个是从第一个元素到基准值左边的位置
第二个则是从基准值右边开始到数组的末尾，也就是左后一个元素


以上。


