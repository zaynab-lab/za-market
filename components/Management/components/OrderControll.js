import axios from "axios";
import { FaBan, FaCheckCircle, FaEdit } from "react-icons/fa";
import { styles } from "../../../public/js/styles";

export default function OrderControll({ role, id, current, handleRemove }) {
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
              <span>إتمام المرحلة</span>
            </div>

            {role === "GM" && (
              <>
                <div className="edit" onClick={() => alert("i am edit buttom")}>
                  <span className="icon">
                    <FaEdit />
                  </span>
                  <span>تعديل الطلبية</span>
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
                  <span>إلغاء الطلبية</span>
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
