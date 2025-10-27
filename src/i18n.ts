import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: {
    translation: {
      cash: "Espèces",
      card: "Carte",
      check: "Chèque",
      waiting_for_payment: "En attente",
      transfer: "Virement",
      other: "Autre",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
