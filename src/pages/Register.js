import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "../components/Logo";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { regex, validate } from "../features/validations/validation";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [formErrors, setFormErrors] = useState(state);
  const { user, isloading } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // useEffect(() => {
  //   if (Object.keys(formErrors) === 0) {
  //     console.log("There Some Error");
  //   } else {
  //     // setFormErrors(validate(formErrors));
  //   }
  // }, [formErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = state;
    setFormErrors(validate(state));
    if (formErrors) {
      // return toast.error("Please Fill Out All Fields");
      if (!isMember) {
        if (!name) {
          return toast.error("Name is required");
        }
        if (!email) {
          return toast.error("Email is required");
        }
        if (password.length < 6) {
          return toast.error(
            "Password is required and it must contain 6 characters"
          );
        }
        dispatch(registerUser({ name, email, password }));
      }
      if (isMember) {
        if (!regex.test(email)) {
          return toast.error(
            !email ? "Email is required" : "This Email is not a valid one!"
          );
        } else if (password.length < 6) {
          return toast.error(
            !password ? "Password Is Required" : "Password must of 6 characters"
          );
        }
        dispatch(loginUser({ email: email, password: password }));
      }
    }
    if (isMember) {
      return dispatch(loginUser({ email: email, password: password }));
    }
    if (!isMember) {
      return dispatch(registerUser({ name, email, password }));
    }
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
      <form className="form">
        {/* <img src={logo} alt="" className="logo" /> */}
        <Logo />
        <h3>{state.isMember ? "LOGIN" : "REGISTER"}</h3>
        {!state.isMember && (
          <div>
            <FormRow
              type="text"
              name="name"
              value={state.name}
              handleChange={handleChange}
            />
            <p style={{ color: "red" }}>{!state.name ? formErrors.name : ""}</p>
          </div>
        )}
        <FormRow
          type="email"
          name="email"
          value={state.email}
          handleChange={handleChange}
        />
        <p style={{ color: "red" }}>{!state.email ? formErrors.name : ""}</p>
        {/* <p style={{ color: "red" }}>
          {state.email && !regex.test(state.email)
            ? formErrors.email
            : !state.email
            ? formErrors.email
            : ""}
        </p> */}
        {/* {state.email && <p style={{ color: "red" }}></p>} */}
        {/* {state.email && !regex.test(state.email) ? return( <p style={{ color: "red" }}>
            {!state.email
              ? formErrors.email
              : !regex.test(state.email)
              ? formErrors.email
              : ""}
          </p>)
        : (
          ""
        )} */}
        <FormRow
          type="password"
          name="password"
          value={state.password}
          handleChange={handleChange}
        />
        <p style={{ color: "red" }}>
          {state.password.length < 6
            ? formErrors.password
            : state.password.length > 6
            ? formErrors.password
            : ""}
        </p>
        <button
          type="submit"
          className="btn btn-block"
          onClick={handleSubmit}
          disabled={isloading}
        >
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
