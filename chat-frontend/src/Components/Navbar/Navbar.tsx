import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../Images/whiteLogo.png";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={logo} alt="Logo" />
      </div>
    </nav>
  );
};

export default Navbar;
