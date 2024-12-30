export function LoadingSpinner() {
  return (
    <svg width={200} viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <circle
        className="spin2"
        cx="400"
        cy="400"
        fill="none"
        r="154"
        stroke-width="26"
        stroke="#ff6f61"
        stroke-dasharray="745 1400"
        stroke-linecap="round"
      />
    </svg>
  );
}
