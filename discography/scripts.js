let albums = [];
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById("discographyGrid");
  console.log(grid);
  
  if (!grid) {
    console.error("discographyGrid not found! Check your HTML.");
    return; 
  }

  loadAlbums();  
  setupInfoButton();  
  setupOverlayExit();   
});

async function loadAlbums() {
  try {
    const response = await fetch('discography.json');
    albums = await response.json();
    buildGrid(); 
  } catch (error) {
    console.error("Error loading albums:", error);
  }
}

function buildGrid() {
  const grid = document.getElementById("discographyGrid");
console.log(grid); // Check if this logs the correct div


  albums.forEach(album => {
    const card = document.createElement('div');
    card.classList.add('albumCard');

    const cover = document.createElement('img');
    cover.src = album.cover;
    cover.alt = album.title;
    card.appendChild(cover);

    const border = document.createElement('img');
    border.src = getRandomBorder();
    border.alt = "Border";
    border.classList.add('borderImg'); 
    card.appendChild(border);

    const typeIcon = document.createElement('img');
    typeIcon.src = getTypeIcon(album.type);
    typeIcon.alt = album.type;
    typeIcon.classList.add('typeIcon');
    card.appendChild(typeIcon);

    card.addEventListener('click', () => {
      showOverlay(album, border.src);
    });

    grid.appendChild(card);
  });
}

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

function getTypeIcon(type) {
  if (!type) return "";
  type = type.toLowerCase();
  if (type === "feat" || type === "feature") return "assets/icons/caterpillar.png";
  if (type === "single") return "assets/icons/cocoon.png";
  if (type === "tape" || type === "album") return "assets/icons/butterfly.png";
  return "";
}

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

function showOverlay(album, borderSrc) {
  const overlay = document.getElementById('overlay');
  const overlayCover = document.getElementById('overlayCover');
  const songTitle = document.getElementById('songTitle');
  const releaseType = document.getElementById('releaseType');
  const additionalInfo = document.getElementById('additionalInfo');
  const streamingIcons = document.getElementById('streamingIcons');
  const artistAttribution = document.getElementById('artistAttribution');

  overlayCover.src = album.cover;
songTitle.textContent = album.title;
releaseType.textContent = `(${album.type})`;

  additionalInfo.textContent = album.notes || "";

  if (album.artist && (album.type.toLowerCase() === "feat" || album.type.toLowerCase() === "feature")) {
    artistAttribution.innerHTML = `by <a href="${album.artistLink || '#'}" target="_blank" style="color:rgb(216, 216, 216);">${album.artist}</a>`;
} else {
    artistAttribution.innerHTML = `by <span style="color:rgb(224, 224, 224);">changoos</span>`;
}


  streamingIcons.innerHTML = ""; 
  if (album.links) {
    ["youtube", "youtubevideo", "soundcloud", "genius", "spotify", "appleMusic"].forEach(platform => {
      if (album.links[platform]) {
        const a = document.createElement("a");
        a.href = album.links[platform];
        a.target = "_blank";
        a.classList.add(platform);
        streamingIcons.appendChild(a);
      }
    });
  }


  overlay.classList.remove("hidden");
  setTimeout(() => {
    overlay.classList.add("show");
  }, 10);
}

function setupOverlayExit() {
  const overlay = document.getElementById("overlay");
  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay" || e.target.id === "overlayExit") {
      overlay.classList.remove("show");
      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 500); 
    }
  });
}

