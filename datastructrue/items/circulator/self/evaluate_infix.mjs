import { applyOp } from "./apply_op.mjs";
import { getPrecedence } from "./get_precedence.mjs";
import { tokenize } from "./tokenize.mjs";

export function evaluateInfix(expression) {
  const values = [];
  const ops = [];

  const tokens = tokenize(expression);

  for (const token of tokens) {
    // 处理数字

    if (!isNaN(parseFloat(token)) && isFinite(token)) {
      values.push(parseFloat(token));
    } else if ("(" === token) {
      ops.push(token);
    } else if (")" === token) {
    }
  }
  return values[0];
}
