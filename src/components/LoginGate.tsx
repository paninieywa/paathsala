'use client';

import { useEffect, useState, ReactNode } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { LogIn } from 'lucide-react';

export default function LoginGate({ children, message }: { children: ReactNode; message: string }) {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session);
      setChecking(false);
    });
  }, []);

  if (checking) return <main style={{ padding: '48px' }}>Loading...</main>;

  if (!loggedIn) {
    return (
      <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '480px' }}>
        <div style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: '32px', textAlign: 'center' }}>
          <LogIn size={28} color="var(--marigold)" style={{ marginBottom: '12px' }} />
          <p style={{ color: 'var(--ink)', fontSize: '14.5px', marginBottom: '20px' }}>{message}</p>
          <Link
            href="/login"
            style={{ display: 'inline-block', padding: '10px 24px', background: 'var(--marigold)', color: 'var(--ink)', textDecoration: 'none', fontWeight: 600 }}
          >
            Log in
          </Link>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
