import testJSON from './test';

export default function populateDropdown() {
  const dropdown = document.getElementById('site-drop-down');
  dropdown.length = 0;

  const defaultOption = document.createElement('option');
  defaultOption.text = 'Select A Site';
  defaultOption.value = '';

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  const { sites } = testJSON;
  Object.entries(sites).forEach(([index, value]) => {
    const option = document.createElement('option');
    option.id = `${index}_${value.name}`;
    option.text = value.name;
    option.value = value.url;
    dropdown.add(option);
  });
}
