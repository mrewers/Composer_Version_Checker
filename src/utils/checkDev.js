export default function checkForDev(version) {
  const regex = /dev|\^|\*/g;
  const found = version.match(regex);

  return (found);
}
