// Vide em 0:58:00 - 1:29:05 {useEffect}
import React, {useState, useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
// useHistory em 1:40:06
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './style.css';
import api from '../../services/api';

export default function Profile() {

    // 1:40:11
    const history = useHistory();
    
    // 1:31:08
    const [incidents, setIncidents] = useState([]);

    // 1:28:41 
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');


    // 1:29:00
    useEffect( () => {
        api.get('profile', { 
            headers: {
                Authorization: ongId,
            }
        }).then( response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (e) {
            alert( 'Erro ao deletar' );
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push( '/' );
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>
                    Bem vinda, {ongName}
                </span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={ handleLogout } type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                { incidents.map( incident => (

                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</p>

                        <button 
                            onClick={() => handleDeleteIncident(incident.id)}  
                            type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>

                ) ) }
            </ul>
        </div>
    );
}