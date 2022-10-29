import React, { useState } from 'react';
import axios from 'axios';

const Champ = ({ data, getChamp }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [state, setState] = useState({
        acompte: undefined,
        sanction: undefined,
        prime: undefined,
        net: undefined,
    })

    const handleAcomptes = (e) => {
        setState({ acompte: e.target.value })
    }
    const HandleSanction = (e) => {
        setState({ sanction: e.target.value })
    }
    const handlePrime = (e) => {
        setState({ prime: e.target.value })
    }
    const handleNet = (e) => {
        setState({ net: e.target.value })
    }

    const handleEdit = (id) => {
        const datas = {
            acomptes: state.acomptes,
            sanction: state.sanction,
            Prime: state.Prime,
            net: state.net,
        }
        axios.put(`/api/recettes/${id}`, datas)
            .then(data => {
                setIsEditing(false)
                setState({
                    acompte: undefined,
                    sanction: undefined,
                    prime: undefined,
                    net: undefined,
                })
                getChamp()
            }).catch(err => console.log(err))
    }
    return (
        <tr onDoubleClick={() => setIsEditing(true)}>
            {!isEditing ?
                <>
                    <td data-label="nom/premon">{data.emp_firstname + ' ' + data.emp_lastname}</td>
                    <td data-label="salaire">{data.salaire_base}</td>
                    <td data-label="Acomptes">{data.acomptes || "-"}</td>
                    <td data-label="Sanction">{data.sanction || "-"}</td>
                    <td data-label="Prime">{data.prime || "-"}</td>
                    <td data-label="Net">{data.net || "-"}</td>
                    <td
                        className='action'
                        onClick={() => setIsEditing(true)}
                        data-label="action">
                        <i className='far fa-edit'></i>
                    </td>
                </> : <>
                    <td data-label="nom/premon">
                        {data.emp_firstname + ' ' + data.emp_lastname}
                    </td>
                    <td data-label="salaire">
                        {data.salaire_base}
                    </td>
                    <td data-label="Acompte">
                        <input
                            type="number"
                            onChange={handleAcomptes}
                            defaultValue={state.acompte || data.acompte === 0 ? "" : data.acompte}
                            placeholder='Acompte'
                            step={5}
                        />
                    </td>
                    <td data-label="Sanction">
                        <input
                            type="number"
                            onChange={HandleSanction}
                            defaultValue={state.sanction || data.sanction === 0 ? "" : data.sanction}
                            placeholder='Sanction'
                            step={5}
                        />
                    </td>
                    <td data-label="Prime">
                        <input
                            type="text"
                            onChange={handlePrime}
                            defaultValue={state.prime || data.prime === 0 ? "" : data.prime}
                            id='Prime'
                            placeholder='Prime'
                        />
                    </td>
                    <td data-label="Net">
                        <input
                            type="text"
                            onChange={handleNet}
                            defaultValue={state.net || data.net === 0 ? "" : data.net}
                            id='Net'
                            placeholder='Net'
                        />
                    </td>

                    <td
                        className='action submit'
                        onClick={() => handleEdit(data._id)}
                        data-label="action">
                        <i className='fas fa-check'></i>
                    </td>
                </>}
        </tr>
    );
};

export default Champ;