import { useState } from "react";
import { GridContainer } from "../GridContainer/GridContainer";
import { FlexContainer } from "../FlexContainer/FlexContainer";
import { NavLink } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { validateEmail } from "../../utils/validation";
import { getAuthToken } from "../../utils/api";
import styles from "./Footer.module.scss";
import facebook from "../../assets/icons/SoMe/Facebook.png";
import googleplus from "../../assets/icons/SoMe/Google Plus.png";
import instagram from "../../assets/icons/SoMe/Instagram Circle.png";
import linkedin from "../../assets/icons/SoMe/LinkedIn Circled.png";

export function Footer() {
  const { isAuthenticated } = useAuthContext();
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setSubscriptionMessage("Du skal være logget ind for at tilmelde dig nyhedsbrevet");
      setTimeout(() => setSubscriptionMessage(""), 4000);
      return;
    }

    if (!validateEmail(email)) {
      setSubscriptionMessage("Venligst indtast en gyldig e-mailadresse");
      setTimeout(() => setSubscriptionMessage(""), 4000);
      return;
    }

    setLoading(true);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      params.append("email", email);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${token}`,
        },
        body: params.toString(),
      });

      if (response.ok) {
        setSubscriptionMessage("Tak for din tilmelding!");
        setEmail("");
        setTimeout(() => setSubscriptionMessage(""), 4000);
      } else if (response.status === 400 || response.status === 409) {
        setSubscriptionMessage("E-mailadressen er allerede tilmeldt");
        setTimeout(() => setSubscriptionMessage(""), 4000);
      } else {
        setSubscriptionMessage("En fejl opstod. Prøv igen senere.");
        setTimeout(() => setSubscriptionMessage(""), 4000);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setSubscriptionMessage("En fejl opstod. Prøv igen senere.");
      setTimeout(() => setSubscriptionMessage(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <GridContainer columns={6} gap="1.5rem">
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
          <form className={styles.newsletterForm} onSubmit={handleNewsletterSubscribe}>
            <FlexContainer className={styles.newsletterForm} gap="$spacing-sm">
              <div className={styles.inputWrapper}>
                <input type="email" placeholder="Indtast email..." value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
              </div>
              <div className={styles.buttonWrapper}>
                <button type="submit" disabled={loading}>
                  {loading ? "Tilmelder..." : "Tilmeld"}
                </button>
              </div>
            </FlexContainer>
            {subscriptionMessage && <p className={styles.subscriptionMessage}>{subscriptionMessage}</p>}
          </form>
        </section>

        {/* Contact - spans 1 column */}
        <section className={styles.footerSection}>
          <p>
            Fidusvej 23
            <br />
            9230 Øster Lundby
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
