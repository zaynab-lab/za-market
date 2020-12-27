import { useState } from "react";
import {
  FaCheckCircle,
  FaSearchPlus,
  FaShoppingBag,
  FaSmileWink,
  FaTimesCircle,
  FaTruck
} from "react-icons/fa";
import { styles } from "../public/js/styles";

export default function ArrowBar({ progress }) {
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
          <span>تسجيل الطلبية</span>
        </div>
        {(!state.cancel || state.preparation) && (
          <div className={`step ${state.preparation && "done"}`}>
            <span className="icon">
              <FaShoppingBag />
            </span>
            <span>تحضير الطلبية</span>
          </div>
        )}
        {(!state.cancel || state.audit) && (
          <div className={`step ${state.audit && "done"}`}>
            <span className="icon">
              <FaSearchPlus />
            </span>
            <span>تدقيق الطلبية</span>
          </div>
        )}
        {(!state.cancel || state.dispatch) && (
          <div className={`step ${state.dispatch && "done"}`}>
            <span className="icon">
              <FaTruck />
            </span>
            <span>الإرسال</span>
          </div>
        )}
        {(!state.cancel || state.arrive) && (
          <div className={`step ${state.dispatch && "done"}`}>
            <span className="icon">
              <FaSmileWink />
            </span>
            <span>التسليم</span>
          </div>
        )}
        {state.cancel && (
          <div className="step cancel">
            <span className="icon">
              <FaTimesCircle />
            </span>
            <span>تم إلغاء الطلب</span>
          </div>
        )}
        {!state.cancel && state.return && (
          <div className="step cancel">
            <span className="icon">
              <FaTimesCircle />
            </span>
            <span>تم إرجاع الطلب</span>
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
          width: 9rem;
          float: right;
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
          left: -1rem;
          width: 0;
          height: 0;
          border-top: 1rem solid transparent;
          border-bottom: 1.1rem solid transparent;
          border-right: 1rem solid #f6f6f6;
          z-index: 2;
        }
        .arrow-steps .step:before {
          left: auto;
          right: 0;
          border-right: 17px solid #fff;
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
          border-right: 17px solid ${styles.secondaryColor};
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
