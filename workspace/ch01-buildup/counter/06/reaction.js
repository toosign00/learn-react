const reaction = {
  createElement: (tag, props, ...children) => {
    // 요소 노드 생성
    const elem = document.createElement(tag);
    // 속성 추가
    if (props) {
      for (const attrName in props) {
        // 객체의 모든 속성 반복
        const value = props[attrName];
        if (attrName.toLowerCase().startsWith('on')) {
          elem.addEventListener(attrName.toLowerCase().substring(2), value);
        } else {
          elem.setAttribute(attrName, value);
        }
      }
    }
    // 자식 노드 추가
    for (let child of children) {
      if (typeof child === 'string' || typeof child === 'number') {
        child = document.createTextNode(child);
      } else if (typeof child === 'function') {
        child = child();
      }
      elem.appendChild(child);
    }
    // 요소 노드 반환
    return elem;
  },

  // 루트 노드를 관리하는 객체를 생성해서 반환
  // Reaction.createRoot(document.getElementById('root')).render(App);
  createRoot: (rootNode) => {
    return {
      // 루트 노드 하위에 지정한 함수를 실행해서 받은 컴포넌트를 렌더링 한다.
      render(appFn) {
        rootNode.appendChild(appFn());
      },
    };
  },
};
export default reaction;
