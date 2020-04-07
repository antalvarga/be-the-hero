// useState em 1:17:22
import React, {useState} from 'react';
// useHistory em 1:23:00
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Register() {
    // 1:17:22
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    // 1:23:15
    const history = useHistory();

    // 1:16:10
    async function handleREgister(e) {
        e.preventDefault();

        const data = {
            name 
            , email
            , whatsapp
            , city
            , uf
            , 
        };

        try {
            const response = await api.post('ongs', data);
            alert( `Seu ID ${response.data.id}`);

            // 1:23:31 Enviar para a rota raiz
            history.push('/');

        } catch (err) {
            alert('Erro');
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <br></br>

                    <Link className=".back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                    
                </section>
                
                <form onSubmit={handleREgister}>

                    <input 
                        type="text"
                        placeholder="Nome da ONG" 
                        value={name}    
                        onChange={ e=> setName(e.target.value)}
                    />

                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="WhatsApp"
                        value = {whatsapp}
                        onChange = {e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Cidade"
                            value = {city}
                            onChange = {e => setCity(e.target.value)}
                        />

                        <input 
                            type="text" 
                            placeholder="UF" 
                            style={{ width: 80 }}  
                            value = {uf}
                            onChange = {e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}