export interface JoinedRoomPayloadProps {
  roomId: string;
  userId: string;
}

export interface MessagePayloadProps {
  content: string;
  type: string;
  userId: string;
  roomId: string;
}
