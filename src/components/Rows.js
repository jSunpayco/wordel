import React, { useEffect } from 'react';
import data from './word-bank.json';

function Rows() {
    
    var curr = 1;
    var limit = 5;
    var wordPicked = data[Math.floor(Math.random()*data.length)];

    const uInn = (aKey) => {        
        if(curr <= limit){
            var cName = 'anItem' + curr;
            document.getElementById(cName).innerHTML = aKey;
            document.getElementById(cName).style.transition = 'border-color 0.2s';
            document.getElementById(cName).style.borderColor = 'black';
            curr = curr + 1;
        }
    };

    const backInn = () => {
        if(curr > limit - 4){
            curr = curr - 1;
        }
        var cName = 'anItem' + curr;
        document.getElementById(cName).innerHTML = '';
        document.getElementById(cName).style.borderColor = 'rgb(173, 173, 173)';
    }

    const enterInn = () =>{ // if multiple letters maybe use hashmap containing count of letters in the word.
        if(curr == limit+1){
            limit += 5;
        
            var point = 0;
            var guess = curr - 5;

            function myLoop() {
                setTimeout(function() {
                    var cName = 'anItem' + guess;
                    if(document.getElementById(cName).innerHTML == wordPicked[point]){
                        document.getElementById(cName).style.transition = 'all 0.4s';
                        document.getElementById(cName).style.backgroundColor = 'rgb(106, 170, 100)';
                        document.getElementById(cName).style.color = 'white';
                        document.getElementById(cName).style.borderColor = 'rgb(106, 170, 100)';
                    }
                    else if(wordPicked.includes(document.getElementById(cName).innerHTML)){
                        document.getElementById(cName).style.transition = 'all 0.4s';
                        document.getElementById(cName).style.backgroundColor = 'rgb(201, 180, 88)';
                        document.getElementById(cName).style.color = 'white';
                        document.getElementById(cName).style.borderColor = 'rgb(201, 180, 88)';
                    }
                    else{
                        document.getElementById(cName).style.transition = 'all 0.4s';
                        document.getElementById(cName).style.backgroundColor = 'rgb(120, 124, 126)';
                        document.getElementById(cName).style.color = 'white';
                        document.getElementById(cName).style.borderColor = 'rgb(120, 124, 126)';
                    }
                  point++; 
                  guess++;
                  if (point < 5 && guess <= limit-5) {
                    myLoop(); 
                  }
                }, 250)
            }

            myLoop();
        }
    }

    const sampleKeyPress = (event) => {
        if((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)){
            uInn(event.key);
        }
        else if(event.keyCode == 8){
            backInn();
        }
        else if(event.keyCode == 13){
            enterInn();
        }
    }

    const newSample = () => {
        var i;
        for(i = 0; i < wordPicked.length; i++){
            console.log(wordPicked[i]);
        }
        
    }

    useEffect(() => {
        document.addEventListener("keydown", sampleKeyPress);
    });

    return(
        <div className='bodyRows'>
            <div class="grid-container" id='aGrid'>
                <div id='anItem1'></div>
                <div id='anItem2'></div>
                <div id='anItem3'></div>  
                <div id='anItem4'></div>
                <div id='anItem5'></div>
                <div id='anItem6'></div>
                <div id='anItem7'></div>
                <div id='anItem8'></div>
                <div id='anItem9'></div>
                <div id='anItem10'></div>
                <div id='anItem11'></div>
                <div id='anItem12'></div>
                <div id='anItem13'></div>
                <div id='anItem14'></div>
                <div id='anItem15'></div>
                <div id='anItem16'></div>
                <div id='anItem17'></div>
                <div id='anItem18'></div>
                <div id='anItem19'></div>
                <div id='anItem20'></div>
                <div id='anItem21'></div>
                <div id='anItem22'></div>
                <div id='anItem23'></div>
                <div id='anItem24'></div>
                <div id='anItem25'></div>
                <div id='anItem26'></div>
                <div id='anItem27'></div>
                <div id='anItem28'></div>
                <div id='anItem29'></div>
                <div id='anItem30'></div>
            </div>
            <button onClick={newSample}>Hit me</button>
        </div>
    );
}

export default Rows;