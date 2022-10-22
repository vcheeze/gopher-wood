/**
 * Validator function for full name.
 * @param {string} fullName
 * @returns {boolean} true if name is valid, and false if not
 */
export const nameValidator = (fullName: string) => {
  const engRegex = /^[A-Za-z ]{1,100}$/;
  const hanRegex = /^[\u4E00-\u9FCC]{2,6}$/;
  return engRegex.test(fullName) || hanRegex.test(fullName);
}
