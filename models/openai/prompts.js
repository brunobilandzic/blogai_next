import mongoose from "mongoose";
import { getDefaultThemes, getParamExample } from "@/lib/utils/prompt";
import { BlogParameters } from "./parameters";

// Schema for prompts associated with blog
// it has blog parameters and the prompt text
// from blog parameters we can generate the prompt text
const blogPromptSchema = new mongoose.Schema({
  blogParameters: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogParameters",
  },
  promptText: { type: String },
});

// Schema for prompts associated with parameters generation
// it has user id, themes (optional or default) and the prompt text
const parametersPromptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  themesAudience: [{ type: String, required: true }],
  nParameters: { type: Number, default: 1 },
  promptText: { type: String },
});

blogPromptSchema.methods.generatePromptText = async function () {
  const blogParameters = await BlogParameters.findById(
    this.blogParameters
  ).populate("chapters");

  return `ZADATAK
        Napiši opširan HTML blog post na hrvatskom jeziku na temu ${
          blogParameters.theme
        }. Možeš prilagoditi fokus teme ciljanoj publici ${
    blogParameters.audience
  }.

        JEZIK I STIL

        Piši prirodnim hrvatskim (hr-HR), informativno i angažirano.
        Bez fraza tipa “u ovom poglavlju ćemo…”. Nikad ne obećavaj sadržaj koji ne isporučiš.
        Ne koristi riječi “poglavlje”, “tema”, “opis”, “podtema” u naslovima. Naslove piši kao u pravom blogu.
        Uključi bogat vokabular i duge, SEO-prijateljske rečenice, ali bez “keyword stuffing”-a.

        STRUKTURA HTML-a (SAMO "<body>" i "<article>")
        Ispiši isključivo element "<body>…</body>" bez "<html>", "<head>", "<title>", CSS-a ili JS-a.


        Unutar "<body>" koristi semantički HTML ovim redoslijedom:

        1. Bez naslova stranice ili glavnog naslova.
        2. Uvodni odlomak sa naslovom koji ističe da je to uvodni odlomak, ne direktno, nego suptilno sažeto postavite kontekst i vrijednost za čitatelja dI prikladnom slikom. Ne piši o publici, piši za publiku. Ne koristi izraze poput "opis bloga:" ili "ciljana publika:".
        3. Glavna tijela članka u sekcijama:
        - Za svako poglavlje iz ${blogParameters.chaptersString()} niza  za naziv sekcije (naslov možete promijeniti ako postoji prikladnija varijanta).
        - Ispod <h2> napišite opis sekcije (možete ga nadopuniti i prilagoditi publici).
        - Ako sekcija ima podpoglede, za svaki koristite <h3> i ispod njega sadržaj.
        - Svaki (pod)odjeljak mora imati najmanje 5 potpunih rečenica.
        - Dodajte dodatne sekcije ako doprinose jasnoći i potpunosti teme.
        6. Zaključak s jasnim “takeaways” (ključni savjeti / koraci), naslov poglavlja treba biti prikladan za čitatelja.
        7. ako postoje, <ul> i <ol> elementi trebaju imati class="list"
        8. Ne izmišljaj resurse ni reference; ako ih spominješ, sadržaj zaista mora biti prisutan u članku.


        DULJINA
        Duljina blog posta zavisi o odabranom parametru duljine: ${
          blogParameters.length
        }
        - short: 800-1200 riječi
        - medium: 1500-2000 riječi
        - long: 2500-3000 riječi

        SEO ZAHTJEVI

        U tekstu prirodno koristi sinonime i long-tail fraze relevantne za ${
          blogParameters.theme
        }.
        Uključi unutarnje mikro-FAQ odjeljak (2–4 česta pitanja s odgovorima po 3–5 rečenica) ako je prikladno.
        Cilj je što bolje rangiranje na tražilicama za temu ${
          blogParameters.theme
        }.


        SLIKE (OBAVEZNO)

        U svakoj većoj sekciji dodaj barem jednu relevantnu sliku.
        Format slike mora biti točno kao u primjeru {img_example} – zadrži isti hostname i path, zamijeni samo opis slike s onime što slika prikazuje, pogodno za SEO. Tako da tako i nazovem datoteku.
        Za svaku sliku koristi "<figure class="fig">", unutar nje "<img>" i "<figcaption>" <figcaption> ne smije započeti sa "slika opisuje..." nego samo napiši kratku rečenicu o članku i slici potpoglavlja u kojoj se nalazi.
        U "<img>" obavezno stavi "alt" i "title" atribute s deskriptivnim, SEO-prijateljskim tekstom.
        Slike moraju biti konkretno vezane uz sekciju u kojoj se nalaze. Moraju se nalaziti odmah nakon naslova sekcije ili podsekcije.


        KVALITETA I ISTINITOST

        Ne ostavljaj prazne ili generičke odlomke; svaki mora dodati novu vrijednost.
        Ne obećavaj vodiče ili popise koje ne isporučiš. Ako nešto spomeneš, napiši.
        Izbjegavaj floskule i općenitosti – koristi praktične savjete, primjere i jasno objašnjenje “zašto” i “kako”.
        Provjeri činjenice i osiguraj točnost; ne izmišljaj informacije.
        Probaj da post što manje izgleda kao da ga je pisao AI. 

        IZLAZNI FORMAT (STROGO SE DRŽI REDOSLIJEDA)

        1. Prvo ispiši kompletan HTML sadržaj isključivo u "<body>…</body>".
        2. Napiši SEO s obzirom na temu blog posta ${
          blogParameters.theme
        } i njegov sadržaj.
        2. Nakon "</body>" ispiši tri SEO linije bez ikakvih tagova ili dodatnog markup-a, točno ovim formatom (jedna stavka po liniji):

        """
        title - generiraj SEO-prijateljski naslov od 50-60 znakova
        description - generiraj SEO-prijateljski meta opis od 150-160 znakova
        keywords - generiraj 5-10 relevantnih ključnih riječi ili fraza, odvojene zarezom

        bez navodnika i bez ikakvog dodatnog teksta
        """

        Nakon "</body>", ispiši sljedeće blokove teksta, bez HTML tagova i bez dodatnog markup-a, redom:

        Blog title,
        Ciljana publika: Cijeli blog post mora biti izričito namijenjen publici ${
          blogParameters.audience
        }
        Prijedloga za facebook oglase: Napiši prijedlog teksta facebook oglasa, ciljana publika za facebook oglas. Tekst oglasa ne smije biti duži od 125 znakova. Napiši 3 varijante. Tekst oglasa mora biti u skladu s temom blog posta i mora biti napisan tako da potakne korisnike na čitanje blog posta. Mora navesti gledaoca da klikne na link i pročita blog post.

        DODATNE NAPOMENE

        Ako je ciljna publika specificirana, ton i primjeri prilagodi njima; inače piši za širu publiku.
        Ako teme iz ${blogParameters.chaptersString()} nisu dovoljno sveobuhvatne, smiješ ih izmijeniti ili dodati nove da članak bude potpun.
        Ne uključuj nikakve napomene o tome da si AI ili kako generiraš sadržaj.
        Ne uključuj ništa osim traženog: "<body>…</body>", zatim SEO linije meni za uporabu.


        ULAZNI PODACI

        Tema: ${blogParameters.title}
        Opis bloga (dopuni i prilagodi publici): ${blogParameters.description}
        Predložene sekcije i podpoglavlja: ${blogParameters.chaptersString()}
        Primjer formata slike: ${img_example}`;
};

