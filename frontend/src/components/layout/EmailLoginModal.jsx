import React, { useState } from 'react';
import Modal from '../shared/Modal';

export default function EmailLoginModal({ show, onClose, onSubmit, loading, error, showPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && (!showPassword || password)) {
      onSubmit(showPassword ? { email, password } : { email });
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h5 className="mb-3">Admin Email Login</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Enter admin email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {showPassword && (
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        )}
        {error && <div className="text-danger mb-2">{error}</div>}
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </Modal>
  );
}
