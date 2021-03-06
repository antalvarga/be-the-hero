// 1:24:08 useState
import React, {useState} from 'react';
// 1:26:55
import { Link, useHistory } from 'react-router-dom';
import './style.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import { FiLogIn } from 'react-icons/fi';

// 1:23:59
import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});
            //console.log( response.data.name );
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        } catch(err) {
            alert('Erro no login');

        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID" 
                        value = {id}
                        onChange = {e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className=".back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>

            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}