import React, { useState } from 'react';
import Bug from '../Component/bug';
import Suggest from '../Component/suggest';
import Vote from '../Component/vote';
import Contact from '../Component/contact';

const Helps = () => {
    const [option, setOption] = useState("bug")

    return (
        <div className="helps">
            <div className="title_bar">
                page d'aide
            </div>
            <div className="action">
                <button
                    className={option === "bug" ? "active" : ""}
                    onClick={() => setOption("bug")}
                >
                    <i className='far fa-thumbs-down'></i>
                    <span>signaler un bug</span>
                </button>
                <button
                    className={option === "suggest" ? "active" : ""}
                    onClick={() => setOption("suggest")}
                >
                    <i className='far fa-lightbulb'></i>
                    <span>proposer une amélioration</span>
                </button>
                <button
                    className={option === "vote" ? "active" : ""}
                    onClick={() => setOption("vote")}
                >
                    <i className='fas fa-heart'></i>
                    <span>votez pour une fontionalité que vous souhaiter</span>
                </button>
                <button
                    className={option === "contact" ? "active" : ""}
                    onClick={() => setOption("contact")}
                >
                    <i className='fas fa-phone-alt'></i>
                    <span>
                        contacter le  super administrateur
                    </span>
                </button>
            </div>
            <div className="controls">
                {option === "bug" && <Bug />}
                {option === "suggest" && <Suggest />}
                {option === "vote" && <Vote />}
                {option === "contact" && <Contact />}
            </div>
        </div>
    );
};

export default Helps;