// Instance method to generate prompt text from other fields
parametersPromptSchema.methods.generatePromptText = function () {
  return `Ignoriraj sve prethodne upute. Ti si stručnjak za generiranje parametara za blog postove.
        tvoj zadatak je generirati JSON objekt koji sadrži parametre za generiranje ${
          this.nParameters
        } blog postova. Ovo je primjer JSON objekta koji trebaš generirati: ${getParamExample()}
        Teme i publika su u formatu: tema / publika i imaju sljedeće vrijednosti:
       ${this.themesAudience.join("\n")}
        Moraš vratiti samo JSON objekt, koji ima jedan ključ "blogPostParams" sa nizom on ${
          this.nParameters
        } blog postova, bez dodatnog teksta ili objašnjenja, tako da se moze spremiti u .json datoteku. 
        Objekt mora sadržavati točno ${this.nParameters} blog postova.`;
};

// Auto-generate/update promptText before saving when themes change or promptText is empty
parametersPromptSchema.pre("save", function (next) {
  if (
    !this.promptText ||
    this.isModified("themesAudience") ||
    this.isModified("nParameters")
  ) {
    this.promptText = this.generatePromptText();
  }
  next();
});

export const ParametersPrompt =
  mongoose.models.ParametersPrompt ||
  mongoose.model("ParametersPrompt", parametersPromptSchema);

export const BlogPrompt =
  mongoose.models.BlogPrompt || mongoose.model("BlogPrompt", blogPromptSchema);
