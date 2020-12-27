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
  FaMugHot,
  FaPercentage,
  FaTruckLoading,
  FaWhatsapp
} from "react-icons/fa";

export const userState = atom({
  key: "user",
  default: {}
});

export default function Menu() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [dots, setDots] = useState(true);
  const [user, setUser] = useState(userInfo !== {} ? userInfo : "");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");

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
      <TopBar title="الإعدادات" page={true} />
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
                  <span onClick={() => setDots(true)}>تسجيل الدخول</span>
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
                      <FaIdCard /> <span>الملف الشخصي</span>
                    </li>
                  </Link>
                  <li className="amount-container">
                    <span>
                      <FaDollarSign />
                      <span>الرصيد</span>
                    </span>
                    <span className="amount">{user.amount}</span>
                    <button
                      className="chargebtn"
                      onClick={() => alert("هذه الخدمة ليست متوفرة حالياً")}
                    >
                      شحن
                    </button>
                  </li>

                  <li>
                    <FaPercentage /> <span>حسومات وقسائم شرائية</span>
                  </li>

                  <Link href="/details/orders">
                    <li onClick={() => setDots(true)}>
                      <FaTruckLoading /> <span>الطلبيات </span>
                    </li>
                  </Link>
                </>
              )}
            </>
          )}
          <Link href="/details/customers">
            <li onClick={() => setLoading(true)}>
              <FaMugHot /> <span>حقوق الزبون</span>
            </li>
          </Link>

          <Link href="/details/conditions">
            <li onClick={() => setLoading(true)}>
              <FaFileContract /> <span>شروط الاستخدام</span>
            </li>
          </Link>

          <Link href="https://wa.me/+96181026095?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C+%D8%A8%D8%AF%D9%8A+%D8%AA%D8%B3%D8%A7%D8%B9%D8%AF%D9%86%D9%8A+%D8%A8%D9%80">
            <li>
              <FaWhatsapp /> <span>اتصل بنا</span>
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

        .amount:after {
          margin: auto 0.5rem;
          content: "ل.ل";
        }

        .chargebtn {
          background: white;
          border: 1px solid ${styles.primaryColor};
          padding: 0.2rem 0.8rem;
          border-radius: 0.2rem;
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
