"use strict";

import * as mongoose from "mongoose";

/**
 * @interface
 * @property {string} notificationCode O código que identifica a notificação.
 *                                     Este código deve ser usado para consultar a notificação e
 *                                     obter os dados da transação associada.
 *                                     Note que o código que identifica a notificação não é o mesmo
 *                                     que o código que identifica a transação.
 *                                     39 carácteres.
 * @property {string} notificationType O tipo da notificação enviada. No momento, apenas notificações
 *                                     de transação são enviadas.
 *                                     Apenas "transaction".
 * @description Notificação emitida pelo PagSeguro a cada alteração em uma transação.
 */
export interface INotification extends mongoose.Document {
    notificationCode: string;
    notificationType: string;
};

/**
 * @description Definição referente ao Mongoose para notificação.
 */
export type MNotification = mongoose.Model<INotification>;

/**
 * @description Definição do esquema para o Mongoose.
 */
export var NotificationSchema: mongoose.Schema = new mongoose.Schema({
    notificationCode: { type: "string", match: /^\d{39}$/ },
    notificationType: { type: "string", enum: ["transaction"] }
});

/**
 * @class
 * @property {string} notificationCode O código que identifica a notificação.
 *                                     Este código deve ser usado para consultar a notificação e
 *                                     obter os dados da transação associada.
 *                                     Note que o código que identifica a notificação não é o mesmo
 *                                     que o código que identifica a transação.
 *                                     39 carácteres.
 * @property {string} notificationType O tipo da notificação enviada. No momento, apenas notificações
 *                                     de transação são enviadas.
 *                                     Apenas "transaction".
 * @description Notificação emitida pelo PagSeguro a cada alteração em uma transação.
 */
export var Notification:MNotification = mongoose.model<INotification>("Notification",
    NotificationSchema);
