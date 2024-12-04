export default function IconDraggable({size="16", hexColor="#212529", dragControls, children}) {
  return (
    <svg
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill={hexColor}
      onPointerDown={(event) => dragControls.start(event)}
    >
      {children}
    </svg>
  );
};
