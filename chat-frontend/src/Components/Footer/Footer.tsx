import React from "react";
import styles from "./Footer.module.css";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Minha Empresa. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
