'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setSending(false);
    if (error) return setError(error.message);
    setStep('code');
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' });
    if (error) return setError(error.message);
    if (!data.user) return setError('Something went wrong — try again.');

    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', data.user.id)
      .single();

    if (!existing) {
      const fallbackName = name.trim() || email.split('@')[0] || 'Student';
      const { error: insertError } = await supabase.from('profiles').insert({
        id: data.user.id,
        display_name: fallbackName,
      });

      if (insertError) {
        console.error('profile insert error:', insertError);
        setError('Signed in, but your profile could not be created. Please refresh /profile in a moment.');
      }
    }

    router.push('/profile');
  }

  return (
    <main style={{ padding: '48px', maxWidth: '400px' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--indigo)' }}>
        {step === 'email' ? 'Log in or sign up' : 'Enter your code'}
      </h1>

      {step === 'email' ? (
        <form onSubmit={sendCode} className="flex flex-col gap-3">
          <input
            placeholder="Your name (for new accounts)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '10px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--ink)' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '10px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--ink)' }}
          />
          {error && <p style={{ color: 'var(--kumkum)', fontSize: '13px' }}>{error}</p>}
          <button type="submit" disabled={sending} style={{ padding: '10px', background: 'var(--marigold)', color: 'var(--ink)', border: 'none' }}>
            {sending ? 'Sending...' : 'Send code'}
          </button>
        </form>
      ) : (
        <form onSubmit={verifyCode} className="flex flex-col gap-3">
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>We sent a 6-digit code to {email}.</p>
          <input
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            maxLength={6}
            style={{ padding: '10px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--ink)', letterSpacing: '4px', fontSize: '18px' }}
          />
          {error && <p style={{ color: 'var(--kumkum)', fontSize: '13px' }}>{error}</p>}
          <button type="submit" style={{ padding: '10px', background: 'var(--marigold)', color: 'var(--ink)', border: 'none' }}>
            Verify &amp; continue
          </button>
          <button
            type="button"
            onClick={() => setStep('email')}
            style={{ fontSize: '13px', color: 'var(--indigo)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Use a different email
          </button>
        </form>
      )}
    </main>
  );
}
