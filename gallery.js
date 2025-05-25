
const gallery = document.getElementById('gallery');
fetch('https://script.google.com/macros/s/AKfycbxR8e3LRNeh6RciYlwqCfAcK-DFdiMHHknR8kKN7EpTeMvTvOPmTix4Bxyk88WPjcvG/exec')
  .then(response => response.json())
  .then(data => {
    gallery.innerHTML = '';
    data.reverse().forEach(pin => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://assets.pinterest.com/ext/embed.html?id=${pin.split('/').pop()}`;
      iframe.width = "236";
      iframe.height = "345";
      iframe.style.border = "none";
      gallery.appendChild(iframe);
    });
  })
  .catch(err => {
    gallery.innerHTML = "<p>Failed to load pins.</p>";
    console.error(err);
  });
