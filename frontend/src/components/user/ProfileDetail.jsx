import style from "./ProfileDetail.module.css";


export default function ProfileDetail({user, isOwner=false}) {
  return (
    <div className={style["profile-detail"]}>
      <h2>{user.name}</h2>
    </div>
  );
}
