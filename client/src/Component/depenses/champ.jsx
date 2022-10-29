import React, { useState } from 'react';
import axios from 'axios';
import moment from "moment";

const Champ = ({ data, getChamp }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [bar, setBar] = useState()
    const [restaurant, setRestaurant] = useState()
    const [hebergement, setHebergement] = useState()
    const [tcb, setTcb] = useState()
    const [facture, setFacture] = useState()
    const [maintenence, setMaintenence] = useState()
    const [salaire, setSalaire] = useState()
    const [autres, setAutres] = useState()

    const handleBar = (e) => {
        setBar(e.target.value)
    }
    const handleCuisine = (e) => {
        setRestaurant(e.target.value)
    }
    const HandleHebergement = (e) => {
        setHebergement(e.target.value)
    }
    const handleTcb = (e) => {
        setTcb(e.target.value)
    }
    const handleFacture = (e) => {
        setFacture(e.target.value)
    }
    const handleMaintenence = (e) => {
        setMaintenence(e.target.value)
    }
    const handleSalaire = (e) => {
        setSalaire(e.target.value)
    }
    const handleAutres = (e) => {
        setAutres(e.target.value)
    }

    const handleEdit = (id) => {
        const datas = {
            bar: bar,
            restaurant: restaurant,
            hebergement: hebergement,
            tcb: tcb,
            facture: facture,
            maintenence: maintenence,
            salaire: salaire,
            autres: autres,
        }
        axios.put(`/api/depenses/${id}`, datas)
            .then(data => {
                setIsEditing(false)
                setBar(undefined)
                setRestaurant(undefined)
                setHebergement(undefined)
                setTcb(undefined)
                setFacture(undefined)
                setMaintenence(undefined)
                setSalaire(undefined)
                setAutres(undefined)
                getChamp()
            }).catch(err => console.log(err))
    }

    return (
        <tr onDoubleClick={() => setIsEditing(true)}>
            {!isEditing ?
                <>
                    <td data-label="date" className='date'>{moment(data.date).format('DD_MMM_YY')}</td>
                    <td data-label="bar" className='snack'>{data.bar || "-"}</td>
                    <td data-label="cuisine" className='cuisine'>{data.restaurant || "-"}</td>
                    <td data-label="etage" className='etage'>{data.hebergement || "-"}</td>
                    <td data-label="Transp/Crédit" className='Transp'>{data.tcb || "-"}</td>
                    <td data-label="Factures" className='Factures'>{data.facture || "-"}</td>
                    <td data-label="Maintenance" className='Maintenance'>{data.maintenence || "-"}</td>
                    <td data-label="Salaires" className='Salaires'>{data.salaire || "-"}</td>
                    <td data-label="Autres" className='Autres'>{data.autres || "-"}</td>
                    <td
                        className='action'
                        onClick={() => setIsEditing(true)}
                        data-label="action">
                        <i className='far fa-edit'></i>
                    </td>

                </> : <>
                    <td data-label="date">
                        {moment(data.date).format('DD_MMM_YY')}
                    </td>
                    <td data-label="bar">
                        <input
                            type="number"
                            onChange={handleBar}
                            defaultValue={bar || data.bar === 0 ? "" : data.bar}
                            autoFocus
                            step={5}
                            placeholder='bar'
                        />
                    </td>
                    <td data-label="cuisine">
                        <input
                            type="number"
                            onChange={handleCuisine}
                            defaultValue={restaurant || data.restaurant === 0 ? "" : data.restaurant}
                            step={5}
                            placeholder='restaurant'
                        />
                    </td>
                    <td data-label="etage">
                        <input
                            type="number"
                            onChange={HandleHebergement}
                            defaultValue={hebergement || data.hebergement === 0 ? "" : data.hebergement}
                            step={5}
                            placeholder='hebergement'
                        />
                    </td>
                    <td data-label="Transp/Crédit">
                        <input
                            type="number"
                            onChange={handleTcb}
                            defaultValue={tcb || data.tcb === 0 ? "" : data.tcb}
                            step={5}
                            placeholder='transp-burau'
                        />
                    </td>
                    <td data-label="Factures">
                        <input
                            type="number"
                            onChange={handleFacture}
                            defaultValue={facture || data.facture === 0 ? "" : data.facture}
                            step={5}
                            placeholder='facture'
                        />
                    </td>
                    <td data-label="Maintenance">
                        <input
                            type="number"
                            onChange={handleMaintenence}
                            defaultValue={maintenence || data.maintenence === 0 ? "" : data.maintenence}
                            step={5}
                            placeholder='maintenence'
                        />
                    </td>
                    <td data-label="Salaires">
                        <input
                            type="number"
                            onChange={handleSalaire}
                            defaultValue={salaire || data.salaire === 0 ? "" : data.salaire}
                            step={5}
                            placeholder='salaire'
                        />
                    </td>
                    <td data-label="Autres Dépenses">
                        <input
                            type="number"
                            onChange={handleAutres}
                            defaultValue={autres || data.autres === 0 ? "" : data.autres}
                            step={5}
                            placeholder='autres'
                        />
                    </td>
                    <td
                        key={data._id}
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