
const form = document.getElementById('pinForm');
const pinUrl = document.getElementById('pinUrl');
const pinPreviews = document.getElementById('pinPreviews');

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch('https://script.google.com/macros/s/AKfycbxR8e3LRNeh6RciYlwqCfAcK-DFdiMHHknR8kKN7EpTeMvTvOPmTix4Bxyk88WPjcvG/exec', {
    method: 'POST',
    body: JSON.stringify({ url: pinUrl.value }),
    headers: { 'Content-Type': 'application/json' }
  }).then(() => {
    pinUrl.value = '';
    loadPreviews();
  });
});

function loadPreviews() {
  pinPreviews.innerHTML = 'Loading...';
  fetch('https://script.google.com/macros/s/AKfycbxR8e3LRNeh6RciYlwqCfAcK-DFdiMHHknR8kKN7EpTeMvTvOPmTix4Bxyk88WPjcvG/exec')
    .then(res => res.json())
    .then(data => {
      pinPreviews.innerHTML = '';
      data.reverse().forEach((pin, i) => {
        const id = pin.split('/').pop();
        const card = document.createElement('div');
        card.className = 'pin-card';
        card.innerHTML = `
          <iframe src="https://assets.pinterest.com/ext/embed.html?id=${id}" width="150" height="250" style="border:none;"></iframe>
          <button onclick="deletePin(${i})">Delete</button>
        `;
        pinPreviews.appendChild(card);
      });
    });
}

function deletePin(index) {
  fetch('https://script.google.com/macros/s/AKfycbxR8e3LRNeh6RciYlwqCfAcK-DFdiMHHknR8kKN7EpTeMvTvOPmTix4Bxyk88WPjcvG/exec?delete=' + index)
    .then(() => loadPreviews());
}

loadPreviews();
