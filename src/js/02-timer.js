// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

const btn = document.querySelector('[data-start]');

btn.setAttribute('disabled', true);

const daysT = document.querySelector('[data-days]');
const hoursT = document.querySelector('[data-hours]');
const minutesT = document.querySelector('[data-minutes]');
const secondsT = document.querySelector('[data-seconds]');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  enableSeconds: true,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      return Notiflix.Notify.failure("Please choose a date in the future");
    }
    
    btn.removeAttribute('disabled');
    btn.addEventListener('click', () => {
      setInterval(() => {
        if ((selectedDates[0] - new Date()) >= 0) {
          updateTimer(convertMs(selectedDates[0] - new Date()));
        }
      }, 1000);
    });
  },
};

flatpickr('#datetime-picker', options);



function updateTimer({ days, hours, minutes, seconds }) {
  daysT.textContent = `${days}`;
  hoursT.textContent = `${hours}`;
  minutesT.textContent = `${minutes}`;
  secondsT.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
