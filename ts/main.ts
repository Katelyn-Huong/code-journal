const $form = document.getElementById('entry-form') as HTMLFormElement;
const $titleInput = document.getElementById('title') as HTMLInputElement;
const $photoUrlInput = document.getElementById('photo-url') as HTMLInputElement;
const $notesInput = document.getElementById('notes') as HTMLTextAreaElement;
const $photoPreview = document.getElementById(
  'photo-preview',
) as HTMLImageElement;
const $entriesList = document.getElementById(
  'entries-list',
) as HTMLUListElement;

const $newEntryButton = document.getElementById(
  'new-entry',
) as HTMLButtonElement;
const $entriesLink = document.getElementById(
  'entries-link',
) as HTMLAnchorElement;

const $noEntries = document.getElementById('no-entries') as HTMLElement;

const $entryFormView = document.querySelector(
  '[data-view="entry-form"]',
) as HTMLElement;
const $entriesView = document.querySelector(
  '[data-view="entries"]',
) as HTMLElement;

$photoUrlInput.addEventListener('input', () => {
  const photoUrl = $photoUrlInput.value;
  $photoPreview.setAttribute('src', photoUrl);
});

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const newEntry: JournalEntry = {
    entryId: data.nextEntryId,
    title: $titleInput.value,
    photoUrl: $photoUrlInput.value,
    notes: $notesInput.value,
  };

  data.entries.unshift(newEntry);
  data.nextEntryId++;

  const $entry = renderEntry(newEntry);
  $entriesList.prepend($entry);

  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

  savedData();
  toggleNoEntries();
  viewSwap('entries');
});

document.addEventListener('DOMContentLoaded', () => {
  data.entries.forEach((entry) => {
    const $entry = renderEntry(entry);
    $entriesList.appendChild($entry);
  });

  toggleNoEntries();
  viewSwap(data.view);
});

if (!$entriesLink) throw new Error('error querying $entriesLink');
$entriesLink.addEventListener('click', (event) => {
  event.preventDefault();
  viewSwap('entries');
});
if (!$newEntryButton) throw new Error('error querying $newEntryButton');
$newEntryButton.addEventListener('click', (event) => {
  event.preventDefault();
  viewSwap('entry-form');
});

function renderEntry(entry: JournalEntry): HTMLElement {
  const $entryItem = document.createElement('li');
  $entryItem.className = 'entry-item';

  const $entryImage = document.createElement('div');
  $entryImage.className = 'entry-image';
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $img.setAttribute('alt', 'Entry Image');
  $entryImage.appendChild($img);

  const $entryContent = document.createElement('div');
  $entryContent.className = 'entry-content';
  const $title = document.createElement('h3');
  $title.textContent = entry.title;
  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $entryContent.appendChild($title);
  $entryContent.appendChild($notes);

  $entryItem.appendChild($entryImage);
  $entryItem.appendChild($entryContent);

  return $entryItem;
}

function toggleNoEntries(): void {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
    $entriesList.classList.add('hidden');
  } else {
    $noEntries.classList.add('hidden');
    $entriesList.classList.remove('hidden');
  }
}

function viewSwap(view: string): void {
  if (view === 'entry-form') {
    $entryFormView.classList.remove('hidden');
    $entriesView.classList.add('hidden');
  } else if (view === 'entries') {
    $entriesView.classList.remove('hidden');
    $entryFormView.classList.add('hidden');
  }

  data.view = view;
}
