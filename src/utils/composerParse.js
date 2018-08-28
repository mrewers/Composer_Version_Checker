function getSourceLink(source, name) {
  let sourceURL = '';
  if (source === 'wpackagist-plugin') {
    sourceURL = `https://api.wordpress.org/plugins/info/1.0/${name}.json`;
  } else if (source === 'wordpress') {
    sourceURL = 'https://api.wordpress.org/core/version-check/1.7/';
  } else if (source === 'twig') {
    sourceURL = `https://repo.packagist.org/p/${source}/${name}.json`
  } else {
    sourceURL = 'https://api.github.com/graphql';
  }

  return sourceURL;
}

export default function parseVendor(array1, array2) {
  array1.forEach((element) => {
    const slash = '/';

    const versionValue = element.version;
    const splitName = element.name.split(slash);
    const vendorName = splitName[0];

    let packageName = splitName[1];
    if (!packageName) {
      packageName = vendorName;
    }

    const sourceURL = getSourceLink(vendorName, packageName);

    array2.push({
      name: packageName, version: versionValue, source: vendorName, infoLink: sourceURL,
    });
  });
}
