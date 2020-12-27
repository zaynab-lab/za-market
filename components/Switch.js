import { atom, useRecoilState } from "recoil";
import { styles } from "../public/js/styles";
import { FaCheck } from "react-icons/fa";

export const toggleState = atom({
  key: "toggle",
  default: true
});

export default () => {
  const [toggle, setToggle] = useRecoilState(toggleState);

  return (
    <>
      <div className="switch" onClick={() => setToggle(!toggle)}>
        <div className="switch-body"></div>
        {toggle ? (
          <div className="switch-btn">
            <FaCheck />
          </div>
        ) : (
          <div className="switch-btn">X</div>
        )}
      </div>
      <style jsx>{`
        .switch {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: ${toggle ? "reverse" : "normal"};
          -ms-flex-direction: ${toggle ? "row-reverse" : "row"};
          flex-direction: ${toggle ? "row-reverse" : "row"};
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border: 1px solid grey;
          border-radius: 5rem;
          background: white;
          width: fit-content;
          height: fit-content;
        }
        .switch-btn {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          width: 1.5rem;
          height: 1.5rem;
          padding: 0.2rem;
          background: white;
          color: ${toggle ? styles.secondaryColor : "red"};
          border: 1px solid ${toggle ? styles.secondaryColor : "red"};
          border-radius: 5rem;
          box-shadow: 0px 0px 2px 3px ${toggle ? styles.secondaryColor : "red"};
        }
        .switch-body {
          width: 1.5rem;
        }
      `}</style>
    </>
  );
};
