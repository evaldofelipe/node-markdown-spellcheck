function filterFactory(regexp) {
  return (errors) =>
    errors.filter((e) => !e.word.match(regexp));
}

const numbers = filterFactory(/^[0-9,\.\-#]+(th|st|nd|rd)?$/);
const acronyms = filterFactory(/^[A-Z0-9]{2,}(['\u2018-\u2019]s)?$/);
const crypto = filterFactory(/^0x[a-fA-F0-9]{40}$/);

export default {
  acronyms,
  numbers,
  crypto,
  filter(words, options) {
    const ignoreAcronyms = options && options.ignoreAcronyms;
    const ignoreNumbers = options && options.ignoreNumbers;
    const ignoreCrypto = options && options.ignoreCrypto;

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
