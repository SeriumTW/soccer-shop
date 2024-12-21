import { useField, useForm } from 'vee-validate';
import { computed } from 'vue';

export interface ValidationRule {
  name: string;
  params?: any;
}

export function useValidation(name: string, rules: ValidationRule[]) {
  const {
    value: fieldValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
  } = useField(
    name,
    rules.reduce((acc, rule) => {
      acc[rule.name] = rule.params;
      return acc;
    }, {} as Record<string, any>)
  );

  const hasError = computed(() => {
    return meta.touched && errorMessage.value !== undefined;
  });

  const isValid = computed(() => {
    return meta.valid && meta.touched;
  });

  return {
    value: fieldValue,
    errorMessage,
    handleBlur,
    handleChange,
    hasError,
    isValid,
    meta,
  };
}

export function useCheckoutForm() {
  const { handleSubmit, errors, values } = useForm();

  const nameField = useValidation('name', [
    { name: 'required' },
    { name: 'min', params: 3 },
  ]);

  const emailField = useValidation('email', [
    { name: 'required' },
    { name: 'email' },
  ]);

  const phoneField = useValidation('phone', [
    { name: 'required' },
    { name: 'phone' },
  ]);

  const addressField = useValidation('address', [
    { name: 'required' },
    { name: 'min', params: 5 },
  ]);

  const postalCodeField = useValidation('postal_code', [
    { name: 'required' },
    { name: 'postal_code' },
  ]);

  const cityField = useValidation('city', [{ name: 'required' }]);

  const cardNumberField = useValidation('card_number', [
    { name: 'required' },
    { name: 'card_number' },
  ]);

  const cardExpiryField = useValidation('card_expiry', [
    { name: 'required' },
    { name: 'card_expiry' },
  ]);

  const cardCvvField = useValidation('card_cvv', [
    { name: 'required' },
    { name: 'card_cvv' },
  ]);

  const isFormValid = computed(() => {
    const allFieldsValid = [
      nameField.isValid.value,
      emailField.isValid.value,
      phoneField.isValid.value,
      addressField.isValid.value,
      postalCodeField.isValid.value,
      cityField.isValid.value,
      cardNumberField.isValid.value,
      cardExpiryField.isValid.value,
      cardCvvField.isValid.value,
    ].every(Boolean);

    return allFieldsValid && Object.keys(errors.value).length === 0;
  });

  return {
    nameField,
    emailField,
    phoneField,
    addressField,
    postalCodeField,
    cityField,
    cardNumberField,
    cardExpiryField,
    cardCvvField,
    handleSubmit,
    errors,
    values,
    isFormValid,
  };
}
