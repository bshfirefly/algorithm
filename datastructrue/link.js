class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  addend(val) {
    const node = new Node(val);
    if (this._size === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this._size += 1;
  }

  size() {
    return this._size;
  }

  find(val) {
    return this._find(this.head, val, 0);
  }

  _find(node, val, index) {
    if (node === null) {
      return -1;
    }

    if (node.val === val) {
      return index;
    }

    return this._find(node.next, val, index + 1);
  }
}

const link = new LinkedList();

// 添加一些数据，以便 size 不是 0
link.addend(10);
link.addend(20);
link.addend(30);

// 修复：在实例 link 上调用 .size()，而不是用 this
console.log(link.size()); // 输出: 2
