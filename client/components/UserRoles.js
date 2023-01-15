import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import baseUrl from "../helpers/baseUrl";

function UserRoles() {
  const [users, setUsers] = useState([]);
  const cookieuser = parseCookies();
  const user = cookieuser.user ? cookieuser.user : "";
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const res = await fetch(`${baseUrl}/user/findAllUsers`, {
      headers: {
        user: user,
      },
    });
    const res2 = await res.json();
    setUsers(res2.result);
  };

  const handleRole = async (id, role) => {
    const res = await fetch(`${baseUrl}/user/changeRoles`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        user: user,
      },
      body: JSON.stringify({
        id,
        role,
      }),
    });
    const res2 = await res.json();

    const updatedUsers = users.map((user) => {
      if (user.role != res2.result.role && user.email == res2.result.email) {
        return res2.result;
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
  };

  return (
    <>
      <h5 style={{ margin: "30px 0px" }}>User roles</h5>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td onClick={() => handleRole(item.id, item.role)}>
                  <button
                    title="Change role"
                    style={{
                      width: "100px",
                      cursor: "pointer",
                      borderRadius: "5px",
                      border: "1px solid rgb(153, 153, 153)",
                      background: "none",
                      padding: "10px",
                    }}
                  >
                    {item.role}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default UserRoles;
