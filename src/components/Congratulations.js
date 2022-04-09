import { useSpring, animated } from 'react-spring';
import React, { useRef} from 'react';

export const Congratulations = ({ showModal, setShowModal }) => {

    const modalRef = useRef();

    const animation = useSpring({
        config: {
        duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });

    return (
        <>
        {showModal ? (
            <div className='tut-bg' ref={modalRef}>
            <animated.div style={animation}>
                <div className='tut-wrapper' showModal={showModal}>
                    <h2>Congratulations!</h2>
                    <p>To play again, please refresh the page.</p>
                </div>
            </animated.div>
            </div>
        ) : null}
        </>
    );
};