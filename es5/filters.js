"use strict";

exports.__esModule = true;
function filterFactory(regexp) {
  return function (errors) {
    return errors.filter(function (e) {
      return !e.word.match(regexp);
    });
  };
}

var numbers = filterFactory(/^[0-9,\.\-#]+(th|st|nd|rd)?$/);
var acronyms = filterFactory(/^[A-Z0-9]{2,}(['\u2018-\u2019]s)?$/);
var crypto = filterFactory(/^0x[a-fA-F0-9]{40}$/);

exports.default = {
  acronyms: acronyms,
  numbers: numbers,
  crypto: crypto,
  filter: function filter(words, options) {
    var ignoreAcronyms = options && options.ignoreAcronyms;
    var ignoreNumbers = options && options.ignoreNumbers;
    var ignoreCrypto = options && options.ignoreCrypto;

    if (ignoreAcronyms) {
      words = acronyms(words);
    }
    if (ignoreNumbers) {
      words = numbers(words);
    }
    if (ignoreCrypto) {
      words = crypto(words);
    }
    return words;
  }
};