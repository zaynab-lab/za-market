import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import Loader from "../../components/Loader";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { styles } from "../../public/js/styles";
import Input from "../../components/Input";
import { FaIdCard, FaMapMarkedAlt, FaTasks } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { userState } from "../menu";
import AddAddress from "../../components/AddAdress";

const userInputList = [
  { name: "name", placeholder: "الإسم", type: "text" },
  {
    name: "number",
    placeholder: "رقم الهاتف",
    type: "number",
    disabled: true
  },
  { name: "password", placeholder: "الرمز", type: "password" },
  { name: "mail", placeholder: "البريد الإلكتروني", type: "text" }
];

export default function Profile() {
  const userInfo = useRecoilValue(userState);
  const [state, setState] = useState(userInfo);
  const [dots, setDots] = useState(true);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [hasAddress, setHasAddress] = useState(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("/api/auth")
      .then((res) => {
        const { data } = res;
        if (data !== "noToken" && data !== "invalid") {
          setRoles(data.roles);
          setState({
            ...state,
            name: data.name,
            number: data.number,
            mail: data.mail
          });
        }
      })
      .then(() => setDots(false));
  }, [setState]);

  return (
    <>
      <TopBar title="الملف الشخصي" page={true} />
      {loading && <Loader />}
      {!loading && (
        <>
          <div className="container">
            <div className="id">
              {roles.length > 1 && (
                <Link href="/details/management">
                  <div onClick={() => setLoading(true)} className="management">
                    <span className="icon">
                      <FaTasks />
                    </span>
                    <span>الصفحة الإدارية</span>
                  </div>
                </Link>
              )}

              <div className="section-title">
                <span className="icon">
                  <FaIdCard />
                </span>
                <span>الهوية</span>
              </div>

              <div className="inputContainer">
                {userInputList.map((obj, index) => (
                  <Input
                    key={index}
                    name={obj.name}
                    value={state[obj.name]}
                    type={obj.type}
                    placeholder={obj.placeholder}
                    disabled={obj.disabled}
                    handleChange={handleChange.bind(this)}
                  />
                ))}
              </div>
              <div>تاريخ الميلاد</div>

              <input
                className="birth"
                name={"birth"}
                type="date"
                ata-date=""
                data-date-format="DD MMMM YYYY"
                value="2019-01-01"
              />
            </div>
            {/* ////////////////Address////////////// */}

            <div className="address">
              <div className="section-title">
                <span className="icon">
                  {" "}
                  <FaMapMarkedAlt />
                </span>
                <span>العناوين</span>
              </div>

              <AddAddress
                setSelectedAddress={setSelectedAddress}
                setHasAddress={setHasAddress}
              />
              {hasAddress && selectedAddress !== "" && (
                <div
                  className="delete"
                  onClick={() => {
                    alert("this should delete");
                  }}
                >
                  <span>حذف العنوان</span>
                </div>
              )}
            </div>
            {/* /////////////////LOGOUT///////////////////// */}
            {!dots && (
              <div
                className="Logout"
                onClick={() => {
                  axios
                    .post("/api/auth/Logout")
                    .then(
                      (res) =>
                        res.data === "done" &&
                        setState({
                          name: "",
                          number: "",
                          mail: "",
                          password: ""
                        })
                    )
                    .then(() => Router.push("/"));
                }}
              >
                تسجيل الخروج
              </div>
            )}
          </div>
        </>
      )}
      <style jsx>{`
        .container {
          height: calc(100vh - 3rem);
          overflow: auto;
        }

        .id {
          padding: 0.5rem;
        }
        .management {
          padding: 0.2rem;
          color: ${styles.secondaryColor};
          border: 1.5px solid ${styles.primaryColor};
          border-radius: 0.5rem;
          font-size: 1.2rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }

        .inputContainer {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
        }

        .birth {
          width: 100%;
          height: 3rem;
          background: white;
          margin-bottom: 2rem;
          border-radius: 0.5rem;
        }

        .section-title {
          margin: 0.5rem;
          font-size: 1.2rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          color: ${styles.secondaryColor};
        }

        .icon {
          margin: 0 0.5rem;
        }

        .Logout {
          margin: 2rem 0;
          color: red;
          text-align: center;
        }

        .address {
          border: 1px solid lightgrey;
          border-width: 1px 0;
        }

        .dots {
          height: 7rem;
          padding: 1rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
        }

        .delete {
          font-size: 0.9rem;
          background: ${styles.primaryColorLight};
          color: white;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
          text-align: center;
          margin: auto;
          margin-bottom: 1rem;
        }
        .icon {
          margin: auto 0.3rem;
        }
      `}</style>
    </>
  );
}
