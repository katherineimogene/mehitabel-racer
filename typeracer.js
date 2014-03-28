window.onload=function(){
  var view = new View()
  var game = new Game()
  var controller = new Controller(view,game)
  view.readyDom()
  document.addEventListener('keydown', function() { controller.keyDownEvent(event) } , false)
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

Controller = function(view,game) {
  this.view = view
  this.game = game
}

Controller.prototype = {

  captureInput: function(e) {
    return String.fromCharCode(e.keyCode || e.charCode)
  },

  rightEvent:  function(){
    this.resetMissedChar()
    this.view.addMatch(this.game.letterIndex)
    this.game.updateCounter("letterIndex")
  },

  resetMissedChar: function(){
    this.game.tempMissed = 0
    this.view.resetMissedCharText()
  },

  wrongEvent: function() {
    this.game.updateCounter("tempMissed")
    if (this.game.tempMissed >= 2) {
      this.view.showHint(this.game.letterIndex)
    }
    this.game.updateCounter("incorrect")
    this.view.showIncorrect(this.game.incorrect)
  },

  correctInput: function(e){
    return this.captureInput(e).toLowerCase() == this.view.expectedChar(this.game.letterIndex)
  },

  keyDownEvent: function(e) {
    e.preventDefault()
    this.correctInput(e) ? this.rightEvent() : this.wrongEvent()
  }
}

Game = function() {
  this.letterIndex = 0
  this.incorrect = 0
  this.tempMissed = 0
}

Game.prototype = {
  updateCounter: function( type ){
    this[type] += 1
  }
}






