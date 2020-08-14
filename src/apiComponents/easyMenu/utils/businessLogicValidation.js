export const validateNoDuplicateCategoryName = (categories) => {
  const categoryNames = categories.map(category => category.name);
  let tmpSet = new Set();
  categoryNames.forEach(categoryName => {
    tmpSet.add(categoryName);
  })
  if (tmpSet.size === categoryNames.length) {
    return true;
  }
  return false;
}
