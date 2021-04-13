/**
 * 创建节点。将vnode创建为DOM，是孤儿节点，不进行插入
 * @param {*} vnode
 * @param {*} piovt
 */
export default function (vnode) {
  // 创建一个DOM节点，这个节点现在是孤儿节点
  let domNode = document.createElement(vnode.sel);
  // 判断是有子节点还是有文本节点
  if (
    vnode.text !== "" &&
    (vnode.children === undefined || vnode.children.length === 0)
  ) {
    // 说明没有子节点，内部是文本
    domNode.innerText = vnode.text;
    // 补充elm属性
    vnode.elm = domNode;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 说明内部是子节点，需要递归创建节点
  }
  // 返回elm，elm属性是一个纯DOM对象
  return vnode.elm;
}
