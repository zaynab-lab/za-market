import { useState, useEffect } from "react";
import PhoneOTP from "../components/PhoneOTP";
import { atom, useRecoilValue } from "recoil";
import Name from "../components/Name";
import TopBar from "../components/TopBar";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Loader from "../components/Loader";

export const PhonePageState = atom({
  key: "phonePage",
  default: true
});

export default function Login() {
  const phonePage = useRecoilValue(PhonePageState);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { routeTo } = router.query;

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        Router.push("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      <TopBar title="تسجيل الدخول" page={false} />
      {loading && <Loader />}
      {!loading && (
        <div className="container">
          {phonePage ? (
            <PhoneOTP routeTo={routeTo} />
          ) : (
            <Name routeTo={routeTo} />
          )}
        </div>
      )}
      <style jsx>{`
        .container {
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
          height: 70vh;
        }
      `}</style>
    </>
  );
}
