export const spacify = string => string.replace(/(\w)(-)(\w)/g, '$1 $3');

export const titleCasify = (string) => {
  function setCase(text) {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
  }
  return string.replace(/\w\S*/g, setCase);
};

export const abbrevify = (string) => {
  const replacements = new Map([
    [/Api/g, 'API'],
    [/Cdp/g, 'CDP'],
    [/Cmb2/g, 'CMB2'],
    [/Gtm4wp/g, 'GTM4WP'],
    [/Iip/g, 'IIP'],
    [/Js/g, 'JS'],
    [/Pdcrm/g, 'PDCRM'],
    [/Rss/g, 'RSS'],
    [/Seo/g, 'SEO'],
    [/Ses/g, 'SES'],
    [/Url/g, 'URL'],
    [/Vc/g, 'VC'],
    [/Wp/g, 'WP'],
    [/Wpml|WPml/g, 'WPML'],
  ]);
  let s = string;

  replacements.forEach((value, key) => {
    s = s.replace(key, value);
  });

  return s;
};

export const prettify = (string) => {
  let newString = string;
  newString = abbrevify(titleCasify(spacify(newString)));
  return newString;
};
