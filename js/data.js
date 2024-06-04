'use strict';
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
const savedDataString = localStorage.getItem('journalData');
if (savedDataString) {
  const savedData = JSON.parse(savedDataString);
  data = savedData;
}
window.addEventListener('beforeunload', () => {
  savedData();
});
function savedData() {
  localStorage.setItem('journalData', JSON.stringify(data));
}
