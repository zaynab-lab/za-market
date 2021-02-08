import Link from "next/link";
import TopBar from "../components/TopBar";
import { styles } from "../public/js/styles";
import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import Dots from "../components/Loaders/Dots";
import Image from "../components/Image";
import axios from "axios";
import Loader from "../components/Loader";
import {
  FaDollarSign,
  FaFileContract,
  FaIdCard,
  FaLanguage,
  FaMugHot,
  FaPercentage,
  FaTruckLoading,
  FaWhatsapp
} from "react-icons/fa";

export const userState = atom({
  key: "user",
  default: {}
});

export const langState = atom({
  key: "lang",
  default: "en"
});

export default function Menu() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [lang, setLang] = useRecoilState(langState);
  const [dots, setDots] = useState(true);
  const [user, setUser] = useState(userInfo !== {} ? userInfo : "");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");

  const dictionary = {
    settings: { en: "Settings", ar: "الإعدادات" },
    login: { en: "Log in", ar: "تسجيل الدخول" },
    profile: { en: "Profile", ar: "الملف الشخصي" },
    credit: { en: "Credit", ar: "الرصيد" },
    charge: { en: "Charge", ar: "شحن" },
    discounts: { en: "Discounts & Copuns", ar: "حسومات وقسائم شرائية" },
    orders: { en: "Orders", ar: "الطلبيات" },
    rights: { en: "Customer's rights", ar: "حقوق الزبون" },
    conditions: { en: "Using Conditions", ar: "شروط الاستخدام" },
    language: { en: "Language", ar: "اللغة" },
    contact: { en: "Contact us", ar: "اتصل بنا" },
    alert: { en: "Comming Soon", ar: "الخدمة قيد التطوير" },
    LBP: { en: "LBP", ar: "ل.ل" }
  };

  useEffect(() => {
    axios
      .get("/api/auth")
      .then((res) => {
        const { data } = res;
        setUser("");
        setUserInfo("");
        if (data !== "noToken" && data !== "invalid") {
          setUser(data);
          setUserInfo(data);
        }
      })
      .then(() => setDots(false));
  }, [setUser, setUserInfo]);

  return (
    <>
      <TopBar title={dictionary.settings[lang]} page={true} />
      {loading && <Loader />}
      <div className="container">
        <div className="menu-header">
          {user ? (
            <>
              <Image name="Profile" setFile={setFile} />
              <div className="userName">{user.name}</div>
            </>
          ) : (
            <>
              <img className="menu-Img" src="/img/png/Profile.png" alt="" />
              {dots ? (
                <Dots />
              ) : (
                <Link href="/Login">
                  <span onClick={() => setDots(true)}>
                    {dictionary.login[lang]}
                  </span>
                </Link>
              )}
            </>
          )}
        </div>

        <ul>
          {dots ? (
            <div className="dots">
              <Dots />
            </div>
          ) : (
            <>
              {user && (
                <>
                  <Link href="/details/profile">
                    <li onClick={() => setDots(true)}>
                      <FaIdCard /> <span>{dictionary.profile[lang]}</span>
                    </li>
                  </Link>
                  <li className="amount-container">
                    <span>
                      <FaDollarSign />
                      <span>{dictionary.credit[lang]}</span>
                    </span>
                    <span className="amount">
                      {user.amount}
                      <span className="amountCurrency">
                        {dictionary.LBP[lang]}
                      </span>
                    </span>
                    <button
                      className="chargebtn"
                      onClick={() => alert(dictionary.alert[lang])}
                    >
                      {dictionary.charge[lang]}
                    </button>
                  </li>
                  <Link href="/details/offers">
                    <li>
                      <FaPercentage /> <span>{dictionary.discounts[lang]}</span>
                    </li>
                  </Link>

                  <Link href="/details/orders">
                    <li onClick={() => setDots(true)}>
                      <FaTruckLoading /> <span>{dictionary.orders[lang]}</span>
                    </li>
                  </Link>
                </>
              )}
            </>
          )}
          <Link href="/details/customers">
            <li onClick={() => setLoading(true)}>
              <FaMugHot /> <span>{dictionary.rights[lang]}</span>
            </li>
          </Link>
          <Link href="/details/conditions">
            <li onClick={() => setLoading(true)}>
              <FaFileContract /> <span>{dictionary.conditions[lang]}</span>
            </li>
          </Link>
          <li>
            <div className="langContainer">
              <div>
                <FaLanguage /> <span>{dictionary.language[lang]}</span>
              </div>
              <div>
                <select onChange={(e) => setLang(e.target.value)}>
                  {lang === "ar" && <option value="ar">العربية</option>}
                  <option value="en">English</option>
                  {lang === "en" && <option value="ar">العربية</option>}
                </select>
              </div>
            </div>
          </li>

          <Link href="https://wa.me/+96170097533?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C+%D8%A8%D8%AF%D9%8A+%D8%AA%D8%B3%D8%A7%D8%B9%D8%AF%D9%86%D9%8A+%D8%A8%D9%80">
            <li>
              <FaWhatsapp /> <span>{dictionary.contact[lang]}</span>
            </li>
          </Link>
        </ul>
      </div>

      <style jsx>{`
        .container {
          overflow: auto;
          height: calc(100vh - 3rem);
        }
        .menu-header {
          color: ${styles.primaryColorLight};
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border-bottom: 1px solid ${styles.primaryColor};
        }

        .menu-Img {
          width: 8rem;
          height: 8rem;
          padding: 0.2rem;
          fill: grey;
          opacity: 60%;
        }

        .userName {
          font-size: 1.3rem;
          color: ${styles.secondaryColor};
        }

        li {
          padding: 0.5rem;
          border-bottom: 1px solid #eee;
        }

        .amount-container {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }

        .amountCurrency {
          margin: auto 0.5rem;
        }

        .chargebtn {
          background: white;
          border: 1px solid ${styles.primaryColor};
          padding: 0.2rem 0.8rem;
          border-radius: 0.2rem;
        }
        .langContainer {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }
        select {
          background: white;
        }

        .dots {
          height: 7rem;
          padding: 1rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
