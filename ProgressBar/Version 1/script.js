const level = document.getElementById("level")
const exp = document.getElementById('exp')
const expBar = document.getElementById('expBar')
const titleDisplay = document.getElementById('title')

let profile = {
  Exp: 0,
  Level: 1,
  Title: "Noob",
}

let title = {
  Noob: 1,
  Beginner: 10,
  Amateur: 25,
  Experienced: 50,
  Expert: 100,
  Professional: 250,
}

let expToLevelUp = 100

function gainExp(amount) {
  profile.Exp += amount
  console.log(`Gained ${amount} Exp. Total Exp: ${profile.Exp}`)
  checkExp()
}

function levelUp() {
  profile.Level += 1
  console.log(`Leveled up! New level: ${profile.Level}`)
  expToLevelUp += 50
  updateTitle()
}

function checkExp() {
  if (profile.Exp >= expToLevelUp) {
    profile.Exp = 0

    levelUp()
  }
  const percentage = Math.max(0, Math.min(100, (profile.Exp / expToLevelUp) * 100))
  level.innerText = `Level: ${profile.Level}`
  expBar.style.width = `${percentage}%`
  exp.innerText = `${profile.Exp} / ${expToLevelUp}`
  setTimeout(checkExp)
}

function updateTitle() {
  let currentTitle = "Noob"
  for (const[titleName, levelRequirement] of Object.entries(title)) {
    if (profile.Level >= levelRequirement) {
      currentTitle = titleName
    }
  }

  if (profile.Title !== currentTitle) {
    profile.Title = currentTitle
    console.log(`Rank Up! Your new title is: ${profile.Title}`)
  }
  titleDisplay.innerText = `Title: ${currentTitle}`
}


setInterval(() => {
  gainExp(250)
}, 1000)