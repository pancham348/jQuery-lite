(function(){

  var $l = window.$l =  function(selector){
      var nodes =  Array.prototype.slice.call(document.querySelectorAll(selector));
      return new DOMNodeCollection(nodes);
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
  }



})();
