const play_btn = document.getElementById('play_btn')
const reset_btn = document.getElementById('reset_btn')
const rec_btn = document.getElementById('rec_btn')
const record_container = document.getElementById('record_container');
const time = document.getElementById('time')
let currentTime = 0
let timer_id = null;
let onRun = false
let hours = 0
let minutes = 0
let seconds = 0
let ms = 0

let totalMs = 0
let lastRecordMs = 0
let lapCount = 0

play_btn.addEventListener('click', () => {

  if (onRun === false) {
    onRun = true
    play_btn.innerText = 'Pause'
    play_btn.style.backgroundColor = 'red'
    
    timer_id = setInterval(() => {
      totalMs +=10
      ms += 1
      if (ms >= 100) {
        ms = 0;
        seconds += 1
      } else if (seconds >= 60) {
        seconds = 0
        minutes += 1
      } else if (minutes >= 60) {
        seconds = 0
        minutes = 0
        hours += 1
      }
      
      time.innerText =`${hours}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}.${ms.toString().padStart(2, '0')}`
    }, 10)
  } else {
    onRun = false
    play_btn.innerText = 'Play'
    play_btn.style.backgroundColor = 'limegreen'
    clearInterval(timer_id)
  }
})

reset_btn.addEventListener('click', () => {
  onRun = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  ms = 0;
  totalMs = 0;      
  lastRecordMs = 0; 
  lapCount = 0;     
  
  time.innerText = "0:00:00.00";
  record_container.innerHTML = ""; 
  
  play_btn.style.backgroundColor = 'limegreen';
  play_btn.innerText = 'Play';
  clearInterval(timer_id);
});


rec_btn.addEventListener('click', () => {
  if (!onRun) return;
  lapCount++;
  const currentLapMs = totalMs - lastRecordMs
  lastRecordMs = totalMs

  const overallTimeStr = formatTimeFromMs(totalMs);
  const lapTimeStr = formatTimeFromMs(currentLapMs);

  const newRow = document.createElement('div')
  newRow.classList.add('rank')
  newRow.innerHTML = `
    <p class="num">${lapCount}</p> 
    <p class="increase">+${lapTimeStr}</p>
    <p class="recorded">${overallTimeStr}</p>
  `
  record_container.appendChild(newRow)
})

function formatTimeFromMs(totalTimeMs) {
  let tempMs = Math.floor((totalTimeMs % 1000) / 10);
  let totalSeconds = Math.floor(totalTimeMs / 1000);
  let tempSeconds = totalSeconds % 60;
  let totalMinutes = Math.floor(totalSeconds / 60);
  let tempMinutes = totalMinutes % 60;
  let tempHours = Math.floor(totalMinutes / 60);

  return `${tempHours}:${tempMinutes.toString().padStart(2, '0')}:${tempSeconds.toString().padStart(2, '0')}.${tempMs.toString().padStart(2, '0')}`;
}






