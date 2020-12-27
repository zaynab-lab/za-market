import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";

export default function Conditions() {
  return (
    <>
      <TopBar title="شروط الاستخدام" page={true} />

      <div className="container">
        <div className="title">الشروط العامة</div>

        <ul>
          <li></li>

          <li></li>
        </ul>
      </div>

      <style jsx>{`
        .container {
          padding: 0.5rem;
          height: calc(100vh - 3rem);
          font-size: 1.1rem;
          overflow: auto;
        }

        li {
          padding: 0.5rem;
          border-bottom: 1px solid #eee;
        }

        li:before {
          content: " - ";
        }

        .title {
          padding-top: 1rem;
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
