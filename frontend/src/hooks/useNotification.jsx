import {useContext} from "react";

import {NotificationContext} from "../store/NotificationContext.jsx";


export default function useNotification() {
  return useContext(NotificationContext);
};
