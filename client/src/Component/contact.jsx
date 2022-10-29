import React from 'react';

const Contact = () => {
    return (
        <div className="contacts">
            <h3>contacts de l'équipe de développement</h3>
            <div className="contact">
                <img src={`${process.env.PUBLIC_URL}images/whatsapp.svg`} alt="whatsapp" />
                <span>+237 682 696 734</span>
            </div>
            <div className="contact">
                <img src={`${process.env.PUBLIC_URL}images/telegram.svg`} alt="telegram" />
                <span>+237 682 696 734</span>
            </div>
            <div className="contact">
                <img src={`${process.env.PUBLIC_URL}images/facebook.svg`} alt="facebook" />
                <a target="_blank" rel="noreferrer" href='https://facebook.com/artsider'>facebook</a>
            </div>
            <div className="contact">
                <img src={`${process.env.PUBLIC_URL}images/youtube.svg`} alt="youtube" />
                <a target='_blank' rel="noreferrer" href="https://youtube.com/c/artsider99">youtube</a>
            </div>
        </div>
    )
}

export default Contact;