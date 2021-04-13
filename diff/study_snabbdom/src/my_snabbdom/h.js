import vnode from "./vnode";
/**
 * 低配版本的h函数，这个函数必须接受三个参数，缺一不可
 * @param {*} sel
 * @param {*} data
 * @param {*} c
 * 调用只有三种形态
 * ① h('div', {}, '文字')
 * ② h('div', {}, [])
 * ③ h('div', {}, h())
 */
export default function (sel, data, c) {
  // 检查参数个数
  if (arguments.length !== 3) {
    throw new Error("请传入只三个参数！");
  }
  // 检查参数c的类型
  if (typeof c === "string" || typeof c === "number") {
    // 说明现在是 ①
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    // 说明是 ②
    let children = [];
    // 遍历c
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] === "object") && c[i].hasOwnProperty("sel")) {
        throw new Error("传入的数组有不是h函数的项");
      }
      // 不用执行c[i], 只要收集
      children.push(c[i]);
    }
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c === "object" && c.hasOwnProperty("sel")) {
    // 说明是 ③
    let children = [c];
    return vnode(sel, data, children, undefined, undefined);
  } else {
    throw new Error("传入的参数类型不对！");
  }
}
