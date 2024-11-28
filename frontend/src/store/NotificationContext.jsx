import {createContext, useEffect, useState} from "react";


export const NotificationContext = createContext({
  notification: {},
  showNotification: () => {},
  clear: () => {},
});


export default function NotificationContextProvider({children}) {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => clear(), 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  function showNotification(status, message) {
    setNotification({
      status: status,
      message: message
    });
  }

  function clear() {
    setNotification(null);
  }

  const ctxItems = {
    notification,
    showNotification,
    clear,
  };

  return (
    <NotificationContext.Provider value={ctxItems}>
      {children}
    </NotificationContext.Provider>
  );
}