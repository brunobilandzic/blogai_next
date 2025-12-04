import { getParamExample } from "@/lib/utils/parameters";
import mongoose from "mongoose";
import { getToneValues, getLengthValues } from "@/components/UI/forms/constants";

// Schema for blog post
const paramsPromptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  audience: { type: String, required: true },
  promptText: { type: String, required: true },
});

paramsPromptSchema.methods.generatePrompt = function () {
    return `Tvoj je zadatak generirati json dokument s poljima kao iz primjera ${getParamExample()} Ovo je tema blog poasta: ${
        this.theme
      }. Opcije za tone polje su ${getToneValues().join(
        ", "
      )}, a za duljinu blog posta su ${getLengthValues().join(
        ", "
      )}. Za ta polja odaberi vrijednosti koje smatraš prikladnima. Publika za koju je blog post namijenjen je: ${
        this.audience
      }. Dodatni opis kako bi parametri trebali izgledati: ${this.description}. Tvoj je zadatak napisati json stringified dokument koji kasnije mogu parsirati pomocu JSON.parse funkcije u JavaScriptu. Vrati samo validan JSON bez dodatnih objašnjenja. Sve vrijednosti napiši na hrvatskom jeziku.`;
};

paramsPromptSchema.pre("save", function (next) {
    this.promptText = this.generatePrompt();
    next();
});

export const ParamsPrompt =
  mongoose.models.ParamsPrompt ||
  mongoose.model("ParamsPrompt", paramsPromptSchema);
