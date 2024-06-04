'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const $form = document.getElementById('entry-form');
  const $titleInput = document.getElementById('title');
  const $photoUrlInput = document.getElementById('photo-url');
  const $notesInput = document.getElementById('notes');
  const $photoPreview = document.getElementById('photo-preview');
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
    $photoPreview.src = 'images/placeholder-image-square.jpg';
    $form.reset();
    savedData();
  });
});
