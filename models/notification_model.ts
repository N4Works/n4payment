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
