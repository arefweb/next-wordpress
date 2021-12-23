
export function removeTags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  let sant1 = str.replace(/(<([^>]+)>)/gi, "");
  let sant2 = sant1.replace("[&hellip;]", "...");
  let sant3 = sant2.replace("&nbsp;", " ");
  return sant3;
}