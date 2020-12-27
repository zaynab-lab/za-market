import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { styles } from "../public/js/styles";

export default function ContactUs() {
  return (
    <>
      <div className="contactUs">
        <div>في حال مواجهة أي مشكلة</div>
        <Link href="https://wa.me/+96181026095?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C">
          <div className="contactbtn">
            <FaWhatsapp /> <span>تواصل معنا</span>
          </div>
        </Link>
      </div>
      <style jsx>{`
        .contactUs {
          color: ${styles.secondaryColor};
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
          margin: 1rem 0;
          font-size: 0.9rem;
        }

        .contactbtn {
          background: ${styles.primaryColorLight};
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
        }
      `}</style>
    </>
  );
}
