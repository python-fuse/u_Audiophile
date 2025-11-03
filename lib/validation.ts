// Form validation utilities

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email address
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim() === "") {
    return { isValid: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Wrong format" };
  }

  return { isValid: true };
};

/**
 * Validate phone number
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone || phone.trim() === "") {
    return { isValid: false, error: "Phone is required" };
  }

  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.length < 10) {
    return { isValid: false, error: "Wrong format" };
  }

  return { isValid: true };
};

/**
 * Validate required field
 */
export const validateRequired = (
  value: string,
  fieldName: string
): ValidationResult => {
  if (!value || value.trim() === "") {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
};

/**
 * Validate ZIP code
 */
export const validateZipCode = (zipCode: string): ValidationResult => {
  if (!zipCode || zipCode.trim() === "") {
    return { isValid: false, error: "ZIP code is required" };
  }

  // Basic validation - at least 3 characters
  if (zipCode.trim().length < 3) {
    return { isValid: false, error: "Wrong format" };
  }

  return { isValid: true };
};

/**
 * Validate e-Money number
 */
export const validateEMoneyNumber = (
  eMoneyNumber: string
): ValidationResult => {
  if (!eMoneyNumber || eMoneyNumber.trim() === "") {
    return { isValid: false, error: "e-Money number is required" };
  }

  // Remove spaces and check if it's all digits
  const digitsOnly = eMoneyNumber.replace(/\s/g, "");

  if (!/^\d+$/.test(digitsOnly)) {
    return { isValid: false, error: "Wrong format" };
  }

  if (digitsOnly.length < 9) {
    return { isValid: false, error: "Wrong format" };
  }

  return { isValid: true };
};

/**
 * Validate e-Money PIN
 */
export const validateEMoneyPin = (pin: string): ValidationResult => {
  if (!pin || pin.trim() === "") {
    return { isValid: false, error: "PIN is required" };
  }

  if (!/^\d{4}$/.test(pin)) {
    return { isValid: false, error: "Wrong format" };
  }

  return { isValid: true };
};

/**
 * Validate entire checkout form
 */
export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: "e-money" | "cash";
  eMoneyNumber?: string;
  eMoneyPin?: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  eMoneyNumber?: string;
  eMoneyPin?: string;
}

export const validateCheckoutForm = (
  data: CheckoutFormData
): { isValid: boolean; errors: FormErrors } => {
  const errors: FormErrors = {};

  // Validate name
  const nameResult = validateRequired(data.name, "Name");
  if (!nameResult.isValid) errors.name = nameResult.error;

  // Validate email
  const emailResult = validateEmail(data.email);
  if (!emailResult.isValid) errors.email = emailResult.error;

  // Validate phone
  const phoneResult = validatePhone(data.phone);
  if (!phoneResult.isValid) errors.phone = phoneResult.error;

  // Validate address
  const addressResult = validateRequired(data.address, "Address");
  if (!addressResult.isValid) errors.address = addressResult.error;

  // Validate ZIP code
  const zipResult = validateZipCode(data.zipCode);
  if (!zipResult.isValid) errors.zipCode = zipResult.error;

  // Validate city
  const cityResult = validateRequired(data.city, "City");
  if (!cityResult.isValid) errors.city = cityResult.error;

  // Validate country
  const countryResult = validateRequired(data.country, "Country");
  if (!countryResult.isValid) errors.country = countryResult.error;

  // Validate payment method specific fields
  if (data.paymentMethod === "e-money") {
    if (data.eMoneyNumber) {
      const eMoneyNumberResult = validateEMoneyNumber(data.eMoneyNumber);
      if (!eMoneyNumberResult.isValid)
        errors.eMoneyNumber = eMoneyNumberResult.error;
    } else {
      errors.eMoneyNumber = "e-Money number is required";
    }

    if (data.eMoneyPin) {
      const eMoneyPinResult = validateEMoneyPin(data.eMoneyPin);
      if (!eMoneyPinResult.isValid) errors.eMoneyPin = eMoneyPinResult.error;
    } else {
      errors.eMoneyPin = "PIN is required";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
