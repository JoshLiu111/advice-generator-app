const diceBtn = document.getElementById("dice-btn");
const adviceText = document.getElementById("advice-text");
const adviceError = document.getElementById("advice-error");
const adviceId = document.getElementById("advice-id");
const API_URL = "https://api.adviceslip.com/advice";
const COOLDOWN_MS = 2000; // API caches advice for 2s

async function getAdvice(url) {
  diceBtn.disabled = true;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    adviceId.textContent = data.slip.id;
    adviceText.textContent = data.slip.advice;
    adviceError.hidden = true;
  } catch (err) {
    adviceError.textContent = "Oops! Couldn't load advice. Please try again.";
    adviceError.hidden = false;
  } finally {
    setTimeout(() => {
      diceBtn.disabled = false;
    }, COOLDOWN_MS);
  }
}

diceBtn.addEventListener("click", () => getAdvice(API_URL));
getAdvice(API_URL);
