export default function IconStatic({size="16", hexColor="#212529", children}) {
  return (
    <svg
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill={hexColor}
    >
      {children}
    </svg>
  );
};
