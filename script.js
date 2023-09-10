// CONSTANTS THAT REPRESENT HTML ELEMENTS
const clickArea = document.getElementById("click-area");
const scoreCount = document.getElementById("score-count");

const idleButtons = document.querySelectorAll(".idle-buy");
const buffsButtons = document.querySelectorAll(".buff-buy");


//VARIABLES THAT REPRESENT GAME ASPECTS AND THEIR VALUES
let score = 0;
let multiplier = 1;

let idleIncomes = {
    idle1: {
        price: 250,
        income: 1, 
        amount: 0
    },
    idle2: {
        price: 1500,
        income: 15,
        amount: 0
    },
    idle3: {
        price: 0,
        income: 0,
        amount: 0
    },
    idle4: {
        price: 0,
        income: 0,
        amount: 0
    }
}

let buffs = {
    buff1: {
        price: 15,
        action: function(){
            multiplier += 2;
        }
    },
    buff2: {
        price: 0,
        action: function(){
            
        }
    },
    buff3: {
        price: 0,
        action: function(){
            
        }
    },
    buff4: {
        price: 0,
        action: function(){
            
        }
    }
}


//FUNCTIONS THAT UPDATE THE HTML ELEMENTS
function idleStatsUpdate(element){
    document.getElementById(element + "-cost").innerHTML = idleIncomes[element]['price'];
    document.getElementById(element + "-amount").innerHTML = idleIncomes[element]['amount'];
    document.getElementById(element + "-production").innerHTML = idleIncomes[element]['income'];
    document.getElementById(element + "-total-profit").innerHTML = idleIncomes[element]['income'] * idleIncomes[element]['amount'];
}

function buffStatsUpdate(element){
    document.getElementById(element + "-cost").innerHTML = buffs[element]['price'];
}

function updateDisplayScore(){
    scoreCount.innerHTML = (score);
}

function updateIdleProfit(){
    Object.keys(idleIncomes).forEach(function(key){
        score += idleIncomes[key]['income'] * idleIncomes[key]['amount'];
    });
    updateDisplayScore();
}

//EVENT LISTENERS THAT TRIGGER THE FUNCTIONS
clickArea.addEventListener("click", function() {
    score += multiplier;
    updateDisplayScore();
    scoreCount.setAttribute("title", score);
});

idleButtons.forEach(function(element) {
    element.addEventListener('click', function() {
        var item = element.value
        Object.keys(idleIncomes).forEach(function(key){
            if(item == key){
                if(score >= idleIncomes[key]['price']){
                    score -= idleIncomes[key]['price'];
                    idleIncomes[key]['amount'] += 1;
                    idleIncomes[key]['price'] = Math.round(idleIncomes[key]['price'] * 1.5);
                    idleStatsUpdate(item);
                    updateDisplayScore();
                }
            }
        });
    });
});

buffsButtons.forEach(function(element) {
    element.addEventListener('click', function() {
        var item = element.value
        console.log(item);
        Object.keys(buffs).forEach(function(key){
            if(item == key){
                if(score >= buffs[key]['price']){
                    score -= buffs[key]['price'];
                    buffs[key]['action']();
                    buffs[key]['price'] = Math.round(buffs[key]['price'] * 1.5);
                    buffStatsUpdate(item);
                    updateDisplayScore();
                }
            }
        });
    });
});

//FUNCTIONS THAT STARTS THE GAME
Object.keys(idleIncomes).forEach(function(key){
    idleStatsUpdate(key);
});

Object.keys(buffs).forEach(function(key){
    buffStatsUpdate(key);
});

setInterval(updateIdleProfit, 1000);