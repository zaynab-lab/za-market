import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";

export default function Customer() {
  return (
    <>
      <TopBar title="حقوق الزبون" page={true} />

      <div className="container">
        <div className="title">شروط إرجاع المنتجات</div>

        <ul>
          <li>
            يمكن إرجاع المنتج في حال عدم تطابقه مع المواصفات المطلوبة، بشرط
            سلامته.
          </li>

          <li>
            يمكن إرجاع المنتجات غير الاستهلاكية في حال الإنصراف عن شرائها قبل
            مدة اقصاها 48 ساعة، ويشترط في ذلك سلامة المنتج .
          </li>
        </ul>

        <div className="title">سياسة الخصوصية</div>

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
