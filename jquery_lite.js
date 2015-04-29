(function(){

  var $l = window.$l =  function(arg){
    var triggers = [];
      if (arg instanceof HTMLElement){
        var node = [arg];
        return new DOMNodeCollection(node);
      }else if(typeof(arg) === 'string'){
        var nodes =  Array.prototype.slice.call(document.querySelectorAll(arg));
        return new DOMNodeCollection(nodes);
      }else if(typeof(arg) === 'function'){
        if(document.readyState != "complete" ){
          triggers.push(arg);
        }
      }

      document.addEventListener('DOMContentLoaded', function() {
        triggers.forEach(function(action){
          action.call(this);
        });
      });

  };

  $l.prototype.extend = function(){
    var extended = {};
    var prop;

    //build the target
    var args = [].slice.call(arguments)
    var defaults = args.shift();
    for(prop in defaults){
      if(Object.prototype.hasOwnProperty.call(defaults, prop)){
        extended[prop] = defaults[prop];
      }
    }

    args.forEach(function(option) {
      for(prop in option){
        if(Object.prototype.hasOwnProperty.call(option, prop)){
          extended[prop] = option[prop];
        }
      }
    });


    return extended;
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

DOMNodeCollection.prototype.children = function(){
  var result = [];
  var collection = this.HTMLElements;

  collection.forEach(function(element) {
    result = result.concat([].slice.call(element.children));
  });

  return new DOMNodeCollection(result);
}

DOMNodeCollection.prototype.parent = function(){
  var result = [];
  var collection = this.HTMLElements;
  var parents = {}
  collection.forEach(function(element){
    if(!parents[element]){
      result.push(element.parentNode);
      parents[element] = true;
    }
  });


  return new DOMNodeCollection(result);
}

DOMNodeCollection.prototype.find = function(selector){
  var results = [];
  var collection = this.HTMLElements;
  collection.forEach(function(element){
    var result = element.querySelectorAll(selector);
    results = results.concat([].slice.call(result));
  });

  return new DOMNodeCollection(results);
}

DOMNodeCollection.prototype.remove = function(selector) {
  var collection = this.find(selector).HTMLElements;

  collection.forEach(function(element) {
    element.remove();
  });

  return "Removed nodes..";
}

DOMNodeCollection.prototype.on = function(eventType, DOMEvent){
  var collection = this.HTMLElements;

  collection.forEach(function(element) {
    element.addEventListener(eventType, DOMEvent)
  });

}

DOMNodeCollection.prototype.off = function(eventType, DOMEvent){
  var collection = this.HTMLElements;

  collection.forEach(function(element) {
    element.removeEventListener(eventType, DOMEvent)
  });

}



})();
