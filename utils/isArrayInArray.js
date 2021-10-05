export function isArrayInArray(arr, item) {
  let item_as_string = JSON.stringify(item);
  let contains = arr.some(function (ele) {
    return JSON.stringify(ele) === item_as_string;
  });
  return contains;
}
