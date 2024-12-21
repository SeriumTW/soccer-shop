<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <h2 class="text-lg font-semibold mb-4">Dati Personali</h2>
      <div class="space-y-4">
        <FormInput
          id="name"
          label="Nome e Cognome"
          type="text"
          v-model="form.name"
          :hasError="!!errors.name"
          :errorMessage="errors.name"
          required
        />

        <FormInput
          id="email"
          label="Email"
          type="email"
          v-model="form.email"
          :hasError="!!errors.email"
          :errorMessage="errors.email"
          required
        />

        <FormInput
          id="phone"
          label="Telefono"
          type="tel"
          v-model="form.phone"
          :hasError="!!errors.phone"
          :errorMessage="errors.phone"
          required
        />
      </div>
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-4">Indirizzo di Spedizione</h2>
      <div class="space-y-4">
        <FormInput
          id="address"
          label="Indirizzo"
          type="text"
          v-model="form.address"
          :hasError="!!errors.address"
          :errorMessage="errors.address"
          required
        />

        <div class="grid grid-cols-2 gap-4">
          <FormInput
            id="zip"
            label="CAP"
            type="text"
            v-model="form.zip"
            :hasError="!!errors.zip"
            :errorMessage="errors.zip"
            required
          />

          <FormInput
            id="city"
            label="Città"
            type="text"
            v-model="form.city"
            :hasError="!!errors.city"
            :errorMessage="errors.city"
            required
          />
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-4">Pagamento</h2>
      <div class="space-y-4">
        <FormInput
          id="card_number"
          label="Numero Carta"
          type="text"
          v-model="form.cardNumber"
          :hasError="!!errors.cardNumber"
          :errorMessage="errors.cardNumber"
          placeholder="**** **** **** ****"
          required
        />

        <div class="grid grid-cols-2 gap-4">
          <FormInput
            id="card_expiry"
            label="Scadenza"
            type="text"
            v-model="form.cardExpiry"
            :hasError="!!errors.cardExpiry"
            :errorMessage="errors.cardExpiry"
            placeholder="MM/YY"
            required
          />

          <FormInput
            id="card_cvv"
            label="CVV"
            type="text"
            v-model="form.cardCvv"
            :hasError="!!errors.cardCvv"
            :errorMessage="errors.cardCvv"
            placeholder="***"
            required
          />
        </div>
      </div>
    </div>

    <Button type="submit" variant="primary" fullWidth :loading="loading">
      {{ loading ? 'Elaborazione...' : 'Conferma Ordine' }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCheckoutForm } from '../composables/useValidation';
import FormInput from './FormInput.vue';
import Button from './Button.vue';

const props = defineProps<{
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit', data: Record<string, string>): void;
}>();

const {
  nameField,
  emailField,
  phoneField,
  addressField,
  postalCodeField,
  cityField,
  cardNumberField,
  cardExpiryField,
  cardCvvField,
  handleSubmit: onSubmit,
  errors,
  isFormValid,
} = useCheckoutForm();

const form = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  zip: '',
  city: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
});

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', form.value);
  }
};
</script>
