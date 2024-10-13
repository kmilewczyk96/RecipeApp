import style from "./ProfilePageLayout.module.css";


export default function ProfilePageLayout({children}) {
  return (
    <div className={style["profile-layout"]}>
      {children}
    </div>
  );
};
