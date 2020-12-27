import { styles } from "../../../public/js/styles";
import { FaDollarSign, FaTruck } from "react-icons/fa";
import Link from "next/link";
export default function CustomerCard({ user }) {
  return (
    <>
      <Link href={`/details/chat?user=${user.name}`}>
        <div className="userContainer">
          <div className="userProfile">
            <img className="img" src="/img/png/Profile.png" alt="" />
            <div className="userName">
              <div>{user.name && user.name}</div>
              <div className="userNumber">{user.number}</div>
            </div>
          </div>
          <div className="userControll">
            <div>
              {user.amount}
              <FaDollarSign />
            </div>
            <div>
              <FaTruck />
            </div>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .userContainer {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
        }
        .userProfile {
          display: flex;
          align-items: center;
        }
        .userName {
          padding: 0 1rem;
          font-size: 1.1rem;
          color: ${styles.secondaryColor};
        }
        .userControll {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
        }
        .userControll div {
          display: flex;
          align-items: center;
        }
        .userNumber {
          font-size: 0.8rem;
          color: #555;
        }

        .img {
          width: 4rem;
        }
      `}</style>
    </>
  );
}
