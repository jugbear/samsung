import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import ShowUsers from "./ShowUsers";
import "../app.scss";
const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleChange = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div>
      <div className="authholder">
      {!isLogin ?  <SignUpForm islogin={handleChange} /> : null}
      {!isLogin ? <SignInForm islogin={handleChange} /> : null}
      </div>
      <div className="users-table-holder">
        {isLogin ? <ShowUsers islogin={handleChange} /> : null}
        {isLogin ? <button className="submit-btn" onClick={handleChange}>خروج</button> :null}
      </div>
    </div>
  );
};
export default AuthComponent;
