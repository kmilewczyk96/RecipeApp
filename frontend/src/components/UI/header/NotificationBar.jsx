import style from "./NotificationBar.module.css";

import useNotification from "/src/hooks/useNotification.jsx";


export default function NotificationBar() {
  const {notification, clear} = useNotification();

  return (
    notification?.message && (
      <div className={[style["notification-bar"], style[notification.status]].join(" ")}>
        <div className={style["notification-content"]}>
          <p><em>{notification.status}!</em> {notification.message}</p>
          <button className={[style["close-button"], style[notification.status]].join(" ")} onClick={clear}>&#x2715;</button>
        </div>
      </div>
    )
  );
};