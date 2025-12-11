import { useState } from "react";
import "./App.css";

/**
 * Questa funzione App si chiama COMPONENTE perché siamo in React
 * @returns
 */
function App() {
  const [entrate, aggiornaEntrate] = useState(0);

  /**
   * Qui invece scriviamo codice Javascript
   */
  function gestisciAggiuntaEntrata(event) {
    event.preventDefault();

    console.log("AGGIUNGI ENTRATA");
  }

  function gestisciInput(event) {
    console.log(event.target.value);

    aggiornaEntrate(event.target.value);
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

            <form onSubmit={gestisciAggiuntaEntrata}>
              <input type="number" className="input-style" onInput={gestisciInput} />
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

          <p>Entrate totali: {entrate}€</p>
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
