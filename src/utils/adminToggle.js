export function toggleAdmin() {
  const adminMenu = document.querySelector('.admin-popup');
  adminMenu.style.display = 'block';
}

export function hideAdmin() {
  const adminMenu = document.querySelector('.admin-popup');
  adminMenu.style.display = 'none';
}
