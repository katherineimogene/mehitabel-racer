window.onload=function(){
  gameTextDiv = document.getElementById('game-text')
  // this is currently a global variable. That's not great! even if you're code is dependent on a global, you should attempt to catch it above, with a variable definition like 'var gameTextDiv' at the top of the document. That way other files aren't affected by your (regrettable) global variable.
  gameText = gameTextDiv.innerText
  gameTextArr = gameText.split("")
  readyDom()
  // I appreciate that this is in its function.
  missedCharDiv = document.getElementById('missed-chars')
}

// you should scope this function. In general, you should use more vars.
readyDom = function() {
  // readyDom doesn't take any arguments, but it has secret parameters, "passed in"
  // through functional scope. This is dependent gameTextDiv and gameTextArr being global variables. What if both were stored in a View object that could be referenced?

   gameTextDiv.innerHTML = ""
  for (i=0; i<gameTextArr.length; i++){
    newSpan = document.createElement('span')
    newSpan.innerText = gameTextArr[i]
    gameTextDiv.appendChild(newSpan)
  }
}

// nicely done.
captureInput = function(e) {
  return String.fromCharCode(e.keyCode || e.charCode)
}

// oh cool more global variables.
counter = 0
incorrect = 0
tempMissed = 0

// well this is a ton of logic in a single function.
typeRace = function(e) {
    e.preventDefault()
    if (captureInput(e).toLowerCase() == gameTextArr[counter].toLowerCase()) {
      // super dependent on a ton of global variables. This should be moved into
      // a few separate functions, something like:
      // Controller.clearMissedChars()
      // Controller.updateGameText(Game.count)
      // Game.incrementCounter(),
      //
      // In general, I like my View class to only include setters and getters for the
      // DOM, with all the logic for interacting with the View handled in
      // the controller. A fatter View would be fine, however,.
      tempMissed = 0
      missedCharDiv.children[1].innerHTML = ""
      gameTextDiv.children[counter].classList.add('match')
      counter += 1
    } else {
    tempMissed += 1
    if (tempMissed >= 2) {
      // all the logic for hinting should probably be moved to another function.
      if ( gameTextArr[counter] == " " ) { charHint = "space" }
      else {
        charHint = gameTextArr[counter]
      }
      missedCharDiv.children[1].innerHTML = charHint
    }

    incorrect += 1
    missedCharDiv.children[0].innerHTML = incorrect

    }
}


// this should probably in your window.onload function, as its dependent on the document
// (not really, since the document loads before the script tag loads, but its still a
// good pattern to follow.)
// also: callbacks! you can rewrite this as the following:
// document.addEventListener('keydown',typeRace,false)
// e is passed to typeRace by the AddEventListener function when it hears a keyDown.
// you don't invoke it, because you are passing the function definition as the second
// argument of addEventListener.
document.addEventListener('keydown', function(e){
  typeRace(e)} , false)

// So this is really awesome! I mean you're terrible at programming, but you're getting
// better. the problem is that you're code is suuuuuper coupled. Here's how I imagine
// this working in OO.

// the Game is responsible for keeping track of the word, the end of the game, and
// where the counter is at any given point in time. It has no knowledge of the DOM.

// the View only knows how to get things from the DOM and set their html and class.
// it handles no logic other than that.

// the Controller handles all the logic in between. Every time Controller.typeRace()
// is fired, it goes through a logic sort of like this:
// ( Game.match(input) ) ? Controller.doSomething() : Controller.doSomethingElse()
