import React from 'react'
import '../../App.scss'
import './currentWord.scss'


const CurrentWord =({currentWord, usedLetter, win}) => {

   return(
      <div id={"current_word"}>
      {currentWord.split('').map(
            (letter , key) => {
               let status= "finded";

               if (usedLetter.indexOf(letter) === -1) {
                  if(win === -1){
                     status = "loose"
                  } else {
                     status = "not Finded"
                  }
               }

               return <span key={"letter_" + key} className={status}>{status === "finded" ? letter : (win === -1 ? letter : " _ ")}</span>
            }
         )
      }
      </div>
   )
};

export default CurrentWord