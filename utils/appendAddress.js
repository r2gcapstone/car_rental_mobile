const appendAddress = (address) => {
  const appendedAddress = [
    address.streetName,
    address.houseNumber,
    address.barangay.name,
    address.municipality.name,
    address.zipCode,
    address.province.name,
  ]
    .filter(Boolean)
    .join(", ");

  return appendedAddress;
};

export default appendAddress;
