## 归并排序


所谓归并排序其实就两个步骤，“分”，“合”

第一个步骤分

加入有一个数组`[5,3,1,8]`

那么分解步骤如下

第一次分解：
A:[5,3]
B:[1,8]

第二次分解
C:[5]
D:[3]
E:[1]
F:[8]

当数组只剩下一个的时候就不需要分解了

接下来事合并的步骤

第一次合并C,D二组得到的结果：[3,5]

第二次合并E,F二组得到的结果：[1,8]

之后再次合并这两个数组得到最后的完成版数组[1,3,5,8]

归并整体就是是用了分治和递归的思想

将以上思想转换成代码如下

```js
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
    if (left[i] <= right[j]) {
      sorted.push(left[i]);

      i++;
    } else {
      sorted.push(right[j]);
      j++;
    }
  }

  return [...sorted, ...left.slice(i), ...right.slice(j)];
};

```

## 学习时候的问题

1. `return [...sorted, ...left.slice(i), ...right.slice(j)];`

> [!info] 为什么这里展开`sorted`之后还要展开`left`和`right`
>
> 这是归并在合并的时候是比较两个数组然后将符合条件的数字放入事先的数组中这里事`sorted`数组
> 这就导致一个问题
> while (i < left.length && j < right.length)
> 一旦一个数组循环完毕，那么就会出现条件不符合的情况从而出现问题
> 举个例子
> [5,3,1,8]
> 第一次合并C,D二组得到的结果：[5，6]
> 第二次合并E,F二组得到的结果：[1,3]
> 再次合并的时候比较两个数组,5和1比较，1符合条件，push
> [1] j++
> 这里再次比较3和5比较，3符合条件
> [1,3] j++
>
> 这里就不符合循环条件了因为j = 2而 2 < 2这个条件事false,因此会跳出循环
> 而[5,6]这个则还没有合并进入`sorted`中，所以这里需要将它也合并进去，因此这里要使用
> `return [...sorted, ...left.slice(i), ...right.slice(j)]`


