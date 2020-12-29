import { useState, useEffect } from "react";
import { styles } from "../../public/js/styles";
import axios from "axios";
import Input from "../Input";
import { FaTrash } from "react-icons/fa";
import CreateSelect from "./components/CreateSelect";
import { codeGenerator } from "../../util/codeGenerator";

export default function GeneralMPage() {
  const [roles, setRoles] = useState("");
  const [state, setState] = useState({
    name: "",
    title: "",
    category: "",
    subCategory: ""
  });
  const [section, setSection] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setRoles(data.roles);
      }
    });
    axios.get("/api/categories").then((res) => {
      const { data } = res;
      data && setCategoryList(data);
    });
    axios.get("/api/departments").then((res) => {
      const { data } = res;
      const list = data.map((obj) => obj.name);
      setDepartmentList(list);
      console.log(codeGenerator());
    });
  }, [setRoles, setCategoryList]);

  return (
    <>
      {roles.includes("GM") && (
        <div className="container">
          {/* //////////////addCategory///////// */}
          <div
            className="section"
            onClick={() => setSection({ ...section, n1: !section.n1 })}
          >
            <div className="title">اضافة قسم</div>
            {section.n1 && (
              <>
                <Input
                  name={"name"}
                  value={state.name}
                  placeholder={"Category Name"}
                  handleChange={handleChange.bind(this)}
                />

                <div className="addCategory-comb">
                  <Input
                    name={"title"}
                    value={state.title}
                    placeholder={"اسم القسم"}
                    handleChange={handleChange.bind(this)}
                  />

                  <button
                    className="addCategorybtn"
                    onClick={() => {
                      state.title !== "" && state.name !== ""
                        ? axios
                            .post(
                              "/api/categories",
                              { name: state.name, title: state.title },
                              { "content-type": "application/json" }
                            )
                            .then((res) => {
                              res.data === "done" &&
                                setState({ ...state, name: "", title: "" });
                            })
                            .then(() =>
                              axios.get("/api/categories").then((res) => {
                                const { data } = res;
                                data && setCategoryList(data);
                              })
                            )
                        : alert("املء الفراغات اللازمة");
                    }}
                  >
                    اضافة قسم
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ///////////addsubCategory///////// */}

          <div className="section">
            <div
              className="title"
              onClick={() => setSection({ ...section, n2: !section.n2 })}
            >
              اضافة وحذف مجموعة
            </div>
            {section.n2 && (
              <>
                <div className="addCategory-comb">
                  <select
                    className="select"
                    onChange={(e) => {
                      setState({ ...state, category: e.target.value });
                      e.target.value === ""
                        ? setSubCategoryList([])
                        : axios
                            .get(`/api/categories/${e.target.value}`)
                            .then((res) => setSubCategoryList(res.data));
                    }}
                  >
                    <option value="">اختر قسم</option>
                    {categoryList.map((obj, index) => (
                      <option key={index} value={obj.name}>
                        {obj.title}
                      </option>
                    ))}
                  </select>
                  <FaTrash
                    onClick={() => {
                      state.category !== "" &&
                        axios
                          .delete(`/api/categories/${state.category}`)
                          .then((res) =>
                            res.data === "done"
                              ? axios
                                  .get("/api/categories")
                                  .then((res) => {
                                    const { data } = res;
                                    data && setCategoryList(data);
                                  })
                                  .then(() => {
                                    setState({ ...state, subCategory: "" });
                                    setSubCategoryList([]);
                                  })
                              : alert("errrrr")
                          );
                    }}
                  />
                </div>
                <div className="addCategory-comb">
                  <select
                    className="select"
                    onChange={(e) =>
                      setState({ ...state, subCategory: e.target.value })
                    }
                  >
                    <option value="">اختر المجموعة</option>
                    {subCategoryList.map((obj, index) => (
                      <option key={index} value={obj}>
                        {obj}
                      </option>
                    ))}
                  </select>
                  <FaTrash
                    onClick={() =>
                      state.subCategory !== "" &&
                      axios
                        .put(
                          `/api/categories/${state.category}`,
                          { subCategory: JSON.stringify(state.subCategory) },
                          { "content-type": "application/json" }
                        )
                        .then((res) => {
                          res.data === "done" &&
                            axios
                              .get(`/api/categories/${state.category}`)
                              .then((res) => setSubCategoryList(res.data));
                        })
                    }
                  />
                </div>

                <div className="addCategory-comb">
                  <Input
                    name={"subCategory"}
                    value={state.subCategory}
                    placeholder={"اسم المجموعة"}
                    handleChange={handleChange.bind(this)}
                  />

                  <button
                    className="addCategorybtn"
                    onClick={() => {
                      state.category !== "" && state.subCategory !== ""
                        ? axios
                            .post(
                              "/api/subCategories",
                              {
                                category: state.category,
                                subCategory: state.subCategory
                              },
                              { "content-type": "application/json" }
                            )
                            .then((res) => {
                              res.data === "done" &&
                                axios
                                  .get(`/api/categories/${state.category}`)
                                  .then((res) => setSubCategoryList(res.data));
                            })
                            .then(() => (state.subCategory = ""))
                        : alert("املء الفراغات اللازمة");
                    }}
                  >
                    اضافة مجموعة
                  </button>
                </div>
              </>
            )}
          </div>
          {/* //////////////addToDepartment///////// */}

          <div className="section">
            <div
              className="title"
              onClick={() => setSection({ ...section, n3: !section.n3 })}
            >
              اضافة مباني و مهام
            </div>
            {section.n3 && (
              <>
                <CreateSelect
                  initOptions={departmentList}
                  url={"/api/departments"}
                  name={"name"}
                  placeholder={"اختر مبنى"}
                />
                <div className="addCategory-comb">
                  <select className="select">
                    <option value="">المبنى</option>
                    {departmentList.map((obj, i) => (
                      <option key={i}>{obj}</option>
                    ))}
                  </select>

                  <button className="addCategorybtn" onClick={() => {}}>
                    اضافة
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          height: calc(100vh - 6.1rem);
          overflow: auto;
        }

        .product {
          height: 9rem;
          border: 1px solid black;
        }

        .section {
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid lightgrey;
          padding: 1rem;
        }

        .select {
          width: 100%;
          border: 1px solid gray;
          background: white;
          border-radius: 0.5rem;
          padding: 0.2rem 0.5rem;
          color: #555;
          height: 2.4rem;
          font-size: 1.1rem;
          margin: 0.5rem 0;
          margin-left: 0.8rem;
        }

        .addCategory-comb {
          display: flex;
          align-items: center;
          direction: rtl;
        }

        .addCategorybtn {
          background: ${styles.primaryColorLight};
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem 0.8rem;
          flex: 1 1 11rem;
          margin-right: 0.5rem;
        }

        .title {
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
