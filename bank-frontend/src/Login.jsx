
function Login() {

    return (
        <div className="flex items-center justify-center bg-slate-200 h-full">
            <div className="bg-white w-[380px] p-4 rounded-md shadow-md">
                <h4 className="text-center text-3xl font-semibold mb-[20px]">Accedi</h4>
                <form>
                    <div className="mb-[10px]">
                        <label className="mb-1 block">Username</label>
                        <input type="text" className="text-input" placeholder="Inserisci il tuo username..."/>
                    </div>

                    <div className="mb-[20px]">
                        <label className="mb-1 block">Password</label>
                        <input type="password" className="text-input" placeholder="Inserisci la tua password..."/>
                    </div>

                    <button className="btn-colored">Accedi ora</button>
                </form>
            </div>
        </div>
    )
}

export default Login;