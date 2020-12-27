import { useState } from "react";
import { atom, useSetRecoilState } from "recoil";
import axios from "axios";
import { PhonePageState } from "../pages/Login";
import { styles } from "../public/js/styles";
import Router from "next/router";
import ContactUs from "./ContactUs";
import timer from "../util/timer";

export const phoneState = atom({
  key: "phone",
  default: ""
});

export default function PhoneOTP({ routeTo }) {
  const [waiting, setWaiting] = useState(false);
  const [hasPass, setHasPass] = useState(false);
  const setphone = useSetRecoilState(phoneState);
  const setPhonePage = useSetRecoilState(PhonePageState);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oTP, setOTP] = useState("");
  const [passWord, setPassWord] = useState("");
  const [message, setMessage] = useState(" ");
  const [time, setTime] = useState("02:00");

  const handleChange = (e) => {
    setMessage(" ");
    if (phoneNumber === "") {
      e.target.value !== "0" && setPhoneNumber(e.target.value);
      e.target.value === "0" && setMessage("ابدء الرقم بدون صفر");
    } else {
      setPhoneNumber(e.target.value);
    }
  };

  const checkNumber = (action) => {
    setMessage(" ");
    if (
      !(
        phoneNumber.length === 7 ||
        phoneNumber.length === 8 ||
        phoneNumber.length === 10
      )
    ) {
      setMessage("الرجاء التأكد من الرقم");
      return;
    }
    action();
  };

  const requestOTP = () => {
    checkNumber(() => {
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
          } else {
            setMessage(res.data);
          }
        });
    });
  };
  const login = () => {
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
            ? Router.push(
                "/cart?msg=%D9%8A%D9%85%D9%83%D9%86%D9%83%20%D8%A7%D8%AA%D9%85%D8%A7%D9%85%20%D8%B9%D9%85%D9%84%D9%8A%D8%A9%20%D8%A7%D9%84%D8%B4%D8%B1%D8%A7%D8%A1"
              ) && setMessage("بإمكانك إتمام عملية الشراء")
            : Router.push(
                "/?msg=%D8%AA%D9%85%20%D8%AA%D8%B3%D8%AC%D9%8A%D9%84%20%D8%AF%D8%AE%D9%88%D9%84%D9%83%20%D8%A8%D9%86%D8%AC%D8%A7%D8%AD"
              ) && setMessage("تم تسجيل الدخول بنجاح"));
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
              placeholder="أدخل رقمك الخليوي"
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
                placeholder="أدخل الرمز المؤقت، يرجى الانتظار"
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
                placeholder="أدخل الرمز الخاص بك"
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
                تسجيل الدخول
              </button>
            ) : (
              <button className="btn" onClick={() => requestOTP()}>
                طلب الرمز المؤقت
              </button>
            )}
            <button
              className="passwordbtn"
              onClick={() => {
                setHasPass(!hasPass);
              }}
            >
              {hasPass ? "ليس لدي الرمز الخاص بي" : "لدي الرمز الخاص بي"}
            </button>
          </div>
          {waiting && time === "00:00" && (
            <button className="btnRequest" onClick={() => requestOTP()}>
              طلب الرمز مجدداً
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
          background-color: ${styles.primaryColorLight};
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
