export const validateCountries = (sourceCountry: string, destinationCountry: string): string | null => {
  if (!sourceCountry || !destinationCountry) {
    return "Please select source and destination country";
  }
  if (sourceCountry === destinationCountry) {
    return "Source and destination country must be different";
  }
  return null;
};
