export default function ThemeSelector({ scheme, handleScheme, colorSchemes }) {
  return (
    <div className="theme-selector">
      <ul>
        {colorSchemes.map((item, i) => (
          <li
            key={i}
            className={
              scheme == item ? "theme-label theme-selected" : "theme-label"
            }
            onClick={() => handleScheme(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
