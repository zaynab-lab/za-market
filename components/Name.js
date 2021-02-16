import { useState } from "react";
import { atom, useSetRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { phoneState } from "./PhoneOTP";
import { styles } from "../public/js/styles";
import Router from "next/router";
import Dots from "./Loaders/Dots";
import { langState } from "../pages/menu";

export const userNameState = atom({
  key: "userName",
  default: ""
});

export default function Name({ routeTo }) {
  const lang = useRecoilValue(langState);
  const dictionary = {
    membership: {
      en: "Your membership is completed successfully",
      ar: "تمت عضويتك بشكل كامل، يمكنك اكمال المعلومات في الملف الشخصي"
    },
    fullName: {
      en: "Full Name",
      ar: "الإسم الكامل"
    },
    accept: {
      en: "Continue",
      ar: "تأكيد"
    },
    buy: {
      en: "You can complete the purchase",
      ar: "يمكنك اتمام عملية الشراء"
    },
    wlc: {
      en: "Welcome to us, you are now a member of the application",
      ar: "مرحبا بك معنا، انت الآن عضو في التطبيق"
    }
  };
  const setUserName = useSetRecoilState(userNameState);
  const phoneNumber = useRecoilValue(phoneState);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [dots, setDots] = useState(false);
  const invitedBy = localStorage.getItem("invitedBy")
    ? atob(localStorage.getItem("invitedBy"))
    : "";
  const qr = localStorage.getItem("qr") ? 1 : 0;

  const handleClick = () => {
    setDots(true);
    axios
      .post(
        "/api/auth/SetName",
        { phoneNumber, name, invitedBy: invitedBy, qr },
        { "content-type": "application/json" }
      )
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          setMessage(dictionary.membership[lang]);
          routeTo
            ? Router.push("/cart?msg=" + dictionary.buy[lang])
            : Router.push("/?msg=" + dictionary.wlc[lang]);
          setUserName(name);
        }
      });
  };

  return (
    <>
      <div className="message">{message}</div>
      <input
        placeholder={dictionary.fullName[lang]}
        className="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        name="phoneNumber"
        type="text"
      />

      <button className="btn" onClick={() => handleClick()}>
        {dots ? <Dots /> : dictionary.accept[lang]}
      </button>

      <style jsx>{`
        .message {
          color: ${styles.secondaryColor};
          padding: 0;
          margin: 0;
        }

        .name {
          border: 1px solid lightgrey;
          border-radius: 0.5rem;
          font-size: 1.4rem;
          padding: 0.5rem 0.8rem;
          margin: 0.5rem auto;
        }

        .name:focus {
          outline: none;
          border: 1px solid ${styles.primaryColor};
        }

        .name::-webkit-input-placeholder {
          color: lightgrey;
        }
        .name::-moz-placeholder {
          color: lightgrey;
        }
        .name:-ms-input-placeholder {
          color: lightgrey;
        }
        .name::-ms-input-placeholder {
          color: lightgrey;
        }
        .name::placeholder {
          color: lightgrey;
        }

        .btn {
          font-size: 1.2rem;
          border: none;
          background-color: ${dots ? "white" : styles.primaryColorLight};
          color: white;
          margin: 0.5rem;
          padding: 0.2rem 0.5rem;
          border-radius: 0.2rem;
        }
      `}</style>
    </>
  );
}
