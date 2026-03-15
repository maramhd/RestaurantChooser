export const validateFirstName = (name) => {
  if (!name || !name.trim()) return "First name is required";
  if (name.length < 2) return "Must be at least 2 characters";
  return null;
};

export const validateLastName = (name) => {
  if (!name || !name.trim()) return "Last name is required";
  if (name.length < 2) return "Must be at least 2 characters";
  return null;
};
