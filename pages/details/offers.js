import axios from "axios";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { langState } from "../menu";

export default function Offers() {
  const lang = useRecoilValue(langState);
  const dictionary = {
    offers: { en: "Discounts & Coupons", ar: "حسومات وقسائم شرائية" },
    shareTowin: { en: "Share link to win", ar: "شارك الرابط وارباح" },
    shareContent: {
      en:
        "If you share the link with others and they log in, you will give them 10,000 LBP, and if any used the app, you will get 10,000 LBP as a credit.",
      ar:
        "في حال قمت بمشاركة الرابط وتم تسجيل الدخول من قبل المرسل إليه سوف تمنحه 10000 ل.ل وفي حال استعماله للتطبيق سوف تحصل على 10000 ل.ل في رصيدك."
    },
    noOne: {
      en: "None of users you send to joined.",
      ar: "لم تتم عضوية أحد قمت بمشاركة الرابط له"
    },
    shared: {
      en: "You shared the link whith",
      ar: "لقد قمت بمشاركة الرابط لـ"
    },
    member: {
      en: "member",
      ar: "عضو"
    },
    noPurchase: {
      en: "No purchases were made by the members you invited.",
      ar: "لم يتم أي عملية شراء من قبل الأعضاء الذين قمت بدعوتهم"
    },
    purchase: {
      en: "purchase from the members you have shared",
      ar: "عملية شراء من الأعضاء الذين قمت بمشاركتهم"
    },
    done: {
      en: "",
      ar: "تمت"
    },
    youhave: {
      en: "You got",
      ar: "لقد حصلت على"
    },
    addedToCredit: {
      en: "LBP with sharing link, and its been added to your credit.",
      ar: "ل.ل بمشاركاتك الرابط، وقد أضيفت إلى رصيدك"
    },
    layal: {
      en: "Collect points with Layal",
      ar: "جمع نقاط مع ليال"
    },
    soon: {
      en: "Soon ...",
      ar: "قريبا....."
    }
  };
  const [user, setUser] = useState(0);
  const [order, setOrder] = useState(0);
  const [code, setCode] = useState("");
  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setCode(btoa(data.promoCode));
        setUser(data.invitations ? data.invitations : 0);
        setOrder(data.activeInvitation ? data.activeInvitation : 0);
      }
    });
  }, [setCode]);

  return (
    <>
      <TopBar title={dictionary.offers[lang]} page={true} />
      <div className="container">
        <div className="title">{dictionary.shareTowin[lang]}</div>
        <div className="promoBox">
          {dictionary.shareContent[lang]}
          <Link
            href={`whatsapp://send?text=https://www.za-market.com/?code=${code}`}
          >
            <span className="icon">
              <FaWhatsapp />
            </span>
          </Link>
          <ul>
            {user ? (
              <li>
                {dictionary.shared[lang]} {user} {dictionary.member[lang]}
              </li>
            ) : (
              <li>{dictionary.noOne[lang]}</li>
            )}
            {!order ? (
              user ? (
                <li>{dictionary.noPurchase[lang]}</li>
              ) : (
                <></>
              )
            ) : (
              <li>
                {dictionary.done[lang]} {order} {dictionary.purchase[lang]}
              </li>
            )}
            <li>
              {dictionary.youhave[lang]} {order * 5000 + user * 5000}{" "}
              {dictionary.addedToCredit[lang]}
            </li>
          </ul>
        </div>

        <div className="title">{dictionary.layal[lang]}</div>
        <div className="promoBox">
          <div>{dictionary.soon[lang]}</div>
        </div>
      </div>

      <style jsx>{`
        .container {
          padding: 0.5rem;
          height: calc(100vh - 3rem);
          font-size: 1.1rem;
          overflow: auto;
        }
        .icon {
          background: #25d366;
          border-radius: 5rem;
          width: 1.8rem;
          height: 1.8rem;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          color: white;
          margin: 0 0.2rem;
        }
        .title {
          text-align: center;
          padding: 0.3rem;
          background: ${styles.thirdColor};
          border: 1px solid ${styles.primaryColor};
          border-raduis: 0.5rem;
        }
        .promoBox {
          padding: 0.5rem;
        }
        ul {
          padding: 1rem;
        }
        li {
          font-size: 0.9rem;
        }
      `}</style>
    </>
  );
}
