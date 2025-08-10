import React, { useState } from 'react';

export default function TestUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setOutput(input);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Test UI Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="test-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type something..."
        />
        <button data-testid="submit-btn" type="submit">Submit</button>
      </form>
      <div data-testid="output">{output}</div>
    </div>
  );
}
