(function(){

  var $l = window.$l =  function(selector){
      if (selector instanceof HTMLElement){
        var node = [selector]
        return new DOMNodeCollection(node);
      }else{
        var nodes =  Array.prototype.slice.call(document.querySelectorAll(selector));
        return new DOMNodeCollection(nodes);
      }
  };

  var DOMNodeCollection = function(elementsArray){
      this.HTMLElements = elementsArray;
  };

  DOMNodeCollection.prototype.html = function(string) {
    var innerHTML;

    if (!string) {
      return this.HTMLElements[0].innerHTML;
    } else {
      this.HTMLElements.forEach(function (node) {
        node.innerHTML = string;
      });
    }
  };

  DOMNodeCollection.prototype.empty = function() {
    this.HTMLElements.forEach(function(node) {
      node.innerHTML = "";
    });
  };

  DOMNodeCollection.prototype.attr = function(attributeName, value) {
    if (!value){
      return this.HTMLElements[0].getAttribute(attributeName)
    } else {
      this.HTMLElements.forEach(function(node){
        node.setAttribute(attributeName, value);
      });
      return "attributes changed...";
    };

    return "something wrong happened";
  };

  DOMNodeCollection.prototype.removeClass = function(className) {
    this.HTMLElements.forEach(function (element){
      element.className = element.className.replace(className, "");
    })

    return className + " elements removed...";
  }

  DOMNodeCollection.prototype.addClass = function(className) {
    var that = this;
    this.HTMLElements.forEach(function (element){
      element.className = element.className.replace(className,"")
      if(element.className === ""){
        element.className = element.className + className;
      }else{
        element.className = element.className + " " + className;
      }
    })

    return className + " elements added...";
  }

DOMNodeCollection.prototype.children = function(selector){

}


})();
