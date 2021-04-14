import vnode from "./vnode";
import createElement from "./createElement";

export default function (oldVnode, newVnode) {
  // 判断传入的第一个参数是 DOM节点 还是 虚拟节点
  if (oldVnode.sel == "" || oldVnode.sel === undefined) {
    // 说明是DOM节点，此时要包装成虚拟节点
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(), // sel
      {}, // data
      [], // children
      undefined, // text
      oldVnode // elm
    );
  }
  // 判断 oldVnode 和 newVnode 是不是同一个节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    console.log("是同一个节点，需要精细化比较");
    // 1. 判断新旧 vnode 是否是同一个对象
    if (oldVnode === newVndoe) return;
    // 2. 判断 newVndoe 有没有 text 属性
    if (
      newVnode.text !== undefined &&
      (newVnode.children === undefined || newVnode.children.length === 0)
    ) {
      // newVnode 有 text 属性
      // 2.1 判断 newVnode 与 oldVnode 的 text 属性是否相同
      if (newVnode.text !== oldVnode.text) {
        // 如果newVnode中的text和oldVnode的text不同，那么直接让新text写入老elm中即可。
        // 如果oldVnode中是children，也会立即消失
        oldVnode.elm.innerText = newVnode.text;
      }
    } else {
      // newVnode 没有text属性 有children属性
      // 2.2 判断 oldVnode 有没有 children 属性
      if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
        // oldVnode有children属性 最复杂的情况，新老节点都有children
      } else {
        // oldVnode没有children属性 说明有text;  newVnode有children属性
        // 清空oldVnode的内容
        oldVnode.elm.innerHTML = "";
        // 遍历新的vnode的子节点，创建DOM，上树
        for (let ch in newVnode.children) {
          let chDOM = createElement(ch);
          oldVnode.elm.appendChild(chDOM);
        }
      }
    }
  } else {
    console.log("不是同一个节点，暴力插入新节点，删除旧节点");
    // 创建 新虚拟节点 为 DOM节点
    let newVnodeElm = createElement(newVnode);
    let oldVnodeElm = oldVnode.elm;
    // 插入 新节点 到 旧节点 之前
    if (newVnodeElm) {
      // 判断newVnodeElm是存在的
      oldVnodeElm.parentNode.insertBefore(newVnodeElm, oldVnodeElm);
    }
    // 删除旧节点
    oldVnodeElm.parentNode.removeChild(oldVnodeElm);
  }
}
