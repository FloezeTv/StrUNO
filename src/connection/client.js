import Peer from "peerjs";
import { CardDrawEvent, CardHandSendEvent, CardPlayEvent, ConnectEvent, EventHandler, PingHandler } from "./events";

class Client {

    // Callbacks:
    // - onConnect: Client connected to table
    // - onCardDraw: A new card has been sent to the client
    // - onHandUpdate: A full hand has been sent to the client

    constructor(id, callbacks) {
        this.callbacks = callbacks;

        this.client = new Peer();
        this.eventHandler = new EventHandler();

        this.eventHandler.on(CardDrawEvent, this.callbacks.onCardDraw);
        this.eventHandler.on(CardHandSendEvent, this.callbacks.onHandUpdate);

        this.pingHandler = PingHandler(this.eventHandler, () => console.warn("Disconnected!"));

        this.messageQueue = []; // messages to send right after connecting

        this.client.on('open', () => {
            this.connection = this.client.connect(id);
            this.connection.on('open', () => {
                this.callbacks.onConnect();
                this.connection.on('data', this.eventHandler.handler(this.connection));
                this.messageQueue.forEach(message => this.connection.send(message));
                delete this.messageQueue;
            });
        });
    }

    send(message) {
        if (this.connection)
            this.connection.send(message);
        else
            this.messageQueue.push(message);
    }

    connect(name) {
        this.send(new ConnectEvent(name));
    }

    tryPlayCard(card) {
        this.send(new CardPlayEvent(card.color, card.value));
    }

}

export default Client;