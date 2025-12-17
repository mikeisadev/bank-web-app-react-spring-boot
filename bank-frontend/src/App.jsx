import { useState, useEffect, useRef } from "react";
import { formatDate } from "./date";
import axios from "axios";
import "./App.css";

import { FormPayload } from "./FormPayload";

import { useNavigate } from "react-router";

const TRANSACTIONS_URL = "http://localhost:9090/transactions";

/**
 * Questa funzione App si chiama COMPONENTE perché siamo in React
 * @returns
 */
function App() {
  /**
   * Hook di react router per navigare
   */
  const navigate = useNavigate();

  /**
   * Memoria / stato di react per conservare tutte le entrate
   */
  const [tutteLeEntrate, aggiungiTutteLeEntrate] = useState([]);

  /**
   * Stati react per i due form: entrata e uscita
   */
  const [entrataForm, impostaEntrataForm] = useState(FormPayload.entrataForm);
  const [uscitaForm, impostaUscitaForm] = useState(FormPayload.uscitaForm);

  /**
   * Stato react per gli errori
   */
  const [errors, setErrors] = useState();
  
  const referenzaFormEntrata = useRef(null);

  /**
   * Questa è la funzione che mi carica tutti i movimenti
   */
  function getMovements() {
    axios.get(TRANSACTIONS_URL, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('authentication_token') }
    })
      .then(response => aggiungiTutteLeEntrate(response.data));
  }

  /**
   * Questa funzione (useEffect) si avvia nel momento in cui 
   * visito l'app (quindi al primo caricamento useEffect si inizializza)
   */
  useEffect(() => {
    getMovements()
    console.log("CIAOOOOOOOO SONO IL PUNTO IN CUI SI AVVIA L'APP")
  }, []);

  /**
   * Qui invece scriviamo codice Javascript
   */
  function addMovement(event, movementType) {
    /**
     * event.preventDefault() evita che la pagina si ricarichi
     */
    event.preventDefault();

    /**
     * Inizializzo una variabile payload per contenere il form di entrata o di uscita in base
     * al valore del parametro movementType
     * 
     * payload = carico di dati da mandare al server
     * 
     * Il Payload è il body o i dati che mando al server
     */
    let payload;

    if (movementType === 'entrata') {
      console.log("Stai aggiungendo un'entrata", entrataForm);

      payload = entrataForm;
    }

    if (movementType === 'uscita') {
      console.log("Stai aggiungendo un'uscita", uscitaForm);

      payload = uscitaForm;
    }

    axios.post(TRANSACTIONS_URL, payload, {
      headers: { "Authorization": "Bearer " + localStorage.getItem("authentication_token") }
    })
      .then(response => {
        console.log("Movimento aggiunto");

        referenzaFormEntrata.current.reset(); // Pulisco il form
        impostaEntrataForm(FormPayload.entrataForm); // Rimetto la memoria di react (lo state) a come era prima
        setErrors(); // pulisco la memoria degli errori, perché se sono qui tutto è stato processato per bene

        getMovements();

        alert(response.data.message);
      })
      .catch(err => {
        console.log(err.response.data);

        setErrors(err.response.data);
      })
  }

  /**
   * Creo una funzione per cacolare il tipo di somma (calculateSumType è in inglese e significa quello che ho scritto nella frase)
   * 
   * allMovements = ci metto tutti i movimenti
   * calculationType = scelgo tra income (entrate), loss (uscite) o net (patrimonio netto)
   */
  function calculateSumType(allMovements, calculationType) {
    let sum = 0;

    allMovements.map(movement => {
      if (movement.transactionType === 'entrata' && calculationType === "income") {
        sum += Number(movement.value);
      }

      if (movement.transactionType === 'uscita' && calculationType === "loss") {
        sum -= Number(movement.value)
      }

      if (calculationType === "net") {
        if (movement.transactionType === 'entrata') {
          sum += Number(movement.value);
        } 
        
        if (movement.transactionType === 'uscita') {
          sum -= Number(movement.value)
        }
      }
    })

    return sum;
  }

  /**
   * Gestisco il logout
   */
  function handleLogout() {
    if (confirm("Sei sicuro di voler uscire?")) {
      /**
       * Prima tolgo il mio token di autenticazione dalla memoria del browser
       */
      localStorage.removeItem("authentication_token");

      /**
       * Vado a reindirizzare il mio utente alla pagina di login
       */
      navigate("/login", { replace: true });
    }
  }

  /**
   * Calcola le uscite
   */
  // function calculateLoss(allMovements) {
  //   let sum = 0;

  //   allMovements.map(movement => {
  //     if (movement.transactionType === 'uscita') {
  //       sum -= Number(movement.value);
  //     }
  //   })

  //   return sum;
  // }

  /**
   * Calcola il bilancio totale
   */
  // function calculateNetIncome(allMovements) {
  //   return calculateIncome(allMovements) + calculateLoss(allMovements);
  // }

  /**
   * Qui scriviamo HTML (che in React si chiama JSX)
   */
  return (
    <div className="flex flex-row bg-stone-200/60 h-full">

      <div className="w-[280px] p-4 bg-white h-full">

        <div className="flex flex-col h-full">
          <button onClick={handleLogout} className="p-[8px] rounded-md bg-red-600 mb-[0px] mt-auto text-white">Esci</button>
        </div>
      </div>

      <div className="w-[calc(100%-280px)]">
        <div className="p-4 text-center mb-[50px]">
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

              <form ref={referenzaFormEntrata} onSubmit={(event) => addMovement(event, "entrata")}>
                <div className="mb-[10px]">
                  <label className="mb-1 block">Importo (€)</label>
                  <input type="number" className="input-style" step="0.01" onInput={(event) => {

                    impostaEntrataForm({ ...entrataForm, value: Number(event.target.value) });

                  }}/>
                  { errors?.value_error && <p className="val-error">{errors.value_error}</p> }
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
                  { errors?.transaction_category_error && <p className="val-error">{errors.transaction_category_error}</p> }
                </div>

                <button className="btn-primary">Aggiungi entrata</button>
              </form>
            </div>

            <div className="bg-red-600 text-white p-4 rounded-lg">
              <h5 className="text-lg font-semibold">Uscite</h5>

              <form onSubmit={(event) => addMovement(event, "uscita")}>
                <div className="mb-[10px]">
                  <label className="mb-1 block">Importo (€)</label>
                  <input type="number" className="input-style" step="0.01" onInput={(event) => {
                    impostaUscitaForm({ ...uscitaForm, value: event.target.value })
                  }}/>
                </div>

                <div className="mb-[10px]">
                  <label className="mb-1 block">Tipo movimento</label>
                  <select className="input-style" onChange={(event) => {
                    impostaUscitaForm({ ...uscitaForm, transactionCategory: event.target.value });
                  }}>
                    <option value="">SELEZIONA OPZIONE</option>
                    <option value="spesa">Spesa</option>
                    <option value="bolletta_elettrica">Bolletta elettrica</option>
                    <option value="benzina">Benzina</option>
                  </select>
                </div>
                
                <button className="btn-primary">Aggiungi uscita</button>
              </form>
            </div>
          </div>

          <div className="w-full">

            <h4 className="text-center">Estratto conto</h4>
            <div className="mt-[20px] mb-[20px] flex flex-col gap-[10px] overflow-y-scroll h-[400px]">
              {
                tutteLeEntrate.map((entrata, index) => <div key={index} className={`p-4 border border-2 rounded-md ${entrata.transactionType === 'entrata' ? 'border-green-600' : 'border-red-600'} text-right`}>
                  <div>
                    <span className={`${(entrata.transactionType === 'entrata') ? 'text-green-600' : 'text-red-600'} font-bold text-[22px]`}>
                      {entrata.transactionType === 'entrata' ? '+' : '-'} {entrata.value} €
                    </span>
                  </div>
                  <div>Tipo: {entrata.transactionCategory}</div>
                  <div>Data esecuzione: {formatDate(entrata.creationDate)}</div>
                </div>)
              }
            </div>

            <p>Entrate totali: {calculateSumType(tutteLeEntrate, "income")}€</p>
            <p>Uscite totali: {calculateSumType(tutteLeEntrate, "loss")}€</p>

            <p>Bilancio: {calculateSumType(tutteLeEntrate, "net")}€</p>
          </div>

        </div>
      </div>


    </div>
  );
}

/**
 * Questa riga di codice indica un export (esportazione) completa del componente App.
 */
export default App;
