import * as Localization from "expo-localization";
import i18n from "i18n-js";

i18n.defaultLocale = "pt-BR";
// Set the key-value pairs for the different languages you want to suppoI18n.defaultLocale = 'pt-BR'rt.
i18n.translations = {
  en: require("./languages/en.json"),
  pt: require("./languages/pt.json"),
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale.substring(0, 2) === "pt" ? "pt" : "en";

export default i18n;
