import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

/**
 * Componente login per il frontend
 */
function Login() {
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        username: null,
        password: null
    });

    const [errors, setErrors] = useState();

    function handleLogin(event) {
        event.preventDefault();

        console.log("Ci stiamo loggando");

        axios.post("http://localhost:9090/login", loginForm)
            .then(response => {
                console.log("Ti sei loggato")

                console.log(response.data);

                /**
                 * Dopo il login ottengo il token di autenticazione JWT.
                 * 
                 * Questo token lo salvo nel localStorage, ovvero la memoria del mio browser
                 */
                localStorage.setItem('authentication_token', response.data.authentication_token);

                /**
                 * Reindirizzo l'utente nell'area di amministrazione
                 */
                navigate("/admin", { replace: true });

            })
            .catch(error => {
                console.log(error.response);

                setErrors(error.response.data);
            })
    }

    return (
        <div className="flex items-center justify-center bg-slate-200 h-full">
            <div className="bg-white w-[380px] p-4 rounded-md shadow-md">
                <h4 className="text-center text-3xl font-semibold mb-[20px]">Accedi</h4>

                { errors?.login_error && <p className="error-msg">{errors.login_error}</p> }

                <form onSubmit={handleLogin}>
                    <div className="mb-[10px]">
                        <label className="mb-1 block">Username</label>
                        <input type="text" className="text-input" placeholder="Inserisci il tuo username..." onInput={event => setLoginForm({ ...loginForm, username: event.target.value })}/>
                    </div>

                    <div className="mb-[20px]">
                        <label className="mb-1 block">Password</label>
                        <input type="password" className="text-input" placeholder="Inserisci la tua password..." onInput={event => setLoginForm({ ...loginForm, password: event.target.value })}/>
                    </div>

                    <button className="btn-colored">Accedi ora</button>
                </form>

                <div className="text-center mt-[8px]">
                    <Link to="/registrati">Non sei registrato? Registrati qui!</Link>
                </div>
            </div>
        </div>
    )
}

/**
 * Esporto il componente Login
 */
export default Login;