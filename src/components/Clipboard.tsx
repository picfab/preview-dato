import { useState } from 'react';

interface ClipboardCopyProps {
  text: string;
  children: React.ReactNode;
}

const Clicked = () => {
  return (
    <span
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
      }}
    >
      Copied!
    </span>
  );
};

export const ClipboardCopy = ({ text, children }: ClipboardCopyProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Réinitialise après 2 secondes
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return (
    <>
      {
        <button
          onClick={handleCopy}
          title="Copy"
          style={{
            position: 'relative',
            cursor: 'pointer',
            padding: 2,
            border: 'none',
            background: 'transparent',
          }}
        >
          {children}
          {copied && <Clicked />}
        </button>
      }
    </>
  );
};
