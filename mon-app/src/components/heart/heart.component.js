import React from 'react'
import '../../App.scss'
import './heart.scss'


const Heart = ({trys , maxTrys}) => {
   return (
      <div id={"life"} >{
         trysToHeart(trys, maxTrys).map(
            (value , key ) => {
               return <span
                  key={"heart_" + key}
                  className={"heart " + (value === 1 ? "isFull" : "isEmpty")}
               ></span>
            }
         )
      }
      </div>
   )
};

function trysToHeart(trys, maxTrys) {
   let hearts =[];
   for(let i = 1; i <= maxTrys; i++){
      if(i <= trys) {
         hearts.push(0)
      } else {
         hearts.push(1)
      }
   }
   return hearts
}



export default Heart