document.addEventListener('DOMContentLoaded', () => {
  const $form = document.getElementById('entry-form') as HTMLFormElement;
  const $titleInput = document.getElementById('title') as HTMLInputElement;

  const $photoUrlInput = document.getElementById(
    'photo-url',
  ) as HTMLInputElement;
  const $notesInput = document.getElementById('notes') as HTMLTextAreaElement;
  const $photoPreview = document.getElementById(
    'photo-preview',
  ) as HTMLImageElement;

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

    $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();

    savedData();
  });
});
