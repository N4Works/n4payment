"use strict";

export interface IEmail {
    email:string;
    subject:string;
    message:string;
}

export class Email {
    constructor(public email:string, public subject:string, public message:string) {
    }
}
