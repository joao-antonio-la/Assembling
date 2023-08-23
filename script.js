//------------------------------------//
//           ABOUT THE CODE           //
//------------------------------------//

/*
  The whole code of this web game was developed by João Antônio Lopes Araújo.
  Git-hub profile: https://github.com/joao-antonio-la
  In the following code, was used cammelCase for convention of variables and function names.
*/


//------------------------------------//
//          GLOBAL VARIABLES          //
//------------------------------------//

//Variables used to keep track of the score://

let score = 0;
let scoreCount = document.getElementById("scoreCount");

//Variables used to keep track of item costs, quantities and values.//

//Simple Items: items that have unique aspects.//
//"Name": [Cost, Amount]//
let simpleItems = {
  multiplier: [15, 1],
  minigamesMultiplier: [250, 0]
}

//Idle Items: items that generate idle score.//
//"Name": [Cost, Amount, Score/s]//
let idleItems = {
  idle1: [250, 0, 1],
  idle2: [1500, 0, 15]
}


//------------------------------------//
//         MAIN EVENT LISTENER        //
//------------------------------------//

//This event listener keeps track of every click and identifies what item was clicked.//

document.addEventListener("click", function(event) {
  var clickedElement = event.target;
  var elementClass = clickedElement.className.split(" ")[0]; //Gets the first class of an element.//
  var elementId = clickedElement.id;
    if(elementClass == "purchasable"){  //Checks if the element is a purchasable item. If it is, the code proceeds for the purchase.//
      universalBuy(elementId);
    }
    if(elementId == "clickArea"){ //Checks if the element is the main click area. If it is, the code updates de score.//
      score += Object.entries(simpleItems)[0][1][1];
      scoreCount.innerHTML = "Score: " + score;
    }
});


//------------------------------------//
//              FUNCTIONS             //
//------------------------------------//

/*
 - Object.entries(itemsList)[index][index][index] -
It is an extensive line of code dedicated to accessing the dictionary.
It makes into the exact position of the item's characteristic, allowing modifications.
More usages of similar lines of code are present in this file.
*/

//Function dedicated to verify if the item is in an Idle Item or not.//
function isIdleItem(id){
  var isIdle = false;
  for(var i = 0; i < String(id).length; i++){
    var char = id[i];
    if(!isNaN(char)){
        isIdle = true;
        break;
    }
  }
  return isIdle;
}


//Function dedicated for procedure of buying a Simple Item.//
function simpleItemsBuy(id){
  var index = Object.keys(simpleItems).indexOf(id); //Localization of the item in the "simpleItems" dictionary.//

  //Cost modification.//
  Object.entries(simpleItems)[index][1][0] = Math.round(1.5 * Object.entries(simpleItems)[index][1][0]);
  var cost = Object.entries(simpleItems)[index][1][0];
  document.getElementById(id + "Cost").innerHTML = cost;

  //Quantities modification.//
  var amount = Object.entries(simpleItems)[index][1][1] += 1;
  document.getElementById(id + "Amount").innerHTML = amount;
}


//Function dedicated for procedure of buying an Idle Item.//
function idleItemsBuy(id){
  var index = Object.keys(idleItems).indexOf(id); //Localization of the item in the "idleItems" dictionary.//
  
  //Cost modification.//
  Object.entries(idleItems)[index][1][0] = Math.round(1.5 * Object.entries(idleItems)[index][1][0])
  var cost = Object.entries(idleItems)[index][1][0];
  document.getElementById(id + "Cost").innerHTML = cost;

  //Quantities modification.//
  var amount = Object.entries(idleItems)[index][1][1] += 1;
  document.getElementById(id + "Amount").innerHTML = amount;
}


//Checks if an item is affordable.//
function isAffordable(id){
  var cost = 0;
  var index = 0;
  if(isIdleItem(id)){
    index = Object.keys(idleItems).indexOf(id);
    cost = Object.entries(idleItems)[index][1][0];
    if(cost <= score){return true;}
  }
  else{
    index = Object.keys(simpleItems).indexOf(id);
    cost = Object.entries(simpleItems)[index][1][0];
    if(cost <= score){return true;}
  }
  return false;
}


//Function dedicated to decreasing the score when an item is bought.//
function decreaseScore(id){
  var cost = 0;
  var index = 0;
  if(isIdleItem(id)){
    index = Object.keys(idleItems).indexOf(id);
    cost = Object.entries(idleItems)[index][1][0];
  }
  else{
    index = Object.keys(simpleItems).indexOf(id);
    cost = Object.entries(simpleItems)[index][1][0];
  }
  score -= cost;
  scoreCount.innerHTML = "Score: " + score;
}


//Function made of a set of functions responsible for buying an item.//
function universalBuy(id){
  id = id.replace("Buy", ""); //Formats the id's string so the code accepts it.//
  if(isAffordable(id)){
    decreaseScore(id);
    if(isIdleItem(id)){
      idleItemsBuy(id);
    }
    else{
      simpleItemsBuy(id);
    }
  }
}
//The score is decreased before the purchase so it is guaranteed that the cost does not update before.//
//Otherwise, the cost would go up before the score get subtracted, so it would be charged more than the intended price.//


//Function dedicated to calculate the profit made from the Idle Items.//
function IdleProfit(){
  var sum = 0;
  for(var i = 0; i < Object.keys(idleItems).length; i++){
    sum += Object.entries(idleItems)[i][1][1] * Object.entries(idleItems)[i][1][2];
  }
  score += sum;
}


//Function dedicated to updating the score based on the Idle Profit.//
function updateScoreTotal(){
  IdleProfit();
  scoreCount.innerHTML = "Score: " + score;
}


//Function for starting the game time.//
setInterval(updateScoreTotal, 1000)
