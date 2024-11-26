import style from "./IconButton.module.css";


export default function IconButton({size="16", hexColor="#212529", onClick, children}) {
  return (
    <svg
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill={hexColor}
      onClick={onClick}
      className={style["icon"]}
    >
      {children}
    </svg>
  );
};
