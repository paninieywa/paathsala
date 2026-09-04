'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) return setError(error.message);

      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          display_name: name || 'Student',
        });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return setError(error.message);
    }

    router.push('/profile');
  }

  return (
    <main style={{ padding: '48px', maxWidth: '400px' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--indigo)' }}>
        {mode === 'signup' ? 'Create account' : 'Log in'}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {mode === 'signup' && (
          <input
            placeholder="Display name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '10px', border: '1px solid #E4DCC6' }}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', border: '1px solid #E4DCC6' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={{ padding: '10px', border: '1px solid #E4DCC6' }}
        />

        {error && <p style={{ color: 'var(--kumkum)', fontSize: '13px' }}>{error}</p>}

        <button
          type="submit"
          style={{ padding: '10px', background: 'var(--marigold)', color: 'var(--ink)', border: 'none' }}
        >
          {mode === 'signup' ? 'Sign up' : 'Log in'}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
        style={{ marginTop: '16px', fontSize: '13px', color: 'var(--indigo)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        {mode === 'signup' ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
      </button>
    </main>
  );
}
