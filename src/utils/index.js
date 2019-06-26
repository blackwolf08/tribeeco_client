export function getDate(date) {
  let date_ = new Date(date);
  return date_.toLocaleDateString();
}

export function getTime(date) {
  let date_ = new Date(date);
  return date_.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
