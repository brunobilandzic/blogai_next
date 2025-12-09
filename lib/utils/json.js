export function extractJson(text) {
  /* return {
    theme: "Hajduk",
    description: "Kako potaknuti djecu da vole Hajduka a da nebudu članovi torcide...",
    audience: "djeca",
    tone: "informal",
    chaptersParameters: [
      {
        title: "Upoznaj Hajduka",
        subChapters: [
          "Povijest Hajduka",
          "Vrijednosti kluba",
          "Zašto volimo Hajduk",
        ],
      },
      {
        title: "Hajduk u svakodnevnom životu",
        subChapters: [
          "Kako pratiti utakmice",
          "Ne štetno sudjelovanje u navijačkim aktivnostima",
        ],
      },
      {
        title: "Pozitivan utjecaj Hajduka na djecu",
        subChapters: [
          "Što djeca mogu naučiti iz Hajduka",
          "Sport i timski duh",
        ],
      },
      {
        title: "Torcida i odgovorno navijanje",
        subChapters: [
          "Tko je Torcida",
          "Primjer štetnih ponašanja",
          "Kako biti odgovoran navijač",
        ],
      }
    ],
    length: "medium",
    promptComment: "napiši još i listu od 10 stvari kako bit bolja osoba.",
  }; */
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) return null;

  const jsonString = text.slice(start, end + 1);

  return JSON.parse(jsonString);
}
