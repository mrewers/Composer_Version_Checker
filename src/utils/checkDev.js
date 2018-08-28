export default function checkForDev(version) {
  const regex = /dev|\^|\*/g;
  const found = version.match(regex);
  if (found) {
    return true;
  }
  return false;
}
