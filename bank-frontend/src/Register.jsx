import { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router';

/**
 * Componente react per gestire la registrazione utente
 */
function Register() {
    const navigate = useNavigate(); // useNavigate mi serve per reindirizzare gli utenti da una pagina a un'altra

    /**
     * "memoria" react per contenere i valori dei miei campi
     */
    const [registerForm, setRegisterForm] = useState({
        firstName: null,
        lastName: null,
        username: null,
        email: null,
        taxCode: null,
        password: null,
    });

    /**
     * 
     * @param {*} event 
     */
    function handleRegister(event) {
        event.preventDefault(); // PREVENT DEFAULT SEMPRE ALL'INIZIO

        console.log(registerForm);

        axios.post("http://localhost:9090/register", registerForm)
            .then(response => {
                alert("Ti sei appena registrato!!!!!!");

                /**
                 * Qui reindirizzo l'utente alla pagina di login
                 * 
                 * replace: true mi pulisce tutti gli stati di react.
                 */
                navigate("/login", { replace: true });
            })
            .catch(err => {
                alert("Si è verificato un errore");
            })
    }

    return (
        <div className="flex items-center justify-center bg-slate-200 h-full">
            <div className="bg-white w-[380px] p-4 rounded-md shadow-md">
                <h4 className="text-center text-3xl font-semibold mb-[20px]">Registrati</h4>
                <form onSubmit={handleRegister}>
                    <div className="mb-[10px]">
                        <label className="mb-1 block">Nome</label>
                        <input type="text" className="text-input" placeholder="Inserisci il tuo nome..." onInput={e => setRegisterForm({ ...registerForm, firstName: e.target.value })} />
                    </div>

                    <div className="mb-[10px]">
                        <label className="mb-1 block">Cognome</label>
                        <input type="text" className="text-input" placeholder="Inserisci il tuo cognome..." onInput={e => setRegisterForm({ ...registerForm, lastName: e.target.value })}/>
                    </div>

                    <div className="mb-[10px]">
                        <label className="mb-1 block">Nome utente</label>
                        <input type="text" className="text-input" placeholder="Inserisci il tuo nome utente..." onInput={e => setRegisterForm({ ...registerForm, username: e.target.value })}/>
                    </div>

                    <div className="mb-[10px]">
                        <label className="mb-1 block">Email</label>
                        <input type="text" className="text-input" placeholder="Inserisci il tuo email..." onInput={e => setRegisterForm({ ...registerForm, email: e.target.value })}/>
                    </div>

                    <div className="mb-[10px]">
                        <label className="mb-1 block">Codice fiscale</label>
                        <input type="text" className="text-input" placeholder="Inserisci il tuo codice fiscale..." onInput={e => setRegisterForm({ ...registerForm, taxCode: e.target.value })}/>
                    </div>

                    <div className="mb-[20px]">
                        <label className="mb-1 block">Password</label>
                        <input type="password" className="text-input" placeholder="Inserisci la tua password..." onInput={e => setRegisterForm({ ...registerForm, password: e.target.value })}/>
                    </div>

                    <button className="btn-colored">Registrati ora</button>
                </form>
            </div>
        </div>
    )
}

export default Register;