/**
 * Liqpay Payment Module
 *
 * LIQPAY API       https://www.ua/documentation/ru
 *
 */

// <reference types="node" />


export type ActionTypes = 'pay' | 'hold' | 'subscribe' | 'paydonate' | 'auth'

export type CurrencyTypes = 'USD' | 'EUR' | 'RUB' | 'UAH'

export type LanguageTypes = 'ru' | 'uk' | 'en'

export type PaymentTypes = 'card' | 'liqpay' | 'privat24' | 'masterpass' | 'moment_part' | 'cash' | 'invoice' | 'qr'

export type SubscribePeriodicity = 'month' | 'year'

export type DetailAddenda = {
    airLine?: string
    ticketNumber?: string
    passengerName?: string
    flightNumber?: string
    originCity?: string
    destinationCity?: string
    departureDate?: string
}

export type Parameters<T> = {
    [key: string]: T;
}

export interface MainParameters {
    version: number
    public_key: string
    action: ActionTypes
    amount: number
    currency: CurrencyTypes
    description: string
    order_id: string
    language?: LanguageTypes
    expired_date?: string
    paytypes?: PaymentTypes
}

export interface SplittingPaymentParameters extends MainParameters {
    split_rules?: string
}

export interface SenderParameters extends MainParameters {
    sender_address?: string
    sender_city?: string
    sender_country_code?: string
    sender_first_name?: string
    sender_last_name?: string
    sender_postal_code?: string
}

export interface LetterOfCreditParameters extends MainParameters {
    letter_of_credit?: string
    letter_of_credit_date?: string
}

export interface RegularPaymentParameters extends MainParameters {
    subscribe?: string
    subscribe_date_start?: string
    subscribe_periodicity?: SubscribePeriodicity
}

export interface OneClickPaymentParameters extends MainParameters {
    customer?: string
    recurringbytoken?: string
    customer_user_id?: string
}

export interface OtherParameters extends MainParameters {
    dae?: string
    info?: string
    product_category?: string
    product_description?: string
    product_name?: string
    product_url?: string
}

export type PaymentParameters =
    MainParameters
    | SplittingPaymentParameters
    | SenderParameters
    | LetterOfCreditParameters
    | RegularPaymentParameters
    | OneClickPaymentParameters
    | OtherParameters

export interface PaymentForm {
    data: Buffer
    signature: PaymentSignature
}

export class InvalidArgumentException extends Error {
    constructor (message: string, error?: Error);
}

export type VerifyCallback = (
    body: string | object | Array<any>
) => void

export type ErrorCallback = (
    err: Error, response: Response
) => void

export type PaymentSignature = string
export type HTMLPaymentForm = string

export default class Liqpay {

    // API host
    host: string

    public_key: string

    private_key: string

    /**
     * Constructor.
     *
     * @param {string} public_key
     * @param {string} private_key
     *
     * @throws InvalidArgumentException
     */
    constructor (public_key: string, private_key: string)

    /**
     * Call API
     *
     * @param {string} path
     * @param {PaymentParameters} params
     * @param {VerifyCallback} callback
     * @param {ErrorCallback} callbackerr
     *
     * @return Object
     */
    public api (path: string, params: PaymentParameters, callback: VerifyCallback, callbackerr: ErrorCallback): void

    /**
     * cnb_form
     *
     * @param {PaymentParameters} params
     *
     * @return HTMLPaymentForm
     *
     * @throws InvalidArgumentException
     */
    public cnb_form (params: PaymentParameters): HTMLPaymentForm

    /**
     * cnb_signature
     *
     * @param {PaymentParameters} params
     *
     * @return PaymentSignature
     *
     * @throws InvalidArgumentException
     */
    public cnb_signature (params: PaymentParameters): PaymentSignature

    /**
     * cnb_params
     *
     * @param {PaymentParameters} params
     *
     * @return {PaymentParameters} params
     *
     * @throws InvalidArgumentException
     */
    public cnb_params (params: Parameters<string | number>): PaymentParameters

    /**
     * str_to_sign
     *
     * @param {string} str
     *
     * @return PaymentSignature
     */
    public str_to_sign (str: string): PaymentSignature

    /**
     * Return Form Object
     *
     * @param {PaymentParameters} params
     *
     * @return PaymentForm
     */
    public cnb_object (params: PaymentParameters): PaymentForm

}
