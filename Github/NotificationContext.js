import React, { createContext, useContext, useState, useEffect } from "react";
import { updateNotification } from "../api/NotificationData";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ initialData = [], children }) => {
  const [notifications, setNotifications] = useState(initialData || []);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      const adaptedData = initialData.map(notification => ({
        ...notification,
        leido: notification.EsAlerta === "True" ? 1 : 0,
        eliminado: 0,
        tipoNotificacion: 1,
      }));
      setNotifications(adaptedData);
    }
  }, [initialData]);

  const markAsRead = async (id) => {
    try {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id ? { ...notification, leido: 1 } : notification
        )
      );

      await updateNotification(id, { EsAlerta: "False" });
    } catch (error) {
      console.error("Error al marcar la notificación como leída:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id ? { ...notification, eliminado: 1 } : notification
        )
      );

      await updateNotification(id, { eliminado: 1 });
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
    }
  };

  const visibleNotifications = notifications.filter(notification => notification.eliminado === 0);

  return (
    <NotificationsContext.Provider
      value={{ notifications: visibleNotifications, markAsRead, deleteNotification, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationsContext);
};
