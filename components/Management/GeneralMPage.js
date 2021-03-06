import { useState, useEffect } from "react";
import { styles } from "../../public/js/styles";
import axios from "axios";
import Input from "../Input";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaTrash
} from "react-icons/fa";
import CreateSelect from "./components/CreateSelect";
import { langState } from "../../pages/menu";
import { useRecoilValue } from "recoil";

export default function GeneralMPage() {
  const lang = useRecoilValue(langState);
  const dictionary = {
    balance: { en: "SMS Balance", ar: "الرسائل القصيرة" },
    addCategory: { en: "Add category", ar: "اضافة قسم" },
    addDeletSubCategory: {
      en: "Add & Delete subCategory",
      ar: "إضافة وحذف مجموعة"
    },
    chooseCategory: { en: "Choose Category", ar: "اختر قسم" },
    chooseSubCategory: { en: "Choose SubCategory", ar: "اختر مجموعة" },
    addSubCategory: { en: "Add subCategory", ar: "اضافة مجموعة" },
    addRolesPermissions: {
      en: "Add Roles & Permissions",
      ar: "اضافة وحذف مجموعة"
    },
    chooseRole: { en: "Choose Role", ar: "إختر دور" },
    addPermission: { en: "Add Permission", ar: "أضف إذن" },
    rolePermissions: { en: "Role Permission", ar: "أذونات الدور" },
    customize: { en: "Customize Role to Member", ar: "تخصيص دور للعضو" },
    chooseMember: { en: "Choose Member", ar: "اختر عضو" },
    customizeRole: { en: "Customize Role", ar: "تخصيص دور" },
    memberRoles: { en: "Member Roles: ", ar: "أدوار العضو: " },
    pages: { en: "Pages: ", ar: "صفحات الوصول: " }
  };

  const [roles, setRoles] = useState("");
  const [state, setState] = useState({
    name: "",
    title: "",
    subCategory: ""
  });
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [section, setSection] = useState({});
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [permissionsList, setPermissionsList] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState("");
  const [rolePermissions, setRolePermissions] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [balance, setBalance] = useState("");

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setRoles(data.roles);
      }
    });
    axios.get("/api/categories").then((res) => {
      const { data } = res;
      const cat = data.map((obj) => obj.name);
      data && setCategoryList(cat);
    });
    axios.get("/api/roles").then((res) => {
      const { data } = res;
      setRolesList(data);
    });
    axios.get("/api/permissions").then((res) => {
      const { data } = res;
      setPermissionsList(data);
    });
    axios.get("/api/users/byRole").then((res) => {
      const { data } = res;
      setUsersList(data);
    });
  }, [setRoles, setCategoryList, setPermissionsList, setUsersList]);

  useEffect(() => {
    selectedRole.length > 0 &&
      axios.get(`/api/permissions/${selectedRole}`).then((res) => {
        const { data } = res;
        setRolePermissions(data);
      });
  }, [selectedRole]);

  useEffect(() => {
    if (selectedCategory !== "") {
      axios
        .get(`/api/categories/${selectedCategory}`)
        .then((res) => setSubCategoryList(res.data));
    }
  }, [selectedCategory]);

  useEffect(() => {
    const user = usersList.filter((user) => user.name === selectedUser)[0];
    if (user) {
      setCurrentUser(user);
    }
  }, [selectedUser, setCurrentUser, usersList]);

  useEffect(() => {
    axios.get("/api/balance").then((res) => setBalance(res.data));
  }, []);

  return (
    <>
      {roles.includes("GM") && (
        <div className="container">
          {/* //////////////addCategory///////// */}
          <div className="section">
            {dictionary.balance[lang]}: {balance}
          </div>
          <div className="section">
            <div
              className="title"
              onClick={() => setSection({ ...section, n1: !section.n1 })}
            >
              {dictionary.addCategory[lang]}
            </div>
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
                    {dictionary.addCategory[lang]}
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
              {dictionary.addDeletSubCategory[lang]}
            </div>
            {section.n2 && (
              <>
                <CreateSelect
                  initOptions={categoryList}
                  name={"category"}
                  placeholder={dictionary.chooseCategory[lang]}
                  setSelect={setSelectedCategory}
                />
                <div className="addCategory-comb">
                  <select
                    className="select"
                    onChange={(e) =>
                      setState({ ...state, subCategory: e.target.value })
                    }
                  >
                    <option value="">
                      {dictionary.chooseSubCategory[lang]}
                    </option>
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
                          `/api/categories/${selectedCategory}?subCategory=${state.subCategory}`
                        )
                        .then((res) => {
                          res.data === "done" &&
                            setSubCategoryList(
                              subCategoryList.filter(
                                (sub) => sub !== state.subCategory
                              )
                            );
                          res.data === "done" &&
                            setState({ ...state, subCategory: "" });
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
                      selectedCategory !== "" &&
                      !subCategoryList.includes(state.subCategory)
                        ? axios
                            .post(
                              "/api/subCategories",
                              {
                                category: selectedCategory,
                                subCategory: state.subCategory
                              },
                              { "content-type": "application/json" }
                            )
                            .then((res) => {
                              res.data === "done" &&
                                setSubCategoryList([
                                  ...subCategoryList,
                                  state.subCategory
                                ]);
                              res.data === "done" &&
                                setState({ ...state, subCategory: "" });
                            })
                            .then(() => (state.subCategory = ""))
                        : alert(
                            "املء الفراغات اللازمة، وتأكد من عدم وجود المجموعة"
                          );
                    }}
                  >
                    {dictionary.addSubCategory[lang]}
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
              {dictionary.addRolesPermissions[lang]}
            </div>
            {section.n3 && (
              <>
                <div className="addCategory-comb">
                  <CreateSelect
                    initOptions={rolesList}
                    url={"/api/roles"}
                    name={"role"}
                    placeholder={dictionary.chooseRole[lang]}
                    setSelect={setSelectedRole}
                  />
                  <CreateSelect
                    initOptions={permissionsList}
                    url={"/api/permissions"}
                    name={"permission"}
                    placeholder={dictionary.addPermission[lang]}
                    setSelect={setSelectedPermission}
                  />
                </div>
                <div>
                  {dictionary.rolePermissions[lang]}:{" "}
                  <el>
                    {rolePermissions.map((perm) => (
                      <li>{perm}</li>
                    ))}
                  </el>
                </div>
                <div className="merge">
                  {selectedRole}
                  <span
                    className="mergebtn"
                    onClick={() => {
                      if (selectedPermission !== "" && selectedRole !== "") {
                        if (rolePermissions.includes(selectedPermission)) {
                          alert("الدور مأذون له بالفعل");
                        } else {
                          axios
                            .put(
                              `/api/permissions/${selectedRole}`,
                              { permission: selectedPermission },
                              { "content-type": "application/json" }
                            )
                            .then((res) => {
                              const { data } = res;
                              data === "done" &&
                                setRolePermissions([
                                  ...rolePermissions,
                                  selectedPermission
                                ]);
                            });
                        }
                      } else {
                        alert("أختر المطلوب");
                      }
                    }}
                  >
                    <FaArrowLeft />
                  </span>
                  {selectedPermission}
                </div>
              </>
            )}
          </div>
          {/* //////////////addToDepartment///////// */}

          <div className="section">
            <div
              className="title"
              onClick={() => setSection({ ...section, n4: !section.n4 })}
            >
              {dictionary.customize[lang]}
            </div>

            {section.n4 && (
              <>
                <div className="addCategory-comb">
                  <CreateSelect
                    initOptions={usersList.map((user) => user.name)}
                    name={"role"}
                    placeholder={dictionary.chooseMember[lang]}
                    setSelect={setSelectedUser}
                  />

                  <CreateSelect
                    initOptions={rolesList}
                    name={"role"}
                    placeholder={dictionary.customizeRole[lang]}
                    setSelect={setSelectedRole}
                  />
                </div>
                <div className="column">
                  <div>
                    {dictionary.memberRoles[lang]}
                    <el>
                      {currentUser.roles &&
                        currentUser.roles
                          .filter((role) => role !== "customer")
                          .map((role) => <li>{role}</li>)}
                    </el>
                  </div>

                  <div>
                    {dictionary.pages[lang]}
                    <el>
                      {currentUser.pages &&
                        currentUser.pages.map((role) => <li>{role}</li>)}
                    </el>
                  </div>
                </div>

                <div className="merge">
                  {selectedUser}
                  <span
                    className="mergebtn"
                    onClick={() => {
                      if (selectedUser !== "" && selectedRole !== "") {
                        if (currentUser.roles.includes(selectedRole)) {
                          alert("الدور مخصص للعضو");
                        } else {
                          alert("لمزيد من الأمان أضف عن طريق مستودع البيانات");
                        }
                      } else {
                        alert("أختر المطلوب");
                      }
                    }}
                  >
                    <FaArrowRight />
                  </span>
                  {selectedRole}
                </div>
              </>
            )}
          </div>
          <div className="mergeSec">
            <span
              className="mergebtn"
              onClick={() =>
                axios
                  .put(
                    "/api/roles",
                    { permission: "yes" },
                    { "content-type": "application/json" }
                  )
                  .then((res) => {
                    const { data } = res;
                    data === "done" && alert("done");
                  })
              }
            >
              <FaArrowDown />
              <FaArrowUp />
            </span>
          </div>
          {/* <div className="mergeSec">
            <span
              className="mergebtn"
              onClick={() =>
                axios
                  .post(
                    "/api/products/external",
                    { permission: "yes" },
                    { "content-type": "application/json" }
                  )
                  .then((res) => {
                    const { data } = res;
                    data === "done" && alert("done");
                  })
              }
            >
              Upload products
              <FaArrowUp />
            </span>
          </div> */}
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
        .merge {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.6rem 0;
          margin: 0.5rem 0;
          border: 1px solid ${styles.primaryColor};
          border-radius: 0.5rem;
        }
        el {
          font-size: 0.9rem;
          color: grey;
        }
        .mergeSec {
          margin: 1rem;
          display: flex;
          justify-content: center;
        }
        .mergebtn {
          font-size: 1rem;
          line-height: 0.8rem;
          color: white;
          padding: 0.3rem 1.1rem;
          border-radius: 0.2rem;
          background: ${styles.primaryColorLight};
          margin: auto 0.8rem;
        }
        .column {
          display: flex;
        }
        .column div {
          flex: 1 1 100%;
          padding: 0 1rem;
        }
      `}</style>
    </>
  );
}
