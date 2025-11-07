class Queue {
  #items = [];

  constructor() {
    // this._item = [] 使用私有字段
  }

  enqueue(item) {
    this.#items.push(item);
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Cannot dequeue from an empty queue.");
    }
    // Array.pop() 完美地实现了从末尾移除并返回
    return this.#items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Cannot peek an empty stack.");
    }
    // 访问数组的最后一个元素
    return this.#items[0];
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  size() {
    return this.#items.length;
  }
}
