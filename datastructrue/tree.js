import { Queue } from "./queue.mjs";

class TreeNode {
  #val;
  #left;
  #right;
  constructor(val, left, right) {
    this.#val = val === undefined ? 0 : val;
    this.#left = left === undefined ? null : left;
    this.#right = right === undefined ? null : right;
  }

  set left(left) {
    this.#left = left;
  }

  set right(right) {
    this.#right = right;
  }

  set val(val) {
    this.#val = val;
  }

  get val() {
    return this.#val;
  }

  get left() {
    return this.#left;
  }

  get right() {
    return this.#right;
  }
}

let n1 = new TreeNode(1),
  n2 = new TreeNode(2),
  n3 = new TreeNode(3),
  n4 = new TreeNode(4),
  n5 = new TreeNode(5);

n1.left = n2;
n1.right = n3;
n2.left = n4;
n2.right = n5;

console.log(n1.right.val);

// 遍历

const preList = new Array();

function preOrder(root) {
  if (root === null) {
    return;
  }
  preList.push(root.val);
  preOrder(root.left);
  preOrder(root.right);
}

preOrder(n1);
console.log(preList);

const inList = new Array();

function inOrder(root) {
  if (root === null) {
    return;
  }

  inOrder(root.left);
  inList.push(root.val);
  inOrder(root.right);
}

inOrder(n1);
console.log(inList);

const postList = new Array();
function postOrder(root) {
  if (root === null) {
    return;
  }

  postOrder(root.left);
  postOrder(root.right);
  postList.push(root.val);
}

postOrder(n1);
console.log(postList);

// 广度优先遍历
function levelOrderTraversal(root) {
  if (!root) {
    return [];
  }

  const queue = new Queue();
  const result = [];

  queue.enqueue(n1);

  while (!queue.isEmpty()) {
    let cur = queue.dequeue();

    result.push(cur.val);

    if (cur.left) {
      queue.enqueue(cur.left);
    }

    if (cur.right) {
      queue.enqueue(cur.right);
    }
  }
  return result;
}

console.log(levelOrderTraversal(n1));
