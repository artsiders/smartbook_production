import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../feature/periode.slice';
import { getPeriode } from '../Fonction';

const TitleBar = ({ title, children }) => {
    const [hide, setHide] = useState(true)

    const selected = useSelector(state => state.periode.value)
    const dispatch = useDispatch()

    const format = (text) => {
        text = text.split(" ");
        return text[2] + "-" + text[5]
    }
    let selectText = format(getPeriode(selected))

    const showOption = () => {
        hide ? setHide(false) : setHide(true)
    }
    const checkOption = (e) => {
        setHide(true)
        dispatch(setSelected(parseInt(e.target.dataset.key)))
    }

    return (
        <div className="title_bar">
            <p>{title}</p>
            <div className="menu">
                <div className="select">
                    <div id="select_value" onClick={showOption}>
                        <span>{selectText}</span>
                        <i className={hide ? "fa fa-caret-down" : "fa fa-caret-down rotate"} id="arrow"></i>
                    </div>

                    <div id="list_option" onClick={checkOption} className={hide ? "hide" : ""}>
                        <div className="options" data-key="1">
                            <i style={selected === 1 ? { color: "var(--green)", fontSize: 15 } : {}} className='fas fa-circle'></i>
                            <span>fevrier-mars</span>
                        </div>
                        <div className="options" data-key="2">
                            <i style={selected === 2 ? { color: "var(--green)", fontSize: 15 } : {}} className='fas fa-circle'></i>
                            <span>mars-avril</span>
                        </div>
                        <div className="options" data-key="3">
                            <i style={selected === 3 ? { color: "var(--green)", fontSize: 15 } : {}} className='fas fa-circle'></i>
                            <span>avril-mai</span>
                        </div>
                        <div className="options" data-key="4">
                            <i style={selected === 4 ? { color: "var(--green)", fontSize: 15 } : {}} className='fas fa-circle'></i>
                            <span>mai-juin</span>
                        </div>
                        <div className="options" data-key="5">
                            <i style={selected === 5 ? { color: "var(--green)", fontSize: 15 } : {}} className='fas fa-circle'></i>
                            <span>juin-juillet</span>
                        </div>
                        <div className="options" data-key="6">
                            <i style={selected === 6 ? { color: "var(--green)", fontSize: 15 } : {}} className='fas fa-circle'></i>
                            <span>juillet-aougt</span>
                        </div>
                        <div className="options" data-key="7">
                            <i style={selected === 7 ? { color: "var(--green)", fontSize: 15 } : {}} className='fas fa-circle'></i>
                            <span>aougt-septembre</span>
                        </div>
                        <div className="options" data-key="8">
                            <i style={selected === 8 ? { color: "var(--green)", fontSize: 15 } : {}} className='fas fa-circle'></i>
                            <span>septembre-octobre</span>
                        </div>
                        <div className="options" data-key="9">
                            <i style={selected === 9 ? { color: "var(--green)", fontSize: 15 } : {}} className='fas fa-circle'></i>
                            <span>octobre-novembre</span>
                        </div>
                        <div className="options" data-key="10">
                            <i style={selected === 10 ? { color: "var(--green)", fontSize: 15 } : {}} className='fas fa-circle'></i>
                            <span>novembre-descembre</span>
                        </div>
                        <div className="options" data-key="11">
                            <i style={selected === 11 ? { color: "var(--green)", fontSize: 15 } : {}} className='fas fa-circle'></i>
                            <span>descembre-janvier</span>
                        </div>
                        <div className="options" data-key="12">
                            <i style={selected === 12 ? { color: "var(--green)", fontSize: 15 } : {}} className='fas fa-circle'></i>
                            <span>janvier-fevrier</span>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default TitleBar;
