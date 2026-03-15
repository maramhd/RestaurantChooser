export const validateName = (name) => {
  if (!name || !name.trim()) return "Restaurant name is required";
  if (name.length < 2) return "Name must be at least 2 characters";
  if (!/^[a-zA-Z0-9\s,'-]*$/.test(name))
    return "Only letters, numbers, spaces, commas, apostrophes, and dashes are allowed";
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) return "Phone number is required";
  if (!/^[\d\s\+\-\(\)]+$/.test(phone)) return "Invalid phone number";
  if (phone.replace(/\D/g, "").length < 7) return "Phone number is too short";
  return null;
};

export const validateAddress = (address) => {
  if (!address || !address.trim()) return "Address is required";
  if (address.length < 5) return "Address is too short";
  return null;
};

export const validateWebsite = (website) => {
  if (!website || !website.trim()) return "Website is required";
  if (!/^[^\s]+\.[^\s]+$/.test(website))
    return "Invalid website (example: example.com)";
  return null;
};
