export const objectHasEmpty = (obj) => {
  if (Object.keys(obj).length === 0 && obj.constructor === Object) return true;
  let emptyField = false;
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
      emptyField = true;
    }
  });
  return emptyField;
};

export const arrayHasEmptyObjects = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (objectHasEmpty(arr[i])) {
      return true;
    }
  }
  return false;
};
