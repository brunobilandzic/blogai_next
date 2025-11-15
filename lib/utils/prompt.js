import { BlogParameters } from "@/models/openai/parameters";

export const getParamExample = () => {
  let example = "";
  Object.keys(BlogParameters.schema.obj).forEach((key) => {
    example += `${key}: ${JSON.stringify(BlogParameters.schema.obj[key])}\n`;
  });

  return example;
};

export const defaultThemes = [
  "Kuhinjski pribor i oprema / Ljubitelji kuhanja, domaćice, amateri kuhari",
  "Zdravlje i prehrana / Osobe koje brinu o zdravlju, nutricionisti, sportaši",
  "Recepti i kuhanje / Početnici u kuhanju, iskusni kuhari, studenti",
  "Ekologija i održivost u kuhinji / Ekološki osviješteni pojedinci, obitelji",
  "Psihologija prehrane / Psiholozi, roditelji, osobe koje žele promijeniti prehrambene navike",
  "Sigurnost hrane / Roditelji, ugostitelji, zdravstveni radnici",
  "Organizacija kuhinje / Zaposleni ljudi, male obitelji, studenti",
  "Trendovi u kulinarstvu / Mladi, food blogeri, kulinarski entuzijasti",
  "Domaća izrada i DIY kuhinjski projekti / Kreativci, hobisti, obitelji s djecom",
  "Utjecaj prehrane na zdravlje / Osobe s kroničnim bolestima, starije osobe",
  "Sezonske namirnice / Ljubitelji lokalne hrane, vrtlari, kuhari",
  "Nutricionizam / Nutricionisti, sportaši, roditelji",
  "Zero waste kuhanje / Ekološki aktivisti, mlade obitelji, studenti",
  "Kultura i povijest hrane / Ljubitelji povijesti, putnici, studenti gastronomije",
  "Savjeti za uštedu vremena u kuhinji / Zaposleni ljudi, roditelji, studenti",
  "Tehnologija u kuhinji / Tehno entuzijasti, mladi, profesionalni kuhari",
  "Savjeti za kupovinu namirnica / Obitelji, studenti, osobe s ograničenim budžetom",
  "Vegetarijanska i veganska prehrana / Vegetarijanci, vegani, osobe s posebnim prehrambenim navikama",
  "Prehrana za posebne potrebe / Osobe s alergijama, dijabetičari, sportaši",
  "Dječja prehrana / Roditelji, odgajatelji, pedijatri",
  "Kulinarski festivali i događaji / Food blogeri, turisti, kulinarski entuzijasti",
  "Moda i ljepota / Modni entuzijasti, stilisti, influenceri",
  "Putovanja i avanture / Putnici, avanturisti, blogeri",
  "Brza i jednostavna jela / Zaposleni ljudi, studenti, početnici u kuhanju",
  "Gastro turizam / Putnici, ljubitelji hrane, blogeri",
  "Prehrana djece u školama / Roditelji, učitelji, nutricionisti",
  "Bezglutenska prehrana / Osobe s intolerancijom na gluten, roditelji, kuhari",
  "Pametna kuhinjska rješenja / Tehno entuzijasti, inovatori, mlade obitelji",
  "Street food kultura / Mladi, putnici, kulinarski entuzijasti",
  "Prehrana seniora / Starije osobe, zdravstveni radnici, obitelji",
  "Kuhanje s djecom / Roditelji, odgajatelji, učitelji",
  "Prehrana sportaša / Sportaši, treneri, nutricionisti",
  "Kulinarske tradicije regije / Ljubitelji tradicije, lokalni stanovnici, turisti",
  "Kuhinja i kultura / Ljubitelji kulture, putnici, studenti",
  "Prehrambene navike mladih / Studenti, tinejdžeri, mlade obitelji",
  "Kuhanje na budžetu / Studenti, mlade obitelji, osobe s ograničenim primanjima",
  "Fermentirana hrana / Ljubitelji zdravlja, hobisti, nutricionisti",
  "Kuhanje bez otpada / Ekološki osviješteni, obitelji, studenti",
  "Prehrana u trudnoći / Trudnice, budući roditelji, nutricionisti",
  "Kuhanje na otvorenom / Kamperi, izletnici, ljubitelji prirode",
  "Prehrana i mentalno zdravlje / Psiholozi, studenti, zaposleni",
  "Kuhanje za posebne prilike / Organizatori događanja, obitelji, kuhari",
  "Prehrana i fitness / Sportaši, treneri, fitness entuzijasti",
  "Kuhanje s lokalnim namirnicama / Vrtlari, kuhari, ljubitelji prirode",
  "Prehrana i alergije / Osobe s alergijama, roditelji, zdravstveni radnici",
  "Kuhanje bez mesa / Vegetarijanci, vegani, ekološki aktivisti",
  "Prehrana i tehnologija / Tehno entuzijasti, mladi, inovatori",
  "Kuhanje za djecu / Roditelji, odgajatelji, učitelji",
  "Prehrana i putovanja / Putnici, blogeri, ljubitelji hrane",
  "Kuhanje za starije osobe / Starije osobe, obitelji, zdravstveni radnici",
  "Prehrana i tradicija / Ljubitelji tradicije, lokalni stanovnici, turisti",
  "Kuhanje bez glutena / Osobe s intolerancijom, roditelji, kuhari",
  "Prehrana i održivost / Ekološki aktivisti, obitelji, studenti",
  "Kuhanje s prijateljima / Mladi, studenti, obitelji",
];

export const getDefaultThemes = (nThemes) => {
  const indexes = [];
  while (indexes.length < nThemes) {
    const randIndex = Math.floor(Math.random() * defaultThemes.length);
    if (!indexes.includes(randIndex)) {
      indexes.push(randIndex);
    }
  }
  return indexes.map((index) => defaultThemes[index]);
};

export const sampleParams = {
  blog_posts: [
    {
      theme: "",
      blog_description: "",
      audience: "",
      chapters: [
        {
          name: "",
          description: "",
          sub_themes: [""],
        },
      ],
    },
  ],
};

export const imageExample = `<img class="slika" src="https://www.kuhinja.net/sk/{generiraj_neki_opis}.jpg" alt="Alt generiranog opisa slike" />`;

export const defaultAudiences =
  "Osobe koje vole kuhanje, kuhinjsku opremu, recepte i zdravlje.";