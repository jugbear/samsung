import React, { useState } from "react";
import axios from 'axios'
import swal from 'sweetalert';

const SignUpForm = ({islogin}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const onSubmitForm = async(event) => {
    const { email, password, age, gender, firstname, lastname } = data;
    event.preventDefault();
    if (!email || !password || !age || !gender || !firstname || !lastname) {
      return setError("لطفا تمام فیلد ها را پر کنید");
    }
    if(password.length < 5){
        return setError("پسورد باید بیشتر از ۵ کاراکتر باشد");
    }
    try {
        await axios.post('http://localhost:4000/signup', data);
        swal(` ${firstname} عزیز خوش آمدید`, "ثبت نام شما با موفقیت انجام شد", "success");
        setData({
            email:'',
            password:'',
            firstname:'',
            lastname:'',
            age:'',
            gender:''
        })
        islogin(true)
      } catch (err) {
        setError(err)
        }
    
  };
  return (
    <div className='sign'>
      <h2 className="formheader">ثبت نام</h2>
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <label className="form-label">نام</label>
          <input
            type="text"
            className="form-control"
            value={data.firstname}
            onChange={(e) => setData({ ...data, firstname: e.target.value })}
          />
          <label className="form-label">نام خانوادگی</label>
          <input
            type="text"
            className="form-control"
            value={data.lastname}
            onChange={(e) => setData({ ...data, lastname: e.target.value })}
          />
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
          <label className="form-label">سن</label>
          <input
            type="number"
            className="form-control"
            value={data.age}
            onChange={(e) => setData({ ...data, age: e.target.value })}
          />
          <select
            className="form-control"
            aria-label="Default select example"
            value={data.gender}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          >
            <option defaultValue>جنسیت</option>
            <option value="مرد">مرد</option>
            <option value="زن">زن</option>
          </select>
        </div>
        <div className="form-footer">
          <button className="submit-btn">ثبت نام</button>
        </div>
      </form>
      <div className='showerror'>
      <p>{error}</p>
      </div>
    </div>
  );
};
export default SignUpForm;
