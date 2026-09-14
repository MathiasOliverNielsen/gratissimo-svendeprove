/**
 * useForm Hook
 * Administrerer formular
 * @param {Object} initialValues - Startværdier
 * @param {Function} onValidate - Valgfri validering
 * @returns {Object} Formulardata
 */

import { useState, useCallback } from 'react';
import * as validation from '../utils/validation.js';

export function useForm(initialValues = {}, onValidate = null) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (name, value) => {
      if (!validation.validateNoScriptTags(value)) {
        return 'Special characters like <, >, script tags are not allowed';
      }

      if (onValidate) {
        return onValidate(name, value);
      }

      switch (name) {
        case 'email':
          return validation.validateEmail(value) ? null : 'Invalid email address';
        case 'password':
          return validation.validatePassword(value) ? null : 'Password must be at least 6 characters';
        case 'phone':
          return validation.validatePhone(value) ? null : 'Invalid phone number';
        case 'url':
        case 'website':
          return validation.validateURL(value) ? null : 'Invalid URL';
        default:
          return validation.isRequired(value) ? null : 'This field is required';
      }
    },
    [onValidate],
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(values).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validateField]);

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
      setValues((prev) => ({ ...prev, [name]: newValue }));

      if (touched[name]) {
        const error = validateField(name, newValue);
        setErrors((prev) => ({
          ...prev,
          [name]: error || undefined,
        }));
      }
    },
    [touched, validateField],
  );

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      const error = validateField(name, values[name]);
      setErrors((prev) => ({
        ...prev,
        [name]: error || undefined,
      }));
    },
    [values, validateField],
  );

  const handleSubmit = useCallback(
    (onSubmit) => {
      return async (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }

        if (validateForm()) {
          setIsSubmitting(true);
          try {
            await onSubmit(values);
          } catch (error) {
            console.error('Form submission error:', error);
          } finally {
            setIsSubmitting(false);
          }
        } else {
          setTouched(
            Object.keys(values).reduce((acc, key) => {
              acc[key] = true;
              return acc;
            }, {}),
          );
        }
      };
    },
    [values, validateForm],
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    validateForm,
  };
}
