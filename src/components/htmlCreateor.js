function createHtmlElement(type, id, classesArray, content, attributeObject) {
  const element = document.createElement(type);
  if (id) element.id = id;
  if (classesArray){
    classesArray.forEach((className) => element.classList.add(className));
  }
  if (content) element.innerHTML = content;
  if (attributeObject) {
    attributeObject.forEach((attribute) => { element.setAttribute(attribute.name, attribute.value) });
  }

  return element;
}

export default createHtmlElement;

// code fragment from etch a sketch
