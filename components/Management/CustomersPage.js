import { useState, useEffect } from "react";
import axios from "axios";
import CustomerCard from "./components/CustomerCard";

export default function CustomersPage() {
  const [roles, setRoles] = useState("");
  const [userList, setUserList] = useState([]);
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

  return (
    <>
      {roles.includes("ordersManager") && (
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
