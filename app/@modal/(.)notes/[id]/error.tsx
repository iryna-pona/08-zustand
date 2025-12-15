'use client';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorMessage({ error, reset }: ErrorProps) {
  return (
    <div>
      <p>Could not fetch the note. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
} 