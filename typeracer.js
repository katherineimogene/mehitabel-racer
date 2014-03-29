window.onload=function(){
  initialize()
}

var initialize = function(){
  var view = new View()
  var tracker = new Tracker()
  var game = new Game(view,tracker)
  view.readyDom()
  document.addEventListener('keydown', function() { game.keyDownEvent(event) } , false)
}

var View = function(){
  this.gameTextDiv = document.getElementById('game-text')
  this.gameText = this.gameTextDiv.innerText
  this.gameTextArr = this.gameText.split("")
  this.missedCharDiv = document.getElementById('missed-chars')
}

View.prototype = {
  readyDom: function(){
    this.gameTextDiv.innerHTML = ""
    for (i=0; i<this.gameTextArr.length; i++){
      newSpan = document.createElement('span')
      newSpan.innerText = this.gameTextArr[i]
      this.gameTextDiv.appendChild(newSpan)
    }
  },
  resetMissedCharText: function(){
    this.missedCharDiv.children[1].innerHTML = ""
  },

  isSpace: function(index){
    return this.expectedChar() == " "
  },

  showHint: function(index){
    if ( this.isSpace(index) ) {
      charHint = "space"
    } else {
      charHint = this.expectedChar(index)
    }
    this.missedCharDiv.children[1].innerHTML = charHint
  },

  showIncorrect: function(numIncorrect){
    this.missedCharDiv.children[0].innerHTML = numIncorrect
  },

  expectedChar: function(index) {
    return this.gameTextArr[index]
  },

  addMatch: function(index){
      this.gameTextDiv.children[index].classList.add('match')
  }
}

Game = function(view,tracker) {
  this.view = view
  this.tracker = tracker
}

Game.prototype = {

  captureInput: function(e) {
    return String.fromCharCode(e.keyCode || e.charCode)
  },

  rightEvent:  function(){
    this.resetMissedChar()
    this.view.addMatch(this.tracker.letterIndex)
    this.tracker.updateCounter("letterIndex")
  },

  resetMissedChar: function(){
    this.tracker.tempMissed = 0
    this.view.resetMissedCharText()
  },

  wrongEvent: function() {
    this.tracker.updateCounter("tempMissed")
    if (this.tracker.tempMissed >= 2) {
      this.view.showHint(this.tracker.letterIndex)
    }
    this.tracker.updateCounter("incorrect")
    this.view.showIncorrect(this.tracker.incorrect)
  },

  correctInput: function(e){
    return this.captureInput(e).toLowerCase() == this.view.expectedChar(this.tracker.letterIndex)
  },

  keyDownEvent: function(e) {
    e.preventDefault()
    this.correctInput(e) ? this.rightEvent() : this.wrongEvent()
  }
}

Tracker = function() {
  this.letterIndex = 0
  this.incorrect = 0
  this.tempMissed = 0
}

Tracker.prototype = {
  updateCounter: function( type ){
    this[type] += 1
  }
}






