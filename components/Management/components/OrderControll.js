import axios from "axios";
import { FaBan, FaCheckCircle, FaEdit } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { langState } from "../../../pages/menu";
import { styles } from "../../../public/js/styles";

export default function OrderControll({
  permissions,
  id,
  current,
  handleRemove
}) {
  const lang = useRecoilValue(langState);
  const dictionary = {
    completeStep: { en: "Complete the step", ar: "إتمام المرحلة" },
    editOrder: { en: "Edit the order", ar: "تعديل الطلبية" },
    cancelOrder: { en: "Cancel the order", ar: "إلغاء الطلبية" }
  };
  return (
    <>
      <div className="controlBar">
        {current !== "arrive" && current !== "cancel" && current !== "return" && (
          <>
            <div
              className="done"
              onClick={() =>
                axios
                  .put(
                    `/api/orders/id/${id}`,
                    { done: true, step: current },
                    { "content-type": "application/json" }
                  )
                  .then((res) => {
                    const { data } = res;
                    data && handleRemove(id);
                  })
              }
            >
              <span className="icon">
                <FaCheckCircle />
              </span>
              <span>{dictionary.completeStep[lang]}</span>
            </div>

            {permissions.includes("edit orders") && (
              <>
                <div className="edit" onClick={() => alert("i am edit buttom")}>
                  <span className="icon">
                    <FaEdit />
                  </span>
                  <span>{dictionary.editOrder[lang]}</span>
                </div>
                <div
                  className="cancel"
                  onClick={() =>
                    axios
                      .put(
                        `/api/orders/id/${id}`,
                        { done: true, step: "cancelation" },
                        { "content-type": "application/json" }
                      )
                      .then((res) => {
                        const { data } = res;
                        data && handleRemove(id);
                      })
                  }
                >
                  <span className="icon">
                    <FaBan />
                  </span>
                  <span>{dictionary.cancelOrder[lang]}</span>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        .controlBar {
          display: flex;
          line-height: 2rem;
          width: 100%;
          overflow: auto;
          background: ${styles.thirdColor};
        }

        .controlBar div {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1 0 8rem;
          line-height: 2rem;
        }
        .cancel {
          color: red;
        }
        .edit {
          color: ${styles.secondaryColor};
        }
        .icon {
          margin: 0 0.2rem;
        }
        .done {
          color: green;
          word-wrap: none;
        }
      `}</style>
    </>
  );
}
