import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toggleSidebar } from "../features/user/userSlice";
import links from "../utils/links";
import NavLinks from "./NavLinks";

// {
//   show, setShow;
// }
const SmallSidebar = () => {
  // const [show, setShow] = useState(false);
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div
        // className={
        //   show ? "sidebar-container show-sidebar" : "sidebar-container"
        // }
        className={`sidebar-container ${isSidebarOpen ? "show" : ""}`}
      >
        <div className="content">
          <button
            className="close-btn"
            // onClick={() => setShow(!show)}
            onClick={toggle}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle}></NavLinks>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
