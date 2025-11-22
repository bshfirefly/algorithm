/**
 *
 * @param {string} expression 表达his
 */
export function tokenize(expression) {
  const token = [];
  let i = 0;
  const n = expression.length;

  while (i < n) {
    const char = expression[i];

    // 跳过空格
    if (char === " ") {
      i++;
      continue;
    }
    // 识别数字
    if ((char >= "0" && char <= "9") || char === ".") {
      let numStr = "";
      // 如果事数字或者和小数点就一直处理
      while (
        i < n &&
        ((expression[i] >= "0" && expression[i] <= "9") ||
          expression[i] === ".")
      ) {
        numStr += char;
        i++;
      }

      token.push(numStr);
      continue;
    }

    if ("*/+-()".includes(char)) {
      token.push(char);
      i++;
      continue;
    }

    throw new Error("can't relize char");
  }

  return token;
}
