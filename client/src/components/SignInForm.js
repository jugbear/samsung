import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const SignInForm = ({ islogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onSubmitForm = async (event) => {
    const { email, password } = data;
    event.preventDefault();
    if (!email || !password) {
      return setError("لطفا تمام فیلد ها را پر کنید");
    }

    try {
      const response = await axios.post("http://localhost:4000/signin", data);
      if (response.data.error) {
        setError(response.data.error);
      } else {
        swal("خوش آمدید", " با موفقیت وارد شدید", "success");
        setData({
          email: "",
          password: "",
        });
        islogin(true);
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <h2 className="formheader signinheader">ورود</h2>
      <form onSubmit={onSubmitForm} className='formsign'>
        <div className="form-group">
          <label className="form-label">ایمیل</label>
          <input
            type="email"
            className="form-control"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label className="form-label">پسورد</label>
          <input
            type="password"
            className="form-control"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="form-footer">
          <button className="submit-btn">ورود</button>
        </div>
      </form>
      <div className="showerror">
        <p>{error}</p>
      </div>
    </div>
  );
};
export default SignInForm;
