function getSourceLink(source, name) {
  if (source === 'wpackagist-plugin') {
    const sourceURL = `https://api.wordpress.org/plugins/info/1.0/${name}.json`;
    return sourceURL;
  }

  return '';
}

export const getPackagistVersion = (url) => {
  return fetch(url)
    .then(response => response.json())
    .then(result => result.version)
    .catch(err => console.log(err));
};

export const getLatestVersions = (source, infoLink) => {
  if (source === 'wpackagist-plugin') {
    latestVersion = getPackagistVersion(infoLink);
  }
};

export const parseVendor = (array1, array2) => {
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
};
