import { useState } from "react";
import {
  FaCheckCircle,
  FaSearchPlus,
  FaShoppingBag,
  FaSmileWink,
  FaTimesCircle,
  FaTruck
} from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { langState } from "../pages/menu";
import { styles } from "../public/js/styles";

export default function ArrowBar({ progress }) {
  const lang = useRecoilValue(langState);
  const dictionary = {
    submit: { en: "Submitting order", ar: "تسجيل الطلبية" },
    preparation: { en: "Preparing order", ar: "تحضير الطلبية" },
    audit: { en: "Checking order", ar: "تدقيق الطلبية" },
    dispatch: { en: "Dispatching order", ar: "الإرسال" },
    done: { en: "Delivered", ar: "التسليم" },
    canceled: { en: "Canceled", ar: "تم إلغاء الطلب" },
    returned: { en: "Returned", ar: "تم إرجاع الطلب" }
  };
  const [state, setState] = useState({
    preparation: progress.preparation.done,
    audit: progress.audit.done,
    dispatch: progress.dispatch.done,
    arrive: progress.arrive.done,
    cancel: progress.cancelation.done,
    return: progress.return.done
  });
  return (
    <>
      <div className="arrow-steps clearfix">
        <div className="step done">
          <span className="icon">
            <FaCheckCircle />
          </span>
          <span>{dictionary.submit[lang]}</span>
        </div>
        {(!state.cancel || state.preparation) && (
          <div className={`step ${state.preparation && "done"}`}>
            <span className="icon">
              <FaShoppingBag />
            </span>
            <span>{dictionary.preparation[lang]}</span>
          </div>
        )}
        {(!state.cancel || state.audit) && (
          <div className={`step ${state.audit && "done"}`}>
            <span className="icon">
              <FaSearchPlus />
            </span>
            <span>{dictionary.audit[lang]}</span>
          </div>
        )}
        {(!state.cancel || state.dispatch) && (
          <div className={`step ${state.dispatch && "done"}`}>
            <span className="icon">
              <FaTruck />
            </span>
            <span>{dictionary.dispatch[lang]}</span>
          </div>
        )}
        {(!state.cancel || state.arrive) && (
          <div className={`step ${state.dispatch && "done"}`}>
            <span className="icon">
              <FaSmileWink />
            </span>
            <span>{dictionary.done[lang]}</span>
          </div>
        )}
        {state.cancel && (
          <div className="step cancel">
            <span className="icon">
              <FaTimesCircle />
            </span>
            <span>{dictionary.canceled[lang]}</span>
          </div>
        )}
        {!state.cancel && state.return && (
          <div className="step cancel">
            <span className="icon">
              <FaTimesCircle />
            </span>
            <span>{dictionary.returned[lang]}</span>
          </div>
        )}
      </div>
      <style jsx>{`
        .clearfix:after {
          clear: both;
          content: "";
          display: block;
        }

        .arrow-steps .step {
          font-size: 1rem;
          text-align: center;
          color: ${styles.primaryColor};
          cursor: default;
          margin: 0 1px 0 0;
          padding: 0.2rem;
          width: ${lang === "en" ? "11rem" : "9rem"};
          ${lang === "en" && "height:2.1rem"};
          float: ${lang === "en" ? "left" : "right"};
          position: relative;
          background-color: #f6f6f6;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
        }

        .arrow-steps .step:after,
        .arrow-steps .step:before {
          content: "";
          position: absolute;
          top: 0;
          ${lang === "en" ? "right:-1rem" : "left:-1rem"};
          width: 0;
          height: 0;
          border-top: 1rem solid transparent;
          border-bottom: 1.1rem solid transparent;
          ${lang === "en"
            ? "border-left: 1rem solid #f6f6f6"
            : "border-right: 1rem solid #f6f6f6"};
          z-index: 2;
        }
        .arrow-steps .step:before {
          left: ${lang === "en" ? "0" : "auto"};
          right: ${lang === "en" ? "auto" : "0"};
          ${lang === "en"
            ? "border-left: 17px solid #fff            "
            : "border-right: 17px solid #fff"};
          z-index: 0;
        }
        .arrow-steps .step:first-child:before {
          border: none;
        }
        .arrow-steps .step:last-child:after {
          border: none;
        }

        .arrow-steps .step.done {
          color: #fff;
          background-color: ${styles.secondaryColor};
        }

        .arrow-steps .step.done:after {
          ${lang === "en"
            ? "border-left: 17px solid " + styles.secondaryColor
            : "border-right: 17px solid" + styles.secondaryColor};
        }

        .icon {
          padding: 0rem 0.3rem;
        }

        .arrow-steps .step.cancel {
          color: #fff;
          background-color: red;
        }
      `}</style>
    </>
  );
}
