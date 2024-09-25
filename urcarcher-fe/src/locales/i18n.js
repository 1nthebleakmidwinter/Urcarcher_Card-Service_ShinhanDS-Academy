
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "locales/en/translation.json";
import translationKO from "locales/ko/translation.json";
import translationJP from "locales/jp/translation.json";
import translationCN from "locales/cn/translation.json";
const resources = {
  en: {
    translation: translationEN
  },
  ko: {
    translation: translationKO
  },
  jp: {
    translation: translationJP
  },
  cn: {
    translation: translationCN
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ko", // 기본 설정 언어, 'cimode'로 설정할 경우 키 값으로 출력된다.
    fallbackLng: "ko", // 번역 파일에서 찾을 수 없는 경우 기본 언어
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;