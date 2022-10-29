import React from 'react';

const Bug = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <form className='bug' action="" onSubmit={handleSubmit}>
            <h3>vous avez eu un problème avec l'application ?</h3>
            <h4>décrivez le ici !</h4>
            <p>une aide vous sera fournit par le developpeur</p>
            <textarea placeholder='décrivez nous votre problème' name="message"></textarea>
            <button type='submit'>envoyer <i className='far fa-paper-plane'></i></button>
        </form>
    )
}

export default Bug;