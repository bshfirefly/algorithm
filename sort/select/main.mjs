// const selection = require("./select_self");
import { select_self } from "./select_self.mjs";

const arr = [10, 7, 8, 9, 1, 5, 3, 4, 6, 2];
const arr_sorted = select_self(arr);
console.log("selection", arr_sorted);
