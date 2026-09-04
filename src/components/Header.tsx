'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user.id ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        borderBottom: '1px solid #E4DCC6',
        background: 'var(--paper)',
      }}
    >
      <Link href="/" className="font-dev" style={{ fontSize: '22px', color: 'var(--marigold-deep, var(--marigold))', textDecoration: 'none' }}>
        पाठशाला
      </Link>

      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '14px', color: 'var(--indigo)', textDecoration: 'none' }}>
          Home
        </Link>
        {userId ? (
          <Link href="/profile" style={{ fontSize: '14px', color: 'var(--indigo)', textDecoration: 'none' }}>
            Profile
          </Link>
        ) : (
          <Link href="/login" style={{ fontSize: '14px', color: 'var(--indigo)', textDecoration: 'none' }}>
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
}
