import { useState } from "react";
import { useNavigate } from "react-router";
import { InputField } from "../../components/InputField/InputField";
import { Button } from "../../components/Button/Button";
import { useFetch } from "../../hooks/useFetch";
import { isRequired } from "../../utils/validation";
import { getCookie } from "../../utils/cookieUtils";
import styles from "./CreateAdvertisement.module.scss";

export default function CreateAdvertisement() {
  const navigate = useNavigate();
  const { data: workTypes } = useFetch(`${import.meta.env.VITE_API_URL}/workTypes`);
  const { data: categories } = useFetch(`${import.meta.env.VITE_API_URL}/job-categories`);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    organization: "",
    city: "",
    jobCategoryId: "",
    workTypeId: "",
    workHome: "",
    address: "",
    zipcode: "",
  });

  // Checks if all required fields are filled
  const validateForm = () => {
    const fields = {
      title: "Overskrift",
      description: "Job beskrivelse",
      organization: "Organisation",
      city: "By",
      jobCategoryId: "Kategori",
      workTypeId: "Arbejdstid",
      workHome: "Arbejdssted",
      address: "Adresse",
      zipcode: "Postnummer",
    };

    const newErrors = {};
    Object.entries(fields).forEach(([key, label]) => {
      if (!isRequired(formData[key])) {
        newErrors[key] = `${label} er påkrævet`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Updates form data as user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Submits form to API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const token = getCookie("authToken");
    if (!token) {
      setErrors({ submit: "Du skal være logget ind for at oprette en annonce." });
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        ...formData,
        userId: "1",
        regionId: "1",
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/job-listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: params.toString(),
      });

      if (response.ok) {
        setSuccessMessage("Annoncen er oprettet!");
        setFormData({
          title: "",
          description: "",
          organization: "",
          city: "",
          jobCategoryId: "",
          workTypeId: "",
          workHome: "",
          address: "",
          zipcode: "",
        });
        setTimeout(() => navigate("/"), 2000);
      } else {
        setErrors({ submit: "Kunne ikke oprette annoncen. Prøv igen." });
      }
    } catch (error) {
      setErrors({ submit: "En fejl opstod. Prøv igen senere." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.header}>
        <h1>Opret en annonce og find frivillige til din forening</h1>
        <p>Gratissimo er gratis for alle. Frivillige, organisationer og foreninger. Du skaber det frivillige liv og vi formidler kontakten. Når du har fundet en frivillig til din forening, kan du blot fjerne annoncen igen ved at gå til din side.</p>
        <a href="#mypage">Gå til min side</a>
      </section>

      <section className={styles.formSection}>
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {errors.submit && <p className={styles.error}>{errors.submit}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.leftColumn}>
              <InputField name="title" label="Overskrift" placeholder="F.eks. Frivillig på børnehjemmet" value={formData.title} onChange={handleInputChange} error={errors.title} />

              <InputField name="organization" label="Organisation / Forening" placeholder="Navn på organisationen" value={formData.organization} onChange={handleInputChange} error={errors.organization} />

              <InputField name="city" label="By" placeholder="F.eks. København Ø" value={formData.city} onChange={handleInputChange} error={errors.city} />

              <div className={styles.fieldGroup}>
                <label htmlFor="jobCategoryId" className={styles.label}>
                  Kategori
                </label>
                <select id="jobCategoryId" name="jobCategoryId" value={formData.jobCategoryId} onChange={handleInputChange} className={styles.select}>
                  <option value="">Vælg kategori</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.jobCategoryId && <p className={styles.fieldError}>{errors.jobCategoryId}</p>}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="workTypeId" className={styles.label}>
                  Arbejdstid
                </label>
                <select id="workTypeId" name="workTypeId" value={formData.workTypeId} onChange={handleInputChange} className={styles.select}>
                  <option value="">Vælg arbejdstid</option>
                  {workTypes?.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type}
                    </option>
                  ))}
                </select>
                {errors.workTypeId && <p className={styles.fieldError}>{errors.workTypeId}</p>}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="workHome" className={styles.label}>
                  Arbejdssted
                </label>
                <select id="workHome" name="workHome" value={formData.workHome} onChange={handleInputChange} className={styles.select}>
                  <option value="">Vælg arbejdssted</option>
                  <option value="On-site">På stedet</option>
                  <option value="Remote">Hjemmearbejde</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                {errors.workHome && <p className={styles.fieldError}>{errors.workHome}</p>}
              </div>

              <InputField name="address" label="Adresse" placeholder="Vejnavn og husnummer" value={formData.address} onChange={handleInputChange} error={errors.address} />

              <InputField name="zipcode" label="Postnummer" placeholder="F.eks. 2100" value={formData.zipcode} onChange={handleInputChange} error={errors.zipcode} />
            </div>

            <div className={styles.rightColumn}>
              <div className={styles.fieldGroup + " " + styles.descriptionField}>
                <label htmlFor="description" className={styles.label}>
                  Job beskrivelse
                </label>
                <textarea id="description" name="description" placeholder="Beskriv jobbet og hvad du søger efter" value={formData.description} onChange={handleInputChange} className={styles.textarea} />
                {errors.description && <p className={styles.fieldError}>{errors.description}</p>}
              </div>
            </div>
          </div>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Opretter annonce..." : "Opret annonce"}
          </Button>
        </form>
      </section>
    </>
  );
}
