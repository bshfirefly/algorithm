/**
 * 获取运算符的优先级
 * @param {string} op 运算符
 * @returns {number} 优先级值
 */
function getPrecedence(op) {
  if (op === "+" || op === "-") {
    return 1;
  }
  if (op === "*" || op === "/") {
    return 2;
  }
  // 对于括号，在比较时通常不考虑，或给定一个特殊值
  return 0;
}

/**
 * 执行计算 a op b
 * @param {string} op 运算符
 * @param {number} b 第二个操作数 (栈顶)
 * @param {number} a 第一个操作数 (栈顶的下一个)
 * @returns {number} 计算结果
 */
function applyOp(op, a, b) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      // 考虑除零错误，这里简化处理，实际应用中可能需要抛出错误
      if (b === 0) {
        throw new Error("除数不能为零！");
      }
      // 整数除法或浮点数除法，这里使用浮点数除法
      return a / b;
    default:
      throw new Error("不支持的运算符: " + op);
  }
}

/**
 * 词法分析器 (Tokenizer)：将不规则的表达式字符串分割成 Tokens 数组。
 * @param {string} expression 原始表达式字符串，可能没有空格
 * @returns {Array<string>} Tokens 数组
 */
function tokenize(expression) {
  const tokens = [];
  let i = 0;
  const n = expression.length;

  while (i < n) {
    const char = expression[i];
    // 1. 忽略空格
    if (char === " ") {
      i++;
      continue;
    }

    // 2. 识别数字 (支持多位数和小数点)
    if ((char >= "0" && char <= "9") || char === ".") {
      let numStr = "";
      // 一直读取数字和小数点
      while (
        i < n &&
        ((expression[i] >= "0" && expression[i] <= "9") ||
          expression[i] === ".")
      ) {
        numStr += expression[i];
        i++;
      }
      tokens.push(numStr);
      continue;
    }

    // 3. 识别运算符和括号 (单个字符)
    if ("+-*/()".includes(char)) {
      tokens.push(char);
      i++;
      continue;
    }

    // 4. 遇到无法识别的字符
    throw new Error(`无法识别的字符: ${char} 在位置 ${i}`);
  }

  return tokens;
}

/**
 * 使用双栈法计算包含 (+, -, *, /, ()) 的中缀表达式
 * 假设输入表达式中的数字、运算符和括号之间都有空格隔开，
 * 例如: "3 + 4 * (2 - 1)"
 * @param {string} expression 中缀表达式字符串
 * @returns {number} 计算结果
 */
function evaluateInfix(expression) {
  // 两个栈：数组作为栈使用 (push/pop)
  const values = []; // 操作数栈 (S_nums)
  const ops = []; // 运算符栈 (S_ops)
  const tokens = tokenize(expression);
  // 辅助函数：执行一次计算
  function performCalculation() {
    const op = ops.pop();
    const val2 = values.pop(); // b
    const val1 = values.pop(); // a
    if (val1 === undefined || val2 === undefined) {
      throw new Error("表达式格式错误，缺少操作数。");
    }
    const result = applyOp(op, val1, val2);
    values.push(result);
  }

  for (const token of tokens) {
    // 1. 数字 (操作数)
    if (!isNaN(parseFloat(token)) && isFinite(token)) {
      values.push(parseFloat(token));
      // 2. 左括号 '('
    } else if (token === "(") {
      ops.push(token);
      // 3. 右括号 ')'
    } else if (token === ")") {
      // 不断计算直到遇到左括号
      while (ops.length > 0 && ops[ops.length - 1] !== "(") {
        performCalculation();
      }
      if (ops.length === 0 || ops[ops.length - 1] !== "(") {
        throw new Error("括号不匹配：缺少左括号。");
      }
      ops.pop(); // 弹出并丢弃 '('

      // 4. 运算符 (+, -, *, /)
    } else {
      // 处理优先级：当栈顶运算符优先级大于等于当前运算符时，先执行栈顶运算
      while (
        ops.length > 0 &&
        ops[ops.length - 1] !== "(" &&
        getPrecedence(ops[ops.length - 1]) >= getPrecedence(token)
      ) {
        performCalculation();
      }
      // 当前运算符入栈
      ops.push(token);
    }
  }

  // 5. 表达式扫描完毕，处理 S_ops 中剩余的运算符
  while (ops.length > 0) {
    performCalculation();
  }

  // 6. 最终结果在 values 栈中
  if (values.length !== 1 || ops.length !== 0) {
    throw new Error("表达式格式错误或未完全计算。");
  }
  return values[0];
}

// 示例调用：
try {
  //   const expr1 = "3 + 4 * ( 2 - 1 )";
  //   const result1 = evaluateInfix(expr1); // 3 + 4 * 1 = 7
  //   console.log(`${expr1} = ${result1}`); // 输出: 3 + 4 * ( 2 - 1 ) = 7
  //   const expr2 = "10 / 2 + 3 * 6 - 1";
  //   const result2 = evaluateInfix(expr2); // 5 + 18 - 1 = 22
  //   console.log(`${expr2} = ${result2}`); // 输出: 10 / 2 + 3 * 6 - 1 = 22

  const expr = "3 * (5 + 2)";
  console.log(evaluateInfix(expr));
} catch (error) {
  console.error("计算错误:", error.message);
}
