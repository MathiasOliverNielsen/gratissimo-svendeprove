import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../../context/AuthContext";
import { InputField } from "../../../components/InputField/InputField";
import { Button } from "../../../components/Button/Button";
import { validateNoScriptTags } from "../../../utils/validation";
import styles from "./Login.module.scss";

// Login and registration component with toggle between modes
export default function Login({ initialMode = "login" }) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    city: "",
    zipcode: "",
  });

  const { login, register, loading, error, clearError } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(initialMode === "login");
    clearError();
  }, [initialMode, clearError]);

  // Updates form data as user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submits login credentials and redirects on success
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    clearError();

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate("/");
    }
  };

  // Submits registration form and redirects on success
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const textFields = ["firstname", "lastname", "address", "city"];
    for (const field of textFields) {
      if (!validateNoScriptTags(formData[field])) {
        alert(`${field} indeholder ugyldige tegn`);
        return;
      }
    }

    const result = await register(formData);

    if (result.success) {
      setFormData({ email: "", password: "", confirmPassword: "", firstname: "", lastname: "", phone: "", address: "", city: "", zipcode: "" });
      setIsLogin(true);
    }
  };

  return (
    <>
      {/* Header section */}
      <section className={styles.header}>
        <h1>Log ind eller opret dig som bruger</h1>
        <p>Når du opretter en profil på Gratissimo får du adgang til at oprette dine egne job annoncer. Som privatperson får du mulighed for at gemme de jobs du kunne være interesseret i.</p>
        <a href="#login" className={styles.link}>
          Log ind for at gå til min side
        </a>
      </section>

      {/* Login Form */}
      {isLogin ? (
        <section className={styles.formSection}>
          <h2>Log ind</h2>
          <form onSubmit={handleLoginSubmit}>
            <InputField name="email" label="Email" type="email" placeholder="Din email" value={formData.email} onChange={handleInputChange} required />
            <InputField name="password" label="Adgangskode" type="password" placeholder="Din adgangskode" value={formData.password} onChange={handleInputChange} required />
            {error && <p className={styles.error}>{error}</p>}
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? "Logger ind..." : "Log ind"}
            </Button>
          </form>
          <p className={styles.toggleText}>
            Har du ikke en profil? <button onClick={() => setIsLogin(false)}>Opret bruger</button>
          </p>
        </section>
      ) : (
        /* Register Form */
        <section className={styles.formSection}>
          <h2>Opret ny profil</h2>
          <form onSubmit={handleRegisterSubmit}>
            <InputField name="email" label="Email" type="email" placeholder="Din email" value={formData.email} onChange={handleInputChange} required />
            <InputField name="password" label="Adgangskode" type="password" placeholder="Din adgangskode" value={formData.password} onChange={handleInputChange} required />
            <InputField name="confirmPassword" label="Bekræft adgangskode" type="password" placeholder="Bekræft din adgangskode" value={formData.confirmPassword} onChange={handleInputChange} required />
            <InputField name="firstname" label="Fornavn" placeholder="Dit fornavn" value={formData.firstname} onChange={handleInputChange} required />
            <InputField name="lastname" label="Efternavn" placeholder="Dit efternavn" value={formData.lastname} onChange={handleInputChange} required />
            <InputField name="phone" label="Telefon nummer" type="tel" placeholder="Dit telefon nummer" value={formData.phone} onChange={handleInputChange} required />
            <InputField name="address" label="Adresse" placeholder="Din adresse" value={formData.address} onChange={handleInputChange} required />
            <InputField name="city" label="By" placeholder="Din by" value={formData.city} onChange={handleInputChange} required />
            <InputField name="zipcode" label="Postnummer" placeholder="Dit postnummer" value={formData.zipcode} onChange={handleInputChange} required />
            {error && <p className={styles.error}>{error}</p>}
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? "Opretter profil..." : "Opret profil"}
            </Button>
          </form>
          <p className={styles.toggleText}>
            Har du allerede en profil? <button onClick={() => setIsLogin(true)}>Log ind</button>
          </p>
        </section>
      )}
    </>
  );
}
