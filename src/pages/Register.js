import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "../components/Logo";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const { user, isloading } = useSelector((store) => store.user);
  const navigate = useNavigate();

  // console.log(state);

  // useEffect(() => {
  //   refCon.current.focus();
  // }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`${name} : ${value}`);
    setState({ ...state, [name]: value });
    // setState(e.target.value);
    // console.log(e.target);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = state;

    if (!email || !password || (!isMember && !name)) {
      return toast.error("Please Fill Out All Fields");
    }
    if (isMember) {
      return dispatch(loginUser({ email: email, password: password }));
    }
    dispatch(registerUser({ name, email, password }));
    // console.log(e.target);
    // const name = e.taget.name;
    // const value = e.target.value;
    // setState({ ...state, [name]: value });
  };
  const toggleMember = () => {
    setState({ ...state, isMember: !state.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        {/* <img src={logo} alt="" className="logo" /> */}
        <Logo />
        <h3>{state.isMember ? "LOGIN" : "REGISTER"}</h3>

        {!state.isMember && (
          <FormRow
            type="text"
            name="name"
            value={state.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={state.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={state.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isloading}>
          {isloading ? "Loading..." : "Submit"}
        </button>
        <p>
          {/* Already A Member */}
          {state.isMember ? "Not a member ? " : "Already a member ? "}
          <button type="button" onClick={toggleMember} className="member-btn">
            {state.isMember ? " Register" : " Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
