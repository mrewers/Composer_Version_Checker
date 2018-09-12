import compareVersions from 'compare-versions';

export default function compare(current, latest, name) {
  if (latest && latest !== 'Unknown') {
    const comparison = compareVersions(current, latest);

    if (comparison === -1) {
      const row = document.getElementById(`row-${name}`);
      row.children[1].style.backgroundColor = '#e59393';
      row.children[2].style.backgroundColor = '#e59393';
    }
  }
}
