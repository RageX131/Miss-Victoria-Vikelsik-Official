const sheetAPI = "https://script.google.com/macros/s/AKfycbxR8e3LRNeh6RciYlwqCfAcK-DFdiMHHknR8kKN7EpTeMvTvOPmTix4Bxyk88WPjcvG/exec";

async function submitPin() {
  const pinUrl = document.getElementById("pinUrl").value.trim();
  if (!pinUrl.includes("pinterest.com/pin/")) {
    document.getElementById("status").innerText = "Invalid Pinterest link.";
    return;
  }
  document.getElementById("status").innerText = "Submitting...";
  try {
    const response = await fetch(sheetAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: pinUrl }),
    });
    const result = await response.text();
    document.getElementById("status").innerText = result;
    loadPins();
  } catch (error) {
    document.getElementById("status").innerText = "Error submitting pin.";
  }
}

async function loadPins() {
  const preview = document.getElementById("pin-preview");
  preview.innerHTML = "Loading...";
  try {
    const response = await fetch(sheetAPI);
    const data = await response.json();
    preview.innerHTML = "";
    data.reverse().forEach(pin => {
      const pinId = pin.url.split("/pin/")[1].split("/")[0];
      const div = document.createElement("div");
      div.className = "pin-preview";
      div.innerHTML = `
        <iframe src="https://assets.pinterest.com/ext/embed.html?id=${pinId}" frameborder="0"></iframe>
        <button onclick="deletePin('${pin.url}')">Delete</button>
      `;
      preview.appendChild(div);
    });
  } catch (error) {
    preview.innerHTML = "Failed to load pins.";
  }
}

async function deletePin(url) {
  const confirmed = confirm("Are you sure you want to delete this pin?");
  if (!confirmed) return;
  try {
    await fetch(sheetAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ delete: url }),
    });
    loadPins();
  } catch (error) {
    alert("Failed to delete pin.");
  }
}

window.onload = loadPins;
