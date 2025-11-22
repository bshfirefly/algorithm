class Stack {
  #items = [];

  constructor() {
    // this._item = [] 使用私有字段
  }

  push(item) {
    this.#items.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Cannot pop from an empty stack.");
    }
    // Array.pop() 完美地实现了从末尾移除并返回
    return this.#items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Cannot peek an empty stack.");
    }
    // 访问数组的最后一个元素
    return this.#items[this.#items.length - 1];
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  size() {
    return this.#items.length;
  }
}
