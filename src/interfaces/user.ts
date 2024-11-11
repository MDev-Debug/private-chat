import { Message } from "./message";

export interface User {
    socket_id: string;
    username: string;
    mensagensRecebidas: Message[];
    mensagensEnviadas: Message[];
}