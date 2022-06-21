const parseJsonStringToObject = ({ jsonString, defaultKey, restKeys }) => {
  let parsedObject = null;

  if (typeof jsonString !== "string") {
    return {};
  }

  try {
    parsedObject = JSON.parse(jsonString);
  } catch (error) {
    console.error(error);
    parsedObject = { [defaultKey]: jsonString };

    Array.isArray(restKeys) &&
      restKeys.forEach(key => {
        parsedObject[key] = "";
      });
  }

  return parsedObject;
};

export default parseJsonStringToObject;
