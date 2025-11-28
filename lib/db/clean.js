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

export const cleanSubdocuments = (subdocs) => {
  subdocs = subdocs.filter(
    (cp) =>
      !(
        typeof cp === "undefined" ||
        cp === null ||
        cp._id === null ||
        cp._id === ""
      )
  );
  return subdocs;
};
