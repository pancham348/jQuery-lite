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



})();
