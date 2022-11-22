export function setupCounter(btnEl, countEl) {
  let counter = 0;
  const setCounter = (count) => {
    counter = count;
    countEl.textContent = counter;
  };
  btnEl.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}
