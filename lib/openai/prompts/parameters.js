import { getParamExample } from "@/lib/utils/parameters";

export const buildParamsDescPrompt = async (paramsDesc, numParams) => {
  return `Ignoriraj sve prethodne upute. Ti si stručnjak za generiranje parametara za blog postove.
        tvoj zadatak je generirati JSON objekt koji sadrži parametre za generiranje ${numParams} blog postova.
        Ovo je primjer JSON objekta koji trebaš generirati: ${getParamExample()}
        Teme i publika su u formatu: tema / publika i imaju sljedeće vrijednosti:
        {gen_themes}
        Moraš vratiti samo JSON objekt, bez dodatnog teksta ili objašnjenja, tako da se moze spremiti u .json datoteku. 
        Objekt mora sadržavati točno {bp_num} blog postova.`;
};

export const validateParamsDesc = async (description) => {
  const prompt = await checkDescriptionPrompt(description);
  const response = await fetchResponse(prompt);
  return response.toLowerCase() === "da";
};
