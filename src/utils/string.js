export function getInitial(name) {
  return name ? String(name).charAt(0).toUpperCase() : '';
}

export default getInitial;
