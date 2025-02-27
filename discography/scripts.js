// Global variable to store album data
let albums = [];

// When the page loads, run these functions
document.addEventListener('DOMContentLoaded', () => {
  loadAlbums();         // Fetch and display albums from JSON
  setupInfoButton();    // Set up the info button hover effect
  setupOverlayExit();   // Set up closing the overlay when clicked
});

// Function to load album data from discography.json
async function loadAlbums() {
  try {
    const response = await fetch('discography.json');
    albums = await response.json(); // Expecting an array of album objects
    buildGrid(); // After loading, build the grid view
  } catch (error) {
    console.error("Error loading albums:", error);
  }
}

// Build the grid of album covers
function buildGrid() {
  const grid = document.getElementById('discographyGrid');
  grid.innerHTML = ""; // Clear any existing content

  // Loop through each album in the JSON data
  albums.forEach(album => {
    // Create a container for each album (a card)
    const card = document.createElement('div');
    card.classList.add('albumCard');

    // Create the album cover image
    const cover = document.createElement('img');
    cover.src = album.cover;
    cover.alt = album.title;
    card.appendChild(cover);

    // Add a random hand-drawn border (choose one from 5 PNGs)
    const border = document.createElement('img');
    border.src = getRandomBorder();
    border.alt = "Border";
    border.classList.add('album-border');
    // Position this border using CSS (e.g., absolute positioning)
    card.appendChild(border);

    // Create the release type icon, but keep it hidden by default
    const typeIcon = document.createElement('img');
    typeIcon.src = getTypeIcon(album.type);
    typeIcon.alt = album.type;
    typeIcon.classList.add('typeIcon');
    card.appendChild(typeIcon);

    // When the album card is clicked, open the overlay with details
    card.addEventListener('click', () => {
      showOverlay(album, border.src);
    });

    // Add the album card to the grid
    grid.appendChild(card);
  });
}

// Helper: return a random border image path
function getRandomBorder() {
  const borders = [
    'assets/borders/border1.png',
    'assets/borders/border2.png',
    'assets/borders/border3.png',
    'assets/borders/border4.png',
    'assets/borders/border5.png'
  ];
  return borders[Math.floor(Math.random() * borders.length)];
}

// Helper: map the album type to an icon path
function getTypeIcon(type) {
  if (!type) return "";
  type = type.toLowerCase();
  if (type === "feat" || type === "feature") return "assets/icons/caterpillar.png";
  if (type === "single") return "assets/icons/cocoon.png";
  if (type === "tape" || type === "album") return "assets/icons/butterfly.png";
  return "";
}

// Set up the info button so that when you hover, the info box appears
function setupInfoButton() {
  const infoButton = document.getElementById('infoButton');
  const infoBox = document.getElementById('infoBox');
  infoButton.addEventListener('mouseover', () => {
    infoBox.classList.remove('hidden');
  });
  infoButton.addEventListener('mouseout', () => {
    infoBox.classList.add('hidden');
  });
}

// Show the overlay with detailed album information
function showOverlay(album, borderSrc) {
  const overlay = document.getElementById('overlay');
  const overlayCover = document.getElementById('overlayCover');
  const songTitle = document.getElementById('songTitle');
  const releaseType = document.getElementById('releaseType');
  const additionalInfo = document.getElementById('additionalInfo');
  const streamingIcons = document.getElementById('streamingIcons');
  const artistAttribution = document.getElementById('artistAttribution');

  // Set the large album cover and apply the border (you could use borderImage in CSS)
  overlayCover.src = album.cover;
  // For simplicity, we won’t change the border style dynamically here;
  // you can apply your border image using inline styles if desired.
  
  // Set the song title and release type (using your custom font)
  songTitle.textContent = album.title;
  releaseType.textContent = album.type;
  additionalInfo.textContent = album.notes || "";

  // Set the artist attribution below the cover
  if (album.artist && (album.type.toLowerCase() === "feat" || album.type.toLowerCase() === "feature")) {
    // For features, make the artist name a clickable link if provided
    artistAttribution.innerHTML = `by <a href="${album.artistLink || '#'}" target="_blank">${album.artist}</a>`;
  } else {
    artistAttribution.textContent = "by changoos";
  }

  // Build streaming/social icons based on album.links
  streamingIcons.innerHTML = ""; // Clear previous icons
  if (album.links) {
    // Only include known platforms
    ["spotify", "appleMusic", "youtube", "genius", "soundcloud"].forEach(platform => {
      if (album.links[platform]) {
        const a = document.createElement("a");
        a.href = album.links[platform];
        a.target = "_blank";
        a.classList.add(platform); // CSS will style these icons
        streamingIcons.appendChild(a);
      }
    });
  }

  // Fade in the overlay
  overlay.classList.remove("hidden");
  setTimeout(() => {
    overlay.classList.add("show");
  }, 10);
}

// Set up the overlay so that clicking anywhere on it closes it
function setupOverlayExit() {
  const overlay = document.getElementById("overlay");
  overlay.addEventListener("click", (e) => {
    // If you click on the overlay background (or the exit text), close the overlay
    if (e.target.id === "overlay" || e.target.id === "overlayExit") {
      overlay.classList.remove("show");
      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 500); // Wait for fade-out animation (matches CSS transition duration)
    }
  });
}
