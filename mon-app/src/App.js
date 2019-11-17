import React, {Component} from 'react';
import './App.scss';
import Keyboard from './components/keyboard/keyboard.component';
import Heart from "./components/heart/heart.component";
import CurrentWord from "./components/current_word/currentWord.component";

class App extends Component {

   state= {
      wordCollection: ["html","css","scss","php","javascript","script","react","frontend","developpement","coding","design","sculpture","adobe","drupal","laravel","github"],
      currentWord: null,
      alphabet: "abcdefghijklmnopqrstuvwxyz".toLocaleLowerCase().split(''),
      usedLetter: [],
      win: 0, // 0 => null / 1 => win / -1 => lose
      trys: 0,
      maxTrys: 5,
   };

   componentDidMount() {

      window.addEventListener("keyup", (event) => {
         if(event.key === 'Enter') {
            this.initGame();
         }
      });
   }

   clickLetter = (letter) => {

      if (this.state.usedLetter.indexOf(letter) ===  -1) {
         let trys = this.state.trys;
         const usedLetter = [letter, ...this.state.usedLetter];

         if (this.state.currentWord.indexOf(letter) === -1) {
            trys = this.state.trys +1;
            this.setState({trys})
         }

         let win = 1;

         for(let i = 0; i < this.state.currentWord.length; i++) {
            if (usedLetter.indexOf(this.state.currentWord[i]) === -1){
               win = 0
            }
         }

         if(trys >= this.state.maxTrys && win === 0){
            win = -1
         }

         this.setState({usedLetter, trys, win})
      }
   };

   pickNewWord = () => {
      const randomIndex = Math.floor(Math.random()* this.state.wordCollection.length);
      return this.state.wordCollection[ randomIndex]
   };

   initGame = () => {
      this.setState({
         currentWord: this.pickNewWord(),
         usedLetter:[],
         win:0,
         trys:0
         }
      )
   };

   render() {
      return(
         <div id="game">
            <h2>Trouver mes competences</h2>
            <h3>fait avec React.js</h3>

            {
               (this.state.currentWord !== null) &&
               <CurrentWord
                  currentWord={this.state.currentWord}
                  usedLetter={this.state.usedLetter}
                  win={this.state.win}
               />
            }

            {
               (this.state.currentWord !== null) &&
                  <Heart
                     trys={this.state.trys}
                     maxTrys={this.state.maxTrys}
                  />
            }

            {
               this.state.win === 1 &&
               <p className={"resultGameSentence"}>Félicitation vous avez gagné !</p>
            }
            {
               this.state.win === -1 &&
               <p className={"resultGameSentence"}>Quelle tristesse, vous avez perdu ! la bonne réponse était : {this.state.currentWord}</p>
            }

            {
               (this.state.win === 0 && this.state.currentWord !== null) &&
               <Keyboard
                  alphabet={this.state.alphabet}
                  usedLetter={this.state.usedLetter}
                  action={this.clickLetter}
               />
            }

            {
               (this.state.currentWord === null || this.state.win === 1 || this.state.win === -1) &&
               <button onClick={() => this.initGame()}>Nouvelle partie</button>
            }

         </div>
      );
   }
}

export default App;
