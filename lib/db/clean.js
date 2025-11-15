export default (data) => {
  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      if (value instanceof Date) return value.toISOString();
      if (value?._bsontype === "ObjectID") return value.toString();
      if (value instanceof Buffer) return value.toString();
      return value;
    })
  );
};
