/**
 *
 * @param {String} op 运算符号
 * @param {number} a 运算数字1
 * @param {number} b 运算数字2
 */
export function applyOp(op, a, b) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) throw new Error("by zero");
      return a / b;
    default:
      break;
  }
}
