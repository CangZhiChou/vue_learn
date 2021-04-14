import h from "./my_snabbdom/h";
import patch from "./my_snabbdom/patch";

let container = document.getElementById("container");
let btn = document.getElementById("btn");

// const myVnode1 = h("h1", {}, "你好");

const myVnode1 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
]);
// 上树
patch(container, myVnode1);
