import { useState, useEffect } from 'react';

const useValidateInput = (initialValue:any, validate: (value:any)=>any) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (!hasRendered) {
      setHasRendered(true);
      return;
    }

    const validationError = validate(value);
    setError(validationError);
  }, [value, validate, hasRendered]);

  const handleChange = (e:any) => {
    setValue(e.target.value);
  };

  return {
    value,
    error,
    handleChange,
  };
};

export default useValidateInput;
