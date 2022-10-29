import React from 'react';

const Suggest = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <form className='suggest' action="" onSubmit={handleSubmit}>
            <h3>avez vous des améliorations a nous proposer ?</h3>
            <p>vos suggessions nous permetrons d'ameliorer l'application 🙂</p>
            <textarea placeholder="exprimez vous!" name="message"></textarea>
            <button type='submit'>envoyer <i className='far fa-paper-plane'></i></button>
        </form>
    )
}

export default Suggest;