function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let setId = null;

const refs = {
    buttonClick: document.querySelector(`body`),
    buttonStart: document.querySelector(`button[data-start]`),
    buttonStop: document.querySelector(`button[data-stop]`),
}

refs.buttonClick.addEventListener(`click`, e => {
    
  if (e.target.hasAttribute('data-start')) {
    setId = setInterval(() => {
    refs.buttonClick.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.buttonStart.disabled = true;
  }
  if (e.target.hasAttribute('data-stop')) {
    clearInterval(setId);
    refs.buttonStart.disabled = false;
  }
});