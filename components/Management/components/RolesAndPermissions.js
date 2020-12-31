import { useEffect, useState } from "react";
import axios from "axios";
import CreateSelect from "./CreateSelect";
import { FaArrowLeft } from "react-icons/fa";
import { styles } from "../../../public/js/styles";

export default function RolesAndPermissions() {
  const [rolesList, setRolesList] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [permissionsList, setPermissionsList] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState("");
  const [rolePermissions, setRolePermissions] = useState([]);

  useEffect(() => {
    axios.get("/api/roles").then((res) => {
      const { data } = res;
      setRolesList(data);
    });
    axios.get("/api/permissions").then((res) => {
      const { data } = res;
      setPermissionsList(data);
    });
  }, [setPermissionsList, setRolesList]);

  useEffect(() => {
    selectedRole.length > 0 &&
      axios.get(`/api/permissions/${selectedRole}`).then((res) => {
        const { data } = res;
        setRolePermissions(data);
      });
  }, [selectedRole]);

  return (
    <>
      <div className="addCategory-comb">
        <CreateSelect
          initOptions={rolesList}
          url={"/api/roles"}
          name={"role"}
          placeholder={"اختر دور"}
          setSelect={setSelectedRole}
        />
        <CreateSelect
          initOptions={permissionsList}
          url={"/api/permissions"}
          name={"permission"}
          placeholder={"أضف إذن"}
          setSelect={setSelectedPermission}
        />
      </div>
      <div>
        أذونات الدور:{" "}
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

      <style jsx>{`
        .addCategory-comb {
          display: flex;
          align-items: center;
          direction: rtl;
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

        .mergebtn {
          font-size: 1rem;
          line-height: 0.8rem;
          color: white;
          padding: 0.3rem 1.1rem;
          border-radius: 0.2rem;
          background: ${styles.primaryColorLight};
          margin: auto 0.8rem;
        }
      `}</style>
    </>
  );
}
