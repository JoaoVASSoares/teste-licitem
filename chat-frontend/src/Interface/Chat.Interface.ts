export interface IMessage {
  id: string;
  name: string;
  text: string;
}

export interface IPayload {
  name: string;
  text: string;
  room: string;
}

export interface IChatProps {
  room: string;
  chatDisconnect: () => void;
}