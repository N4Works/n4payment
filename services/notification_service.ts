"use strict";

import {INotification} from "../models/notification_model";
import {Notification} from "../models/notification_model";

export interface INotificationService {
    find(filtro: any): Promise<Array<INotification>>;
    findById(id: string): Promise<INotification>;
    insert(notificationData: any): Promise<INotification>;
    update(id: string, notificationData: any): Promise<INotification>;
    delete(id: string): Promise<INotification>;
}

export class NotificationService implements INotificationService {
    find(filtro: any) {
        var self = this;
        return new Promise<Array<INotification>>((resolve: Function, reject: Function) =>
            Notification.find(filtro, (error: any, notifications: Array<INotification>) =>
                (!!error) ? reject(error) : resolve(notifications)));
    }

    findById(id: string) {
        var self = this;
        return new Promise<INotification>((resolve: Function, reject: Function) =>
            Notification.findById(id, (error: any, notification:INotification) =>
                (!!error) ? reject(error) : resolve(notification)));
    }

    insert(notificationData: any) {
        var self = this;
        return new Promise<INotification>((resolve: Function, reject: Function) => {
            var notification:INotification = new Notification(notificationData);
            notification.save(error => !!error ? reject(error) : resolve(notification));
        });
    }

    update(id: string, notificationData: any) {
        var self = this;
        return new Promise<INotification>((resolve: Function, reject: Function) => {
            Notification.findByIdAndUpdate(id, notificationData, (error:any, notification:INotification) => !!error ? reject(error) : resolve(notification));
        });
    }

    delete(id: string) {
        var self = this;
        return new Promise<INotification>((resolve: Function, reject: Function) =>
            Notification.findByIdAndRemove(id, (error: any, notification: INotification) => !!error ? reject(error) : resolve(notification)));
    }
}
