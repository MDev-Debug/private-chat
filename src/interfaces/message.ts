export interface Message {
    to_user: string;
    from_user: string;
    text: string;
    createdAt: Date;
    usernameReceived: string;
    usernameSended: string;
}