import axios from "axios";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";
import Link from "next/link";

export default function Offers() {
  const [user, setUser] = useState(0);
  const [order, setOrder] = useState(0);
  const [code, setCode] = useState("");
  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setCode(data.promoCode);
      }
    });
  }, []);

  return (
    <>
      <TopBar title="حسومات وقسائم شرائية" page={true} />
      <div className="container">
        <div>شارك الرابط ورباح:</div>
        <div>
          في حال قمت بمشاركة الرابط وتم تسجيل الدخول من قبل المرسل إليه سوف
          تمنحه 10000 ل.ل وفي حال استعماله للتطبيق سوف تحصل على 10000 ل.ل في
          رصيدك.
          <Link
            href={`https://wa.me/?text=https://www.za-market.com/?code=${code}`}
          >
            <span className="icon">
              <FaWhatsapp />
            </span>
          </Link>
        </div>
        {user ? (
          <div>لم تقم بمشاركة الرابط بعد</div>
        ) : (
          <div>لقد قمت بمشاركة الرابط لـ {user} عضو</div>
        )}
        {order ? (
          user && (
            <div>لم يتم أي عملية شراء من قبل الأعضاء الذين قمت بدعوتهم</div>
          )
        ) : (
          <div>تمت{order}عملية شراء من الأعضاء الذين قمت بمشاركتهم</div>
        )}
        <div>لقد حصلت على {order * 10000} ل.ل بمشاركاتك، أضيفت إلى رصيدك</div>
        <div>جمع نقاط مع ليال:</div>
        <div>قريبا.....</div>
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
          margin: 0 2rem;
        }
      `}</style>
    </>
  );
}
