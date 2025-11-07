// const quick_simple = require("./quick_self_simple.mjs");
// const quick_standard = require("./quick_self_standard.mjs");

import { quick_simple } from "./quick_self_simple.mjs";
import { quick_standard } from "./quick_self_standard.mjs";
console.log("简易版本", quick_simple([9, 1, 2, 3, 8, 7, 5, 6, 4, 0]));
console.log("标准版本", quick_standard([9, 1, 2, 3, 8, 7, 5, 6, 4, 0]));
