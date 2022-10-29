import React, { useState } from 'react';
import axios from 'axios';
import moment from "moment";

const Champ = ({ data, getChamp }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [vercement, setVercement] = useState()
    const [credit, setCredit] = useState()
    const [recouvrement, setRecouvrement] = useState()
    const [observation, setObservation] = useState()

    const handleVercement = (e) => {
        setVercement(e.target.value)
    }
    const handleCredit = (e) => {
        setCredit(e.target.value)
    }
    const HandleRecouvrement = (e) => {
        setRecouvrement(e.target.value)
    }
    const handleObservation = (e) => {
        setObservation(e.target.value)
    }

    const handleEdit = (id) => {
        const datas = {
            vercement: vercement,
            credit: credit,
            recouvrement: recouvrement,
            observation: observation,
        }
        axios.put(`/api/recettes/${id}`, datas)
            .then(data => {
                setIsEditing(false)
                setVercement(undefined)
                setCredit(undefined)
                setRecouvrement(undefined)
                setObservation(undefined)
                getChamp()
            }).catch(err => console.log(err))
    }
    return (
        <tr onDoubleClick={() => setIsEditing(true)}>
            {!isEditing ?
                <>
                    <td data-label="date" className='date'>{moment(data.date).format('DD_MMM_YY')}</td>
                    <td data-label="vercements" className='vercements'>{data.vercement || "-"}</td>
                    <td data-label="credits" className='credit'>{data.credit || "-"}</td>
                    <td data-label="recouverments" className='recouverments'>{data.recouvrement || "-"}</td>
                    <td data-label="Observations" className='observations'>{data.observation || "-"}</td>
                    <td
                        data-label="action"
                        className='action'
                        onClick={() => setIsEditing(true)}
                    >
                        <i className='far fa-edit'></i>
                    </td>
                </> : <>
                    <td data-label="date">
                        {moment(data.date).format('DD_MMM_YY')}
                    </td>
                    <td data-label="vercements">
                        <input
                            type="number"
                            onChange={handleVercement}
                            defaultValue={vercement || data.vercement === 0 ? "" : data.vercement}
                            placeholder='vercement'
                            autoFocus
                            step={5}
                        />
                    </td>
                    <td data-label="credits">
                        <input
                            type="number"
                            onChange={handleCredit}
                            defaultValue={credit || data.credit === 0 ? "" : data.credit}
                            placeholder='credit'
                            step={5}
                        />
                    </td>
                    <td data-label="recouverments">
                        <input
                            type="number"
                            onChange={HandleRecouvrement}
                            defaultValue={recouvrement || data.recouvrement === 0 ? "" : data.recouvrement}
                            placeholder='recouvrement'
                            step={5}
                        />
                    </td>
                    <td data-label="Observations">
                        <input
                            type="text"
                            onChange={handleObservation}
                            defaultValue={observation || data.observation === 0 ? "" : data.observation}
                            id='observation'
                            placeholder='observation'
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