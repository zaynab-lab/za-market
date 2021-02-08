import { useRecoilValue } from "recoil";
import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";
import { langState } from "../menu";

export default function Customer() {
  const lang = useRecoilValue(langState);
  const dictionary = {
    rights: { en: "Customer's rights", ar: "حقوق الزبون" },
    backConditions: {
      en: "Returning products conditions",
      ar: "شروط إرجاع المنتجات"
    },
    conditions: [
      {
        en:
          "The product can be returned if it does not match the required specifications, provided it is safe",
        ar:
          "يمكن إرجاع المنتج في حال عدم تطابقه مع المواصفات المطلوبة، بشرط سلامته."
      },
      {
        en:
          "Non-consumable products can be returned in the event that they refuse to purchase them for a maximum of 48 hours, provided that the safety of the product is required.",
        ar:
          "يمكن إرجاع المنتجات غير الاستهلاكية في حال الإنصراف عن شرائها قبل مدة اقصاها 48 ساعة، ويشترط في ذلك سلامة المنتج ."
      }
    ],
    privecy: { en: "Privecy Police", ar: "سياسة الخصوصية" }
  };
  return (
    <>
      <TopBar title={dictionary.rights[lang]} page={true} />

      <div className="container">
        <div className="title">{dictionary.backConditions[lang]}</div>
        <ul>
          {dictionary.conditions.map((item) => (
            <li>{item[lang]}</li>
          ))}
        </ul>
        <div className="title">{dictionary.privecy[lang]}</div>
        <ul>
          <li></li>

          <li></li>
        </ul>
      </div>

      <style jsx>{`
        .container {
          padding: 0.5rem;
          height: calc(100vh - 3rem);
          font-size: 1.1rem;
          overflow: auto;
        }

        li {
          padding: 0.5rem;
          border-bottom: 1px solid #eee;
        }

        li:before {
          content: " - ";
        }

        .title {
          padding-top: 1rem;
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
