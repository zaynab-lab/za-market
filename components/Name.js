import { useState } from "react";
import { atom, useSetRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { phoneState } from "./PhoneOTP";
import { styles } from "../public/js/styles";
import Router from "next/router";

export const userNameState = atom({
  key: "userName",
  default: ""
});

export default function Name({ routeTo }) {
  const setUserName = useSetRecoilState(userNameState);
  const phoneNumber = useRecoilValue(phoneState);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleClick = () => {
    axios
      .post(
        "/api/auth/SetName",
        { phoneNumber, name },
        { "content-type": "application/json" }
      )
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          setMessage(
            "تمت عضويتك بشكل كامل، يمكنك اكمال المعلومات في الملف الشخصي"
          );
          routeTo
            ? Router.push(
                "/cart?msg=%D9%8A%D9%85%D9%83%D9%86%D9%83%20%D8%A7%D8%AA%D9%85%D8%A7%D9%85%20%D8%B9%D9%85%D9%84%D9%8A%D8%A9%20%D8%A7%D9%84%D8%B4%D8%B1%D8%A7%D8%A1"
              )
            : Router.push(
                "/?msg=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D8%A8%D9%83%20%D9%85%D8%B9%D9%86%D8%A7%D8%8C%20%D8%A7%D9%86%D8%AA%20%D8%A7%D9%84%D8%A2%D9%86%20%D8%B9%D8%B6%D9%88%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D8%B7%D8%A8%D9%8A%D9%82"
              );
          setUserName(name);
        }
      });
  };

  return (
    <>
      <div className="message">{message}</div>
      <input
        placeholder="الإسم الكامل"
        className="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        name="phoneNumber"
        type="text"
      />

      <button className="btn" onClick={() => handleClick()}>
        تأكيد
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
          background-color: ${styles.primaryColorLight};
          color: white;
          margin: 0.5rem;
          padding: 0.2rem 0.5rem;
          border-radius: 0.2rem;
        }
      `}</style>
    </>
  );
}
