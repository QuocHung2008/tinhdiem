import { useCallback, useEffect, useMemo, useState } from 'react';

const cloneValues = (values) => JSON.parse(JSON.stringify(values));

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const readStoredValues = (storageKey, initialValues) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return cloneValues(initialValues);
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return cloneValues(initialValues);
    }

    const parsed = JSON.parse(raw);
    if (!isPlainObject(parsed)) {
      return cloneValues(initialValues);
    }

    const merged = cloneValues(initialValues);

    Object.keys(initialValues).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(parsed, key)) {
        merged[key] = parsed[key];
      }
    });

    return merged;
  } catch {
    return cloneValues(initialValues);
  }
};

const toSetterName = (key) => `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;

export const usePersistentCalculatorState = (storageKey, initialValues) => {
  const initialSnapshot = useMemo(() => JSON.stringify(initialValues), [initialValues]);
  const [values, setValues] = useState(() => readStoredValues(storageKey, initialValues));

  const hasSavedData = useMemo(
    () => JSON.stringify(values) !== initialSnapshot,
    [initialSnapshot, values]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      if (hasSavedData) {
        window.localStorage.setItem(storageKey, JSON.stringify(values));
      } else {
        window.localStorage.removeItem(storageKey);
      }
    } catch {
      // Ignore storage quota or privacy-mode errors and keep the form usable.
    }
  }, [hasSavedData, storageKey, values]);

  const setField = useCallback((key, nextValue) => {
    setValues((previousValues) => ({
      ...previousValues,
      [key]:
        typeof nextValue === 'function'
          ? nextValue(previousValues[key])
          : nextValue,
    }));
  }, []);

  const generatedSetters = useMemo(
    () =>
      Object.fromEntries(
        Object.keys(initialValues).map((key) => [
          toSetterName(key),
          (nextValue) => setField(key, nextValue),
        ])
      ),
    [initialValues, setField]
  );

  const clearSavedForm = useCallback(() => {
    setValues(cloneValues(initialValues));

    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Ignore storage errors when clearing saved values.
    }
  }, [initialValues, storageKey]);

  return {
    values,
    generatedSetters,
    hasSavedData,
    clearSavedForm,
  };
};
