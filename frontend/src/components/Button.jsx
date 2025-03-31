


// In your Button component file
export default function Button({ text, onClick, className }) {
    return (
      <button
        onClick={onClick}
        className={`${className} transition-colors duration-200`}
      >
        {text}
      </button>
    );
  }