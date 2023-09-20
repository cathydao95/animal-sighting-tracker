export const formatSightingDate = (dateString) => {
  const sightingDate = new Date(dateString);
  return sightingDate.toLocaleString();
};
