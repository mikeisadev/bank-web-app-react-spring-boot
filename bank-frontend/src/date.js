
const months = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
];

/**
 * Questa è la mia funzione per formattare la mia data
 * 
 * Vado a formattare la data che passo come parametro "date" così:
 * 
 * Giorno / mese / anno Ora:Minuti
 * 
 * @param {*} date 
 * @returns 
 */
export function formatDate(date) {
    // console.log("data in formato stringa ritornato dal database", date);
    /**
     * L'oggetto "Date" è fornito dal linguaggio Javascript
     */
    const objectDate = new Date(date);

    // console.log("DATA interpretata come oggetto da Javascript", objectDate);

    const day = objectDate.getDate();
    const month = objectDate.getMonth(); // Ricorda che i mesi in Javascript vanno indietro di 1 perché sono in base 0, quindi faccio sempre +1
    const year = objectDate.getFullYear();

    const hour = String(objectDate.getHours()).padStart(2, '0');
    const minute = String(objectDate.getMinutes()).padStart(2, '0');

    return day + " " + months[month] + " " + year + " " + hour + ":" + minute;
}
