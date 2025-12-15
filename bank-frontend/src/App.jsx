import { useState, useEffect, useRef } from "react";
import "./App.css";

const TRANSACTIONS_URL = "http://localhost:9090/transactions";

/**
 * Questa funzione App si chiama COMPONENTE perché siamo in React
 * @returns
 */
function App() {
  const [entrataForm, impostaEntrataForm] = useState({
    value: 0,
    transactionCategory: null,
    transactionType: 'entrata'
  });

  const [tutteLeEntrate, aggiungiTutteLeEntrate] = useState([]);
  const [entrate, aggiornaEntrate] = useState(0);

  const referenzaFormEntrata = useRef(null);

  function ottieniEntrate() {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(TRANSACTIONS_URL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("HO OTTENUTO I DATI DAL SERVER", JSON.parse(result))

        aggiungiTutteLeEntrate( JSON.parse(result) )
      })
      .catch((error) => console.error(error));
  }

  /**
   * Questa funzione (useEffect) si avvia nel momento in cui 
   * visito l'app (quindi al primo caricamento useEffect si inizializza)
   */
  useEffect(() => {
    ottieniEntrate()
    console.log("CIAOOOOOOOO SONO IL PUNTO IN CUI SI AVVIA L'APP")
  }, []);

  /**
   * Qui invece scriviamo codice Javascript
   */
  function gestisciAggiuntaEntrata(event) {
    event.preventDefault();

    console.log("Mappatura form entrata con gli stati di react", entrataForm);

    fetch(TRANSACTIONS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entrataForm)
    })
    .then(response => {
      alert("Congratulazioni! Hai aggiunto un'entrata.")
      ottieniEntrate();

      /**
       * Faccio il console log per vedere cosa mi restituisce
       */
      console.log(referenzaFormEntrata.current);

      /**
       * Resetta i valori del form
       */
      referenzaFormEntrata.current.reset();
    })

    console.log("Aggiunta nuova entrata: ", entrate);
  }

  /**
   * Qui scriviamo HTML (che in React si chiama JSX)
   */
  return (
    <div className="p-4 bg-stone-200/60 h-full">

      <div className="text-center mb-[50px]">
        <h1 className="text-3xl mb-2 font-medium">
          Benvenuto nella tua app bancaria
        </h1>
        <p>Dentro questa web app puoi gestire le tue finanze personali</p>
      </div>

      <div className="flex w-[800px] gap-[20px] m-auto bg-white p-[20px] rounded-lg">

        <div className="w-full flex flex-col gap-[10px]">
          <h4 className="text-center">Gestione finanze</h4>

          <div className="bg-green-600 text-white p-4 rounded-lg">
            <h5 className="text-lg font-semibold">Entrate</h5>

            <form ref={referenzaFormEntrata} onSubmit={gestisciAggiuntaEntrata}>
              <div className="mb-[10px]">
                <label className="mb-1 block">Importo (€)</label>
                <input type="number" className="input-style" step="0.01" onInput={(event) => {

                  impostaEntrataForm({ ...entrataForm, value: event.target.value });

                }}/>
              </div>

              <div className="mb-[10px]">
                <label className="mb-1 block">Tipo movimento</label>
                <select className="input-style" onChange={event => {
                  impostaEntrataForm({ ...entrataForm, transactionCategory: event.target.value });
                }}>
                  <option value="">SELEZIONA OPZIONE</option>
                  <option value="stipendio">Stipendio</option>
                  <option value="bonifico">Bonifico</option>
                  <option value="ritorno_investimenti">Ritorno investimenti</option>
                </select>
              </div>

              <button className="btn-primary">Aggiungi entrata</button>
            </form>
          </div>

          <div className="bg-red-600 text-white p-4 rounded-lg">
            <h5 className="text-lg font-semibold">Uscite</h5>
            
            <input type="number" className="input-style"/>
            <button className="btn-primary">Aggiungi uscita</button>
          </div>
        </div>

        <div className="w-full">
          <h4 className="text-center">Estratto conto</h4>

          <div className="mt-[20px] mb-[20px] flex flex-col gap-[10px] overflow-y-scroll h-[400px]">
            {
              tutteLeEntrate.map((entrata, index) => <div key={index} className="p-4 border border-2 rounded-md border-green-600 text-right">
                <span>+ {entrata.valore} €</span>
              </div>)
            }
          </div>

          <p>Entrate totali: {tutteLeEntrate.reduce((numeroIniziale, entrata) => numeroIniziale + entrata.valore, 0)}€</p>
          <p>Uscite totali: </p>
        </div>

      </div>

    </div>
  );
}

/**
 * Questa riga di codice indica un export (esportazione) completa del componente App.
 */
export default App;
