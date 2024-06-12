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
const $title = document.querySelector('#form-header');
$photoUrlInput.addEventListener('input', () => {
  const photoUrl = $photoUrlInput.value;
  $photoPreview.setAttribute('src', photoUrl);
});
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const entryData = {
    title: $titleInput.value,
    photoUrl: $photoUrlInput.value,
    notes: $notesInput.value,
  };
  if (data.editing) {
    const editedEntry = {
      ...entryData,
      entryId: data.editing.entryId,
    };
    const index = data.entries.findIndex(
      (entry) => entry.entryId === data.editing.entryId,
    );
    if (index !== -1) {
      data.entries[index] = editedEntry;
      const $editedEntry = renderEntry(editedEntry);
      const $originalEntry = $entriesList.querySelector(
        `.entry-item[data-entry-id="${data.editing.entryId}"]`,
      );
      if ($originalEntry) {
        $originalEntry.replaceWith($editedEntry);
      }
      data.editing = null;
      $title.textContent = 'New Entry';
    }
  } else {
    const newEntry = {
      ...entryData,
      entryId: data.nextEntryId++,
    };
    data.entries.unshift(newEntry);
    const $entry = renderEntry(newEntry);
    $entriesList.prepend($entry);
  }
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
  $entryItem.className = 'entry-item row';
  $entryItem.setAttribute('data-entry-id', entry.entryId.toString());
  const $entryImage = document.createElement('div');
  $entryImage.className = 'entry-image li-half';
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $img.setAttribute('alt', 'Entry Image');
  $entryImage.appendChild($img);
  const $entryContent = document.createElement('div');
  $entryContent.className = 'entry-content li-half';
  const $title = document.createElement('h3');
  $title.textContent = entry.title;
  const $editIcon = document.createElement('i');
  $editIcon.className = 'fa-solid fa-pencil ';
  const $titleContainer = document.createElement('div');
  $titleContainer.className = 'row4';
  $titleContainer.appendChild($title);
  $titleContainer.appendChild($editIcon);
  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $entryContent.appendChild($titleContainer);
  $entryContent.appendChild($notes);
  $entryItem.appendChild($entryImage);
  $entryItem.appendChild($entryContent);
  return $entryItem;
}
const $ul = document.getElementById('entries-list');
$ul.addEventListener('click', (event) => {
  const $target = event.target;
  if ($target.tagName !== 'I') return;
  const $entryItem = $target.closest('.entry-item');
  const entryId = $entryItem.getAttribute('data-entry-id');
  if (entryId === null) throw new Error('entryId does not exist');
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === parseInt(entryId)) {
      data.editing = data.entries[i];
      break;
    }
  }
  if (data.editing) {
    $titleInput.value = data.editing.title;
    $photoUrlInput.value = data.editing.photoUrl;
    $notesInput.value = data.editing.notes;
    $photoPreview.setAttribute('src', data.editing.photoUrl);
    $title.textContent = 'Edit Entry';
    viewSwap('entry-form');
  }
});
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
