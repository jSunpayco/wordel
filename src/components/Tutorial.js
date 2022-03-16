import { useSpring, animated } from 'react-spring';
import React, { useRef, useEffect, useCallback } from 'react';
import * as AiIcons from 'react-icons/ai';

export const Tutorial = ({ showModal, setShowModal }) => {
    const styles = {
        topBtn: "top-button",
        close: "close"
    }
  
    const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {showModal ? (
        <div className='tut-bg' onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className='tut-wrapper' showModal={showModal}>
                <div className={`${styles.topBtn} ${styles.close}`}>
                    <AiIcons.AiOutlineCloseCircle style={{cursor: 'pointer'}} onClick={() => setShowModal(prev => !prev)}/>
                </div>
                <h2>Welcome to Wordel!</h2>
                <br></br>
                <p>This is a pet project created to replicate the famous game Wordle.</p>
                <br></br>
                <p>The aim of the player is to guess a five-letter word within six attempts. After each guess, the tiles  will change in color to provide you with certain hints.</p>
                <br></br>
                <img src={require('./temp.png')} className='tut-img' />
                <br></br>
                <p>Unlike the original game, users may guess multiple words per session.</p>
            </div>
          </animated.div>
        </div>
      ) : null}
    </>
  );
};