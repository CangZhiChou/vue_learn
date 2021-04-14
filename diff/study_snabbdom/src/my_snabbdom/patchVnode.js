import createElement from "./createElement";

export default function patchVnode(oldVnode, newVnode) {
  // 1. 判断新旧 vnode 是否是同一个对象
  if (oldVnode === newVnode) return;
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
      // 所有未处理的节点的开头
      let un = 0;
      for (let newCh of newVnode.children) {
        let isExist = false;
        for (let oldCh of oldVnode.children) {
          if (oldCh.sel === newCh.sel && oldCh.key === newCh.key) {
            isExist = true;
          }
        }
        if (!isExist) {
          console.log(newCh);
          let dom = createElement(newCh);
          newCh.elm = dom;
          if (un < oldVnode.children.length) {
            oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm);
          } else {
            oldVnode.elm.appendChild(dom);
          }
        } else {
          // 让处理的节点指针下移
          un++;
        }
      }
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
}
