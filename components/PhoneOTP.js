import { useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { PhonePageState } from "../pages/Login";
import { styles } from "../public/js/styles";
import Router from "next/router";
import ContactUs from "./ContactUs";
import timer from "../util/timer";
import Dots from "./Loaders/Dots";
import { langState } from "../pages/menu";

export const phoneState = atom({
  key: "phone",
  default: ""
});

export default function PhoneOTP({ routeTo }) {
  const lang = useRecoilValue(langState);
  const dictionary = {
    zero: { en: "Start number whithout zero", ar: "ابدء الرقم بدون صفر" },
    check: { en: "Please check the number", ar: "الرجاء التأكد من الرقم" },
    buy: {
      en: "You can complete the purchase",
      ar: "بإمكانك إتمام عملية الشراء"
    },
    loginDone: { en: "Log in successed", ar: "تم تسجيل الدخول بنجاح" },
    insertphone: { en: "Insert phone number", ar: "أدخل رقمك الخليوي" },
    otp: {
      en: "Insert the one time password",
      ar: "أدخل الرمز المؤقت، يرجى الانتظار"
    },
    password: {
      en: "Insert your password",
      ar: "أدخل الرمز الخاص بك"
    },
    login: {
      en: "Log in",
      ar: "تسجيل الدخول"
    },
    requestOtp: {
      en: "Request OTP",
      ar: "طلب الرمز المؤقت"
    },
    have: {
      en: "I have a password",
      ar: "لدي الرمز الخاص بي"
    },
    dntHave: {
      en: "I dont have a password",
      ar: "ليس لدي الرمز الخاص بي"
    },
    requestAgain: {
      en: "Request OTP again",
      ar: "طلب الرمز مجدداً"
    }
  };
  const [waiting, setWaiting] = useState(false);
  const [hasPass, setHasPass] = useState(false);
  const setphone = useSetRecoilState(phoneState);
  const setPhonePage = useSetRecoilState(PhonePageState);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oTP, setOTP] = useState("");
  const [passWord, setPassWord] = useState("");
  const [message, setMessage] = useState(" ");
  const [time, setTime] = useState("02:00");
  const [dots, setDots] = useState(false);

  const handleChange = (e) => {
    setMessage(" ");
    if (phoneNumber === "") {
      e.target.value !== "0" && setPhoneNumber(e.target.value);
      e.target.value === "0" && setMessage(dictionary.zero[lang]);
    } else {
      setPhoneNumber(e.target.value);
    }
  };

  const checkNumber = (action) => {
    setMessage(" ");
    if (!(phoneNumber.length === 7 || phoneNumber.length === 8)) {
      setMessage(dictionary.check[lang]);
      return;
    }
    action();
  };

  const requestOTP = () => {
    checkNumber(() => {
      setDots(true);
      axios
        .post(
          "/api/auth/Sign",
          { phoneNumber },
          { "content-type": "application/json" }
        )
        .then((res) => {
          if (res.data === "done") {
            setWaiting(true);
            timer(119, setTime);
            setphone(phoneNumber);
            setDots(false);
            axios
              .post(
                "/api/auth/Login",
                { phoneNumber, oTP },
                { "content-type": "application/json" }
              )
              .then((res) => console.log(res));
          } else {
            setMessage(res.data);
          }
        });
    });
  };
  const login = () => {
    setDots(true);
    axios
      .post(
        "/api/auth/Login",
        { phoneNumber, oTP },
        { "content-type": "application/json" }
      )
      .then((res) => {
        res.data === "done" && setPhonePage(false);
        res.data === "exist" &&
          (routeTo
            ? Router.push("/cart?msg=" + dictionary.buy[lang]) &&
              setMessage(dictionary.buy[lang])
            : Router.push("/?msg=" + dictionary.loginDone[lang]) &&
              setMessage(dictionary.loginDone[lang]));
        res.data !== "done" && res.data !== "exist" && setMessage(res.data);
      });
  };

  return (
    <>
      <div>
        <div className="formContainer">
          <div className="message">
            {message}
            <span>{!(time === "02:00" || time === "00:00") && " " + time}</span>
          </div>
          <div className="phoneContainer">
            <select className="countryCode">
              <option>961+</option>
              <option>1+</option>
            </select>
            <input
              placeholder={dictionary.insertphone[lang]}
              className="phone"
              onChange={(e) => handleChange(e)}
              value={phoneNumber}
              name="phoneNumber"
              type="number"
              disabled={waiting}
              autoComplete="off"
            />
          </div>
          <>
            {waiting && (
              <input
                placeholder={dictionary.otp[lang]}
                className="phone otp"
                value={oTP}
                onChange={(e) => {
                  setMessage(" ");
                  setOTP(e.target.value);
                }}
                type="number"
              />
            )}
          </>
          <>
            {hasPass && (
              <input
                placeholder={dictionary.password[lang]}
                className="phone otp"
                value={passWord}
                type="password"
                onChange={(e) => setPassWord(e.target.value)}
              />
            )}
          </>
          <div className="btnContainer">
            {waiting ? (
              <button className="btn" onClick={() => login()}>
                {dots ? <Dots /> : dictionary.login[lang]}
              </button>
            ) : (
              <button className="btn" onClick={() => requestOTP()}>
                {dots ? <Dots /> : dictionary.requestOtp}
              </button>
            )}
            <button
              className="passwordbtn"
              onClick={() => {
                setHasPass(!hasPass);
              }}
            >
              {hasPass ? dictionary.dntHave : dictionary.have[lang]}
            </button>
          </div>
          {waiting && time === "00:00" && (
            <button className="btnRequest" onClick={() => requestOTP()}>
              {dictionary.requestAgain[lang]}
            </button>
          )}
        </div>
        <ContactUs />
      </div>
      <style jsx>{`
        .formContainer {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          margin: 5rem 0;
        }
        .message {
          color: ${styles.secondaryColor};
          padding: 0;
          margin: 0;
        }

        .phoneContainer {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: reverse;
          -ms-flex-direction: row-reverse;
          flex-direction: row-reverse;
          margin: 0.8rem auto;
          max-width: 100vw;
        }

        .countryCode {
          border-radius: 0.5rem;
          font-size: 1.2rem;
          padding: 0.5rem 0.8rem;
          background: white;
          margin-right: 0.4rem;
          width: 6rem;
        }

        .countryCode:focus {
          border: 1px solid ${styles.primaryColor};
        }

        .phone {
          border: 1px solid lightgrey;
          border-radius: 0.5rem;
          font-size: 1.4rem;
          padding: 0.5rem 0.8rem;
          max-width: 13rem;
        }

        .phone:focus {
          outline: none;
          border: 1px solid ${styles.primaryColor};
        }

        .phone::-webkit-input-placeholder {
          color: lightgrey;
          font-size: 1.2rem;
        }
        .phone::-moz-placeholder {
          color: lightgrey;
          font-size: 1.2rem;
        }
        .phone:-ms-input-placeholder {
          color: lightgrey;
          font-size: 1.2rem;
        }
        .phone::-ms-input-placeholder {
          color: lightgrey;
          font-size: 1.2rem;
        }
        .phone::placeholder {
          color: lightgrey;
          font-size: 1.2rem;
        }
        .otp {
          margin-bottom: 0.8rem;
          min-width: 19rem;
        }
        .btnContainer {
          display: flex;
          display: -webkit-box;
          display: -ms-flexbox;
        }

        .btn {
          font-size: 1.1rem;
          border: none;
          background-color: ${dots ? "white" : styles.primaryColorLight};
          color: white;
          margin: 0.5rem;
          padding: 0.5rem 0.8rem;
          border-radius: 0.5rem;
        }
        .btnRequest {
          font-size: 0.9rem;
          border: none;
          background: white;
          color: ${styles.primaryColorLight};
          margin: 0.5rem;
          padding: 0.2rem 0.8rem;
          border-radius: 0.5rem;
        }
        .passwordbtn {
          background: white;
          border: none;
          padding: 0rem 0.5rem;
          color: ${styles.secondaryColor};
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
}
