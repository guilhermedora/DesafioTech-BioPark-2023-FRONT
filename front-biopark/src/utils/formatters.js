export function capitalizeWord(word) {
  return word[0].toUpperCase() + word.slice(1, word.length);
}
export function formatToMoney(value) {
  return value.toLocaleString('pt-br',
    { style: 'currency', currency: 'BRL' }
  );
}