const getLanguageCode = (langs: string[]) => {
  let values: string[] = [];
  langs.forEach(lang => {
    if (lang === 'English') {
      values.push('en');
    } else if (lang === 'French') {
      values.push('fr');
    }
  });
  return values;
};

export default getLanguageCode;
