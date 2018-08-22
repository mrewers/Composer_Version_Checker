function getSourceLink(source, name) {
  if (source === 'wpackagist-plugin') {
    const sourceURL = `https://api.wordpress.org/plugins/info/1.0/${name}.json`;
    return sourceURL;
  }

  return '';
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
    const latestVersion = 'Unknown';

    array2.push({
      name: packageName, version: versionValue, latest: latestVersion, source: vendorName, infoLink: sourceURL,
    });
  });
}
