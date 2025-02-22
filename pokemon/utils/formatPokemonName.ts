export const formatPokemonName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[é]/g, 'e')  // Replace é with e
    .replace(/[^a-z0-9]/g, ''); // Remove any other special characters
}; 