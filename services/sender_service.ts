"use strict";

import {ISender} from "../models/sender_model";
import {Sender} from "../models/sender_model";

export interface ISenderService {
    find(filtro: any): Promise<Array<ISender>>;
    findById(id: string): Promise<ISender>;
    insert(senderData: any): Promise<ISender>;
    update(id: string, senderData: any): Promise<ISender>;
    delete(id: string): Promise<ISender>;
}

export class SenderService implements ISenderService {
    find(filtro: any) {
        var self = this;
        return new Promise<Array<ISender>>((resolve: Function, reject: Function) =>
            Sender.find(filtro, (error: any, senders: Array<ISender>) =>
                (!!error) ? reject(error) : resolve(senders)));
    }

    findById(id: string) {
        var self = this;
        return new Promise<ISender>((resolve: Function, reject: Function) =>
            Sender.findById(id, (error: any, sender:ISender) =>
                (!!error) ? reject(error) : resolve(sender)));
    }

    insert(senderData: any) {
        var self = this;
        return new Promise<ISender>((resolve: Function, reject: Function) => {
            var sender:ISender = new Sender(senderData);
            sender.save(error => !!error ? reject(error) : resolve(sender));
        });
    }

    update(id: string, senderData: any) {
        var self = this;
        return new Promise<ISender>((resolve: Function, reject: Function) => {
            Sender.findByIdAndUpdate(id, senderData, (error:any, sender:ISender) => !!error ? reject(error) : resolve(sender));
        });
    }

    delete(id: string) {
        var self = this;
        return new Promise<ISender>((resolve: Function, reject: Function) =>
            Sender.findByIdAndRemove(id, (error: any, sender: ISender) => !!error ? reject(error) : resolve(sender)));
    }
}