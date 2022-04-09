import React, { useEffect, useState } from 'react';
import data from './word-bank.json';
import * as IoIcons from 'react-icons/io5';
import { Congratulations } from './Congratulations.js';

function Rows() {

    var curr = 1;
    var limit = 5;
    var correct = 0;
    var wordPicked = data[Math.floor(Math.random()*data.length)];
    var myGuess = '';
    var backKey = '<path fill="none" stroke-linejoin="round" stroke-width="32" d="M135.19 390.14a28.79 28.79 0 0021.68 9.86h246.26A29 29 0 00432 371.13V140.87A29 29 0 00403.13 112H156.87a28.84 28.84 0 00-21.67 9.84v0L46.33 256l88.86 134.11z"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M336.67 192.33L206.66 322.34m130.01 0L206.66 192.33m130.01 0L206.66 322.34m130.01 0L206.66 192.33"></path>';
    var backKey1 = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linejoin="round" stroke-width="32" d="M135.19 390.14a28.79 28.79 0 0021.68 9.86h246.26A29 29 0 00432 371.13V140.87A29 29 0 00403.13 112H156.87a28.84 28.84 0 00-21.67 9.84v0L46.33 256l88.86 134.11z"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M336.67 192.33L206.66 322.34m130.01 0L206.66 192.33m130.01 0L206.66 322.34m130.01 0L206.66 192.33"></path></svg>';
    
    const uInn = (aKey) => {        
        if(curr <= limit){
            var cName = 'anItem' + curr;
            document.getElementById(cName).innerHTML = aKey;
            document.getElementById(cName).style.transition = 'border-color 0.2s';
            document.getElementById(cName).style.borderColor = 'black';
            curr = curr + 1;
            myGuess += aKey;
        }
    };

    const backInn = () => {
        if(curr > limit - 4){
            curr = curr - 1;
        }
        var cName = 'anItem' + curr;
        document.getElementById(cName).innerHTML = '';
        document.getElementById(cName).style.borderColor = 'rgb(173, 173, 173)';
        myGuess = myGuess.slice(0, -1);
    }

    const enterInn = () =>{
        if(!data.includes(myGuess)){
            console.log("Word not included in our dictionary");
            document.getElementById('hintBox').style.opacity = '1';
            document.getElementById('hintBox').style.visibility = 'visible';
            setTimeout(function(){
                document.getElementById('hintBox').style.transition = 'visibility 0s 1s, opacity 1s linear';
                document.getElementById('hintBox').style.visibility = 'hidden';
                document.getElementById('hintBox').style.opacity = '0';
            }, 3000);
        }
        else if(curr === limit+1){
            limit += 5;
        
            var point = 0;
            var guess = curr - 5;
            var dupWord = wordPicked;
            correct = 0;

            function myLoop() {
                setTimeout(function() {
                    var cName = 'anItem' + guess;
                    var testWord = document.getElementById(cName).innerHTML.toLowerCase();
                    if(testWord === dupWord[point]){
                        document.getElementById(cName).style.transition = 'all 0.4s';
                        document.getElementById(cName).style.backgroundColor = 'rgb(106, 170, 100)';
                        document.getElementById(cName).style.color = 'white';
                        document.getElementById(cName).style.borderColor = 'rgb(106, 170, 100)';
                        if(point < 5){
                            dupWord = dupWord.substring(0,point) + '.' + dupWord.substring(point+1);
                        }else{
                            dupWord = dupWord.substring(0,point) + '.';
                        }
                        correct+=1;
                    }
                    else if(dupWord.includes(testWord)){
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
                  }else{
                    myGuess = '';
                  }

                  if(correct === 5){
                      setShowModal(prev => !prev);
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
        else if(event.keyCode === 8){
            backInn();
        }
        else if(event.keyCode === 13){
            enterInn();
        }
    }

    const newSample = () => {
        console.log(wordPicked);
    }

    const keybaordPress = (event) => {
        if(event.target.innerHTML === backKey || event.target.innerHTML === backKey1){
            backInn();
        }
        else if(event.target.innerHTML === 'enter'){
            enterInn();
        }
        else{            
            uInn(event.target.innerHTML);
        }
    }

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        document.addEventListener("keydown", sampleKeyPress);
        return function cleanup() {
            document.removeEventListener("keydown", sampleKeyPress);
        }
    }, []);

    return(
        <div>
            <span className='hintBox' id='hintBox'>Word not in dictionary</span>
            <div className='bodyRows'>
                <div className='grid-container' id='aGrid'>
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
                <button onClick={(e) => newSample()}>Hit me</button>
            </div>
            <div className='kbRows'>
                <div className="kb-container">
                    <button onClick={(e) => keybaordPress(e)}>q</button>
                    <button onClick={(e) => keybaordPress(e)}>w</button>
                    <button onClick={(e) => keybaordPress(e)}>e</button>
                    <button onClick={(e) => keybaordPress(e)}>r</button>
                    <button onClick={(e) => keybaordPress(e)}>t</button>
                    <button onClick={(e) => keybaordPress(e)}>y</button>
                    <button onClick={(e) => keybaordPress(e)}>u</button>
                    <button onClick={(e) => keybaordPress(e)}>i</button>
                    <button onClick={(e) => keybaordPress(e)}>o</button>
                    <button onClick={(e) => keybaordPress(e)}>p</button>
                </div>
                <div className="kb-container">
                    <button onClick={(e) => keybaordPress(e)}>a</button>
                    <button onClick={(e) => keybaordPress(e)}>s</button>
                    <button onClick={(e) => keybaordPress(e)}>d</button>
                    <button onClick={(e) => keybaordPress(e)}>f</button>
                    <button onClick={(e) => keybaordPress(e)}>g</button>
                    <button onClick={(e) => keybaordPress(e)}>h</button>
                    <button onClick={(e) => keybaordPress(e)}>j</button>
                    <button onClick={(e) => keybaordPress(e)}>k</button>
                    <button onClick={(e) => keybaordPress(e)}>l</button>
                </div>
                <div className="kb-container">
                    <button onClick={(e) => keybaordPress(e)} className='bigger-btn'>enter</button>
                    <button onClick={(e) => keybaordPress(e)}>z</button>
                    <button onClick={(e) => keybaordPress(e)}>x</button>
                    <button onClick={(e) => keybaordPress(e)}>c</button>
                    <button onClick={(e) => keybaordPress(e)}>v</button>
                    <button onClick={(e) => keybaordPress(e)}>b</button>
                    <button onClick={(e) => keybaordPress(e)}>n</button>
                    <button onClick={(e) => keybaordPress(e)}>m</button>
                    <button onClick={(e) => keybaordPress(e)} className='bigger-btn' style={{fontSize: '20px'}}><IoIcons.IoBackspaceOutline/></button>
                </div>
            </div>

            <Congratulations showModal={showModal}/>
        </div>
    );
}

export default Rows;