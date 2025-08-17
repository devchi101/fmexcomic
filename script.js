const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  toggle.textContent = document.body.classList.contains('light') ? '😈' : '🌙';
});

// Phantom Wallet integration
let walletAddress = null;
const walletButton = document.getElementById('wallet-button');
const statusEl = document.getElementById('status');

// Connect wallet function
async function connectWallet() {
  if (!window.solana || !window.solana.isPhantom) {
    alert("Phantom Wallet not found. Please install it.");
    return;
  }

  try {
    const response = await window.solana.connect();
    walletAddress = response.publicKey.toString();
    updateUI(true);
  } catch (err) {
    console.error("Connection error:", err);
    statusEl.textContent = "❌ Connection failed. Please try again.";
  }
}

// Update UI
function updateUI(connected) {
  if (connected && walletAddress) {
    const short = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
    walletButton.textContent = `Connected: ${short}`;
    statusEl.textContent = `✅ Connected to wallet`;
  }
}

// Set up button (only once)
walletButton.onclick = connectWallet;

// Auto-connect if trusted
window.addEventListener('load', async () => {
  if (window.solana?.isPhantom) {
    try {
      const response = await window.solana.connect({ onlyIfTrusted: true });
      walletAddress = response.publicKey.toString();
      updateUI(true);
    } catch (e) {
      // Silent if not connected
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // CONFESSION WALL
  const confessionInput = document.getElementById('confession-input');
  const confessionList = document.getElementById('confession-list');
  const submitConfession = document.getElementById('submit-confession');
  const toast = document.getElementById('toast');
  const toastSound = document.getElementById('toast-sound');

  const badWords = ['fuck', 'shit', 'bitch', 'asshole'];
  const maxLength = 280;

  function showToast(message = "Saved!") {
    toast.textContent = message;
    toast.classList.add('show');
    toastSound.play();
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  function loadConfessions() {
  confessionList.innerHTML = '';
  const confessions = JSON.parse(localStorage.getItem('confessions') || '[]');
  confessions.reverse().forEach(text => {
    const li = document.createElement('li');
    li.className = 'confession';
    li.textContent = text;
    confessionList.appendChild(li);
  });
}

  function saveConfession(text) {
    const confessions = JSON.parse(localStorage.getItem('confessions') || '[]');
    confessions.push(text);
    localStorage.setItem('confessions', JSON.stringify(confessions));
  }

  function containsBadWords(text) {
    return badWords.some(word => text.toLowerCase().includes(word));
  }

  function handleConfessionSubmit() {
    const text = confessionInput.value.trim();
    if (!text) return showToast("Confession can't be empty.");
    if (text.length > maxLength) return showToast(`Max ${maxLength} characters allowed.`);
    if (containsBadWords(text)) return showToast("Please avoid profanity.");

    saveConfession(text);
    confessionInput.value = '';
    loadConfessions();
    showToast("Confession posted.");
  }

  if (submitConfession) {
    submitConfession.addEventListener('click', handleConfessionSubmit);
    loadConfessions();
  }

});

// Scroll animation for fade-in
// Scroll animation using Intersection Observer
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate once
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-left, .fade-in-right').forEach(el => {
  observer.observe(el);
});

const phrases = [
  "💔 F*ck My Ex Coin ($FMEX)",
  "Turning Heartbreak Into Gains 💰",
  "Stake. Meme. Earn. Repeat"
];

const typingText = document.getElementById("typingText");

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let speed = 50;

function type() {
  const currentPhrase = phrases[phraseIndex];
  const currentText = currentPhrase.substring(0, charIndex);

  typingText.textContent = currentText;

  if (!isDeleting && charIndex < currentPhrase.length) {
    charIndex++;
    speed = 80;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    speed = 50;
  } else {
    if (!isDeleting) {
      isDeleting = true;
      speed = 2000; // pause before deleting
    } else {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 500;
    }
  }

  setTimeout(type, speed);
}

document.addEventListener("DOMContentLoaded", () => {
  type();
});

document.addEventListener("DOMContentLoaded", () => {
  const bubbles = ["💥 POW!", "🔥 BAM!", "⚡ ZAP!", "🌟 WOW!", "💣 BOOM!", "✨ WHAM!"];
  const colors = ["#ff1744", "#ff9100", "#ffea00", "#00e5ff", "#d500f9", "#00c853"];

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    card.setAttribute("data-bubble", randomBubble);
    card.style.setProperty("--bubble-color", randomColor);
  });
});
