import React, { useState } from 'react';

export default function Test() {
    const [msg, setMsg] = useState("")
    const handleClick = () => {
        fetch(`/api`)
            .then(response => response.json())
            .then(data => {
                setMsg(data.msg)
            })
            .catch(error => console.log(error))

    }
    return (
        <>
            <h1>Hello Art sider</h1>
            <button onClick={handleClick}>say message</button>
            <div>{msg}</div>
        </>
    );
}
