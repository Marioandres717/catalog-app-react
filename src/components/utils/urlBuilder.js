const baseURL = 'http://localhost:5000';

export function home() {
  return `${baseURL}/`;
}

export function addItem(categoryId) {
  return `${baseURL}/categories/${categoryId}/items`;
}

export function editItem(categoryId, itemId) {
  return `${baseURL}/categories/${categoryId}/items/${itemId}`;
}

export function fbConnect() {
  return `${baseURL}/fbconnect`;
}

export function readCategories() {
  return `${baseURL}/categories`;
}
