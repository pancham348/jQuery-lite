(function(){

  if (typeof jqueryLite === "undefined") {
    window.jqueryLite = {};
  }

  var $l = jqueryLite.$l =  function(selector){
      return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  var DOMNodeCollection = jqueryLite.DOMNodeCollection = function(elementsArray){
      this.HTMLElements = elementsArray; 
  }

})();
