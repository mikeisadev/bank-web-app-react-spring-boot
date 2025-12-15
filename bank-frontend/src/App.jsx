import { useState, useEffect, useRef } from "react";
import { formatDate } from "./date";
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

  const [uscitaForm, impostaUscitaForm] = useState({
    value: 0,
    transactionCategory: null,
    transactionType: 'uscita'
  });

  const [tutteLeEntrate, aggiungiTutteLeEntrate] = useState([]);
  const [entrate, aggiornaEntrate] = useState(0);

  const referenzaFormEntrata = useRef(null);

  function getMovements() {
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
      console.log("Stai aggiungendo un'uscita", uscitaForm);

      payload = entrataForm;
    }

    if (movementType === 'uscita') {
      console.log("Stai aggiungendo un'entrata", entrataForm);

      payload = uscitaForm;
    }

    fetch(TRANSACTIONS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    .then(response => {
      alert("Congratulazioni! Hai aggiunto un'entrata.")

      /**
       * Dopo aver aggiunto un movimento, ricarica tutti i movimenti disponibili per 
       * visualizzare i dati aggiornati
       */
      getMovements();

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
   * Calcola le entrate
   */
  function calculateIncome(allMovements) {
    let sum = 0;

    allMovements.map(movement => {
      if (movement.transactionType === 'entrata') {
        sum += Number(movement.value);
      }
    })

    return sum;
  }

  /**
   * Calcola le uscite
   */
  function calculateLoss(allMovements) {
    let sum = 0;

    allMovements.map(movement => {
      if (movement.transactionType === 'uscita') {
        sum -= Number(movement.value);
      }
    })

    return sum;
  }

  /**
   * Calcola il bilancio totale
   */
  function calculateNetIncome(allMovements) {
    return calculateIncome(allMovements) + calculateLoss(allMovements);
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

            <form ref={referenzaFormEntrata} onSubmit={(event) => addMovement(event, "entrata")}>
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

          <p>Entrate totali: {calculateIncome(tutteLeEntrate)}€</p>
          <p>Uscite totali: {calculateLoss(tutteLeEntrate)}€</p>

          <p>Bilancio: {calculateNetIncome(tutteLeEntrate)}€</p>
        </div>

      </div>

    </div>
  );
}

/**
 * Questa riga di codice indica un export (esportazione) completa del componente App.
 */
export default App;
