Array.prototype.find = function (cb, thisArg = this) {
    const length = thisArg.length;
    for (let i = 0; i < length; i++) {
      if (cb(thisArg[i], i, thisArg)) {
        return thisArg[i];
      }
    }
  };
  
  Array.prototype.findIndex = function (cb, thisArg = this) {
    const length = thisArg.length;
    for (let i = 0; i < length; i++) {
      if (cb(thisArg[i], i, thisArg)) {
        return i;
      }
    }
    return -1;
  };
  
  Array.prototype.lastIndexOf = function (search, from) {
    const length = this.length;
    let searchIndex = length - 1;
  
    if (from >= 0 && from < length) {
      searchIndex = from;
    } else if (from < 0) {
      searchIndex = length + from;
    }
  
    for (let i = searchIndex; i >= 0; i--) {
      if (this[i] === search) return i;
    }
    return -1;
  };
  
  Array.prototype.some = function (cb, thisArg = this) {
    const length = thisArg.length;
    for (let i = 0; i < length; i++) {
      if (cb(thisArg[i], i, thisArg)) return true;
    }
    return false;
  };
  
  Array.prototype.every = function (cb, thisArg = this) {
    const length = thisArg.length;
    for (let i = 0; i < length; i++) {
      if (!cb(thisArg[i], i, thisArg)) {
        return false;
      }
    }
    return true;
  };
  
  Array.prototype.reduce = function (cb, initialValue) {
    if (this.length < 1 && initialValue === undefined) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    let startIndex = initialValue === undefined ? 1 : 0;
    let accumulator = initialValue === undefined ? this[0] : initialValue;
  
    for (let i = startIndex; i < this.length; i++) {
      accumulator = cb(accumulator, this[i], i, this);
    }
    return accumulator;
  };
  
  Array.prototype.reduceRight = function (cb, initialValue) {
    if (this.length < 1 && initialValue === undefined) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    let startIndex =
      initialValue === undefined ? this.length - 2 : this.length - 1;
    let accumulator =
      initialValue === undefined ? this[this.length - 1] : initialValue;
  
    for (let i = startIndex; i >= 0; i--) {
      accumulator = cb(accumulator, this[i], i, this);
    }
    return accumulator;
  };
  
  Array.prototype.join = function (str) {
    const length = this.length;
    const separator = str === undefined ? "," : str;
    let result = "";
  
    for (let i = 0; i < length; i++) {
      result += i === length - 1 ? this[i] : this[i] + separator;
    }
    return result;
  };
  
  Array.prototype.pop = function () {
    const arrLength = this.length;
    if (!arrLength) return;
    const lastElement = this[arrLength - 1];
    this.length = arrLength - 1;
    return lastElement;
  };
  
  Array.prototype.unshift = function (...items) {
    this.length += items.length;
    for (let i = this.length - 1; i >= 0; i--) {
      if (i <= items.length - 1) {
        this[i] = items[i];
      } else {
        this[i] = this[i - items.length];
      }
    }
    return this.length;
  };
  