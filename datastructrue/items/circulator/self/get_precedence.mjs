/**
 *
 * @param {string} op 运算符
 */
export function getPrecedence(op) {
  if (op === "+" || op === "-") {
    return 1;
  }

  if (op === "*" || op === "/") {
    return 2;
  }

  return 0;
}
