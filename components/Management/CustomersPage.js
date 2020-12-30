import { useState, useEffect } from "react";
import axios from "axios";
import CustomerCard from "./components/CustomerCard";

export default function CustomersPage({ page }) {
  const [roles, setRoles] = useState("");
  const [userList, setUserList] = useState([]);
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setRoles(data.roles);
      }
    });
    axios.get("/api/users").then((res) => {
      const { data } = res;
      data && setUserList(data);
    });
  }, [setRoles, setUserList]);
  useEffect(() => {
    axios.get("/api/permissions/user").then((res) => setPermissions(res.data));
  }, [setPermissions]);

  return (
    <>
      {roles.length > 1 &&
        page === "users" &&
        permissions.includes("view users") && (
          <div>
            <ul>
              {userList.map((obj, index) => (
                <CustomerCard key={index} user={obj} />
              ))}
            </ul>
          </div>
        )}
    </>
  );
}
