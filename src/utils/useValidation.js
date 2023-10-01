import { useState, useCallback } from "react";

import isEmail from "validator/es/lib/isEmail";

export function useValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      !isEmail(value)
        ? e.target.setCustomValidity('Некорректый адрес почты.')
        : e.target.setCustomValidity('')
    }

    setValues({
      ...values,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: e.target.validationMessage
    })

    setIsValid(e.target.closest('form').checkValidity());
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, errors, isValid, handleChange, resetForm, setValues, setIsValid };
}