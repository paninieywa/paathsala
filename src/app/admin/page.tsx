'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Resource = {
  id: string;
  exam_id: string;
  title: string;
  link_url: string;
  link_type: string;
  status: string;
};

type Report = {
  id: string;
  post_id: string;
  reason: string;
  created_at: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<Resource[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  async function loadPending() {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });
    if (error) {
      console.error('loadPending error:', error);
      return;
    }
    setPending(data ?? []);
  }

  async function loadReports() {
    const { data, error } = await supabase
      .from('forum_reports')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('loadReports error:', error);
      return;
    }
    setReports(data ?? []);
  }

  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();

      if (!profile?.is_admin) {
        setLoading(false);
        return;
      }
      setAllowed(true);
      await loadPending();
      await loadReports();
      setLoading(false);
    }
    check();
  }, [router]);

  async function publish(id: string) {
    const { error } = await supabase.from('resources').update({ status: 'published' }).eq('id', id);
    if (error) {
      console.error('publish error:', error);
      return;
    }
    setPending((prev) => prev.filter((r) => r.id !== id));
  }

  async function reject(id: string) {
    const { error } = await supabase.from('resources').delete().eq('id', id);
    if (error) {
      console.error('reject error:', error);
      return;
    }
    setPending((prev) => prev.filter((r) => r.id !== id));
  }

  if (loading) return <main style={{ padding: '48px' }}>Loading...</main>;
  if (!allowed) return <main style={{ padding: '48px' }}>Not authorized.</main>;

  return (
    <main style={{ padding: '48px', maxWidth: '720px' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--indigo)' }}>
        Pending Resources
      </h1>

      {pending.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Nothing waiting for review.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {pending.map((r) => (
            <div key={r.id} style={{ border: '1px solid var(--border)', padding: '14px 16px' }}>
              <p style={{ fontSize: '14px', color: 'var(--ink)', marginBottom: '4px' }}>
                <strong>{r.title}</strong> — {r.exam_id} ({r.link_type})
              </p>
              <a href={r.link_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--indigo)' }}>
                {r.link_url}
              </a>
              <div className="flex gap-2" style={{ marginTop: '10px' }}>
                <button
                  onClick={() => publish(r.id)}
                  style={{ padding: '6px 14px', background: 'var(--leaf)', color: 'white', border: 'none', fontSize: '13px' }}
                >
                  Publish
                </button>
                <button
                  onClick={() => reject(r.id)}
                  style={{ padding: '6px 14px', background: 'var(--kumkum)', color: 'white', border: 'none', fontSize: '13px' }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="font-display text-lg mt-8 mb-3" style={{ color: 'var(--indigo)' }}>
        Reported Forum Posts
      </h2>
      {reports.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No reports right now.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {reports.map((r) => (
            <div key={r.id} style={{ border: '1px solid var(--kumkum)', padding: '12px 16px', fontSize: '13px' }}>
              <p>Post ID: {r.post_id}</p>
              <p style={{ color: 'var(--text-muted)' }}>Reason: {r.reason}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
