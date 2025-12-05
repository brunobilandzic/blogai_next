export function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) return null;

  const jsonString = text.slice(start, end + 1);

  return JSON.parse(jsonString);
}
