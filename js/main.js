'use strict';
const $form = document.getElementById('entry-form');
const $titleInput = document.getElementById('title');
const $photoUrlInput = document.getElementById('photo-url');
const $notesInput = document.getElementById('notes');
const $photoPreview = document.getElementById('photo-preview');
const $entriesList = document.getElementById('entries-list');
const $newEntryButton = document.getElementById('new-entry');
const $entriesLink = document.getElementById('entries-link');
const $noEntries = document.getElementById('no-entries');
const $entryFormView = document.querySelector('[data-view="entry-form"]');
const $entriesView = document.querySelector('[data-view="entries"]');
$photoUrlInput.addEventListener('input', () => {
  const photoUrl = $photoUrlInput.value;
  $photoPreview.setAttribute('src', photoUrl);
});
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newEntry = {
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
function renderEntry(entry) {
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
function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
    $entriesList.classList.add('hidden');
  } else {
    $noEntries.classList.add('hidden');
    $entriesList.classList.remove('hidden');
  }
}
function viewSwap(view) {
  if (view === 'entry-form') {
    $entryFormView.classList.remove('hidden');
    $entriesView.classList.add('hidden');
  } else if (view === 'entries') {
    $entriesView.classList.remove('hidden');
    $entryFormView.classList.add('hidden');
  }
  data.view = view;
}
