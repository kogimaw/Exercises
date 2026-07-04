// Reference
const progressBars = document.querySelectorAll('.progress-bar')
const level_text = document.getElementById('level')

// Player Data
let player = {
  Level: 1,
  Exp: 0,
  MaxExp: 100,

  Health: 240,
  MaxHealth: 250,
  Mana: 78,
  MaxMana: 150,

  HealthRegen: 2,
  ManaRegen: 1,

  /* 
  AttackDamage: 0,
  Defense: 0,
  */

  Growth: {
    Health: 5,
    Mana: 1,
  }
}

// Update HUD UI's
function updateHUD() {
  progressBars.forEach(barContainer => {
    const statType = barContainer.getAttribute('data-stat');
    const current = player[statType];
    const max = player[`Max${statType}`];
    const percentage = Math.max(0, Math.min(100, (current / max) * 100));
    const filler = barContainer.querySelector('.filler');
    const valueText = barContainer.querySelector('.value');
    filler.style.width = `${percentage}%`;
    valueText.textContent = `${current} / ${max}`;
  }); requestAnimationFrame(updateHUD);
}

requestAnimationFrame(updateHUD);
let regenH = null
let regenM = null

function regenHP() {
  if (player.Health >= player.MaxHealth || player.Health <=0) return
  if (regenH !== null) return
  regenH = setInterval(() => {
    player.Health += player.HealthRegen
    if (player.Health >= player.MaxHealth) {
      player.Health >= player.MaxHealth
      clearInterval(regenH)
      regenH = null
    }
  }, 1000)
}

function regenMP() {
  if (player.Mana > player.MaxMana || player.Mana <=0) return
  if (regenM !== null) return
  regenM = setInterval (() => {
    player.Mana += player.ManaRegen
    if (player.Mana >= player.MaxMana) {
      player.Mana = player.MaxMana
      clearInterval(regenM)
      regenM = null
    }
  },1000)
}

// Damage Received (Global)
function damageReceived(amount) {
  player.Health -= amount;
  if (player.Health < 0) player.Health = 0;
  console.log(`Damage Dealt: ${amount} | Health: ${player.Health} / ${player.MaxHealth}`);
}

function levelUp() {
  if (player.Exp >= player.MaxExp) {
    player.Exp = 0
    player.MaxExp *= 1.25
    player.Level += 1
    player.MaxHealth += player.Growth.Health
    player.MaxMana += player.Growth.Mana
  }
}
function gainExp(amount) {
    player.Exp += amount
    levelUp()
}

/* setInterval(() => {
  gainExp(10)
  levelUp()
  regenHP();regenMP();
  level_text.textContent = `Level: ${player.Level}`
},) */



