import { configure, defineRule } from 'vee-validate';
import { required, email, min, max } from '@vee-validate/rules';

// Configura le regole di validazione
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

// Configura i messaggi di errore in italiano
configure({
  generateMessage: (context) => {
    const messages = {
      required: 'Questo campo è obbligatorio',
      email: 'Inserisci un indirizzo email valido',
      min: `Inserisci almeno ${context.rule?.params} caratteri`,
      max: `Inserisci al massimo ${context.rule?.params} caratteri`,
    };

    const messageFn = messages[context.rule?.name as keyof typeof messages];
    return typeof messageFn === 'string' ? messageFn : 'Campo non valido';
  },
});

// Regole personalizzate
defineRule('phone', (value: string) => {
  if (!value) return true;
  const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  return phoneRegex.test(value) || 'Inserisci un numero di telefono valido';
});

defineRule('postal_code', (value: string) => {
  if (!value) return true;
  const capRegex = /^\d{5}$/;
  return capRegex.test(value) || 'Inserisci un CAP valido (5 numeri)';
});

defineRule('card_number', (value: string) => {
  if (!value) return true;
  const cardRegex = /^(\d{4}\s?){4}$/;
  return cardRegex.test(value) || 'Inserisci un numero di carta valido';
});

defineRule('card_expiry', (value: string) => {
  if (!value) return true;
  const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!expiryRegex.test(value)) {
    return 'Formato MM/YY non valido';
  }

  const [month, year] = value.split('/');
  const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
  const now = new Date();

  return expiry > now || 'La carta è scaduta';
});

defineRule('card_cvv', (value: string) => {
  if (!value) return true;
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(value) || 'CVV non valido';
});
