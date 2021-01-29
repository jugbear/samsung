import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowUsers = () => {
  const [users, setUsers] = useState({});
  const [error, setError] = useState("");
  const [term, setTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      setUsers(response.data);
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const resultHelper = (title) => {
    return Object.values(users).filter((st) => {
      return st.firstname.includes(title);
    });
  };
  return (
    <React.Fragment>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="جست و جو کنید"
          value={term}
          onChange={e=>setTerm(e.target.value)}
          onEndEditing={() => resultHelper(term)}
        />
      </form>
      <table>
        <thead>
          <tr>
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>ایمیل</th>
            <th>سن</th>
            <th>جنسیت</th>
          </tr>
        </thead>
        <tbody>
          {resultHelper(term).map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {error ? error : null}
    </React.Fragment>
  );
};
export default ShowUsers;
