/* exported data */
interface JournalEntry {
  entryId: number;
  title: string;
  photoUrl: string;
  notes: string;
}

interface dataInterface {
  view: string;
  entries: JournalEntry[];
  editing: JournalEntry | null;
  nextEntryId: number;
}
let data: dataInterface = {
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

function savedData(): void {
  localStorage.setItem('journalData', JSON.stringify(data));
}
