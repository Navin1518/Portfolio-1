import Notification from "../models/Notification.js";

export function createNotification({ recipient, type, title, body, request }) {
  return Notification.create({ recipient, type, title, body, request });
}
