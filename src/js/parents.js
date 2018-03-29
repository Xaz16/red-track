export const addParentsMethod = () => {
  Element.prototype.parents = function(selector) {
    const elements = [];
    let elem = this;
    const ishaveselector = selector !== undefined;

    while ((elem = elem.parentElement) !== null) {
      if (elem.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }

      if (!ishaveselector || elem.matches(selector)) {
        elements.push(elem);
      }
    }

    return elements;
  };
};


