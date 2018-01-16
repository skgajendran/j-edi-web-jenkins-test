export interface RabbitMessage {
    message:string;
    type?:string;
    transactionId?:string;
    severity:string;
    order?:number
}