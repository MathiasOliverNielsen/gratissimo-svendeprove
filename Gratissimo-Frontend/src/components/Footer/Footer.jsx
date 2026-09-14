import { GridContainer } from "../GridContainer/GridContainer";
import { FlexContainer } from "../FlexContainer/FlexContainer";
import { InputField } from "../InputField/InputField";
import { Button } from "../Button/Button";
import { NavLink } from "react-router";
import styles from "./Footer.module.scss";
import facebook from "../../assets/icons/SoMe/Facebook.png";
import googleplus from "../../assets/icons/SoMe/Google Plus.png";
import instagram from "../../assets/icons/SoMe/Instagram Circle.png";
import linkedin from "../../assets/icons/SoMe/LinkedIn Circled.png";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <GridContainer columns={6} gap="2rem">
        {/* For jobsøgere */}
        <section className={styles.footerSection}>
          <h3>For jobsøgere</h3>
          <ul>
            <li>
              <NavLink to="/profile">Din kundeeside</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Opret profil</NavLink>
            </li>
            <li>
              <NavLink to="/saved-jobs">Gemte jobs</NavLink>
            </li>
          </ul>
        </section>

        {/* For arbejdsgivere */}
        <section className={styles.footerSection}>
          <h3>For arbejdsgivere</h3>
          <ul>
            <li>
              <NavLink to="/company">Virksomhedsprofil</NavLink>
            </li>
            <li>
              <NavLink to="/create-ad">Opret annonce</NavLink>
            </li>
            <li>
              <NavLink to="/posting">Jobannoncering</NavLink>
            </li>
            <li>
              <NavLink to="/recruitment">Rekruttering</NavLink>
            </li>
          </ul>
        </section>

        {/* Links */}
        <section className={styles.footerSection}>
          <h3>Links</h3>
          <ul>
            <li>
              <NavLink to="/about">Om Gratissimo</NavLink>
            </li>
            <li>
              <NavLink to="/jobs">Job hos os</NavLink>
            </li>
            <li>
              <NavLink to="/investors">For investorer</NavLink>
            </li>
            <li>
              <NavLink to="/press">Presse</NavLink>
            </li>
          </ul>
        </section>

        {/* Newsletter - spans 2 columns */}
        <section className={`${styles.footerSection} ${styles.wide}`}>
          <h3>Vil du have jobs direkte i din indbakke?</h3>
          <p>Tilmeld dig vores elektroniske nyhedsbrev</p>
          <form className={styles.newsletterForm}>
            <FlexContainer className={styles.newsletterForm} gap="$spacing-sm">
              <div className={styles.inputWrapper}>
                <InputField type="email" placeholder="Indtast email..." required />
              </div>
              <div className={styles.buttonWrapper}>
                <Button type="submit" variant="secondary">
                  Tilmeld
                </Button>
              </div>
            </FlexContainer>
          </form>
        </section>

        {/* Contact - spans 1 column */}
        <section className={styles.footerSection}>
          <p>
            Fidusvej 23
            <br />
            9200 Øster Lundby
            <br />
            +45 22 13 22 13
          </p>
          <section className={styles.socialSection}>
            <a href="#" aria-label="Facebook">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="#" aria-label="Google+">
              <img src={googleplus} alt="Google+" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <img src={linkedin} alt="LinkedIn" />
            </a>
          </section>
        </section>
      </GridContainer>
    </footer>
  );
}
