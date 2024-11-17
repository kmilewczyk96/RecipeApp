import style from "./AuthLayout.module.css";


export default function AuthLayout({children}) {
  return (
    <div className={style["auth-layout"]}>
      {children}
    </div>
  )
};
