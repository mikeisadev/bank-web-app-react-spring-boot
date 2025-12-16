
/**
 * In questa classe JAVASCRIPT voglio raccogliere le mappature di tutti
 * i form che ho nella mia applicazione web.
 * 
 * Le mappature non sono altro che oggetti Javascript
 */
export class FormPayload {

    /**
     * Questa è la mappatura del form di entrata
     */
    static entrataForm = {
        value: 0,
        transactionCategory: null,
        transactionType: 'entrata',
    };

    /**
     * Questa è la mappatura del form delle uscite
     */
    static uscitaForm = {
        value: 0,
        transactionCategory: null,
        transactionType: 'uscita'
    }

}