'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Resource = {
  id: string;
  title: string;
  link_url: string;
  link_type: string;
  status: string;
};

function detectLinkType(url: string): string {
  if (url.includes('drive.google.com')) return 'drive';
  if (url.includes('dropbox.com')) return 'dropbox';
  if (url.includes('mega.nz')) return 'mega';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  return 'other';
}

export default function ResourcesPage() {
  const params = useParams<{ examId: string }>();
  const examId = params.examId;

  const [userId, setUserId] = useState<string | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user.id ?? null);
    });
    loadResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId]);

  async function loadResources() {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('exam_id', examId)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('loadResources error:', error);
      return;
    }
    setResources(data ?? []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!userId) return setError('Log in to share a resource.');
    if (!title.trim() || !link.trim()) return setError('Add a title and a link.');

    let validUrl: string;
    try {
      validUrl = new URL(link.trim()).toString();
    } catch {
      return setError('That link doesn\'t look valid — include https://');
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from('resources').insert({
      exam_id: examId,
      uploaded_by: userId,
      title: title.trim(),
      link_url: validUrl,
      link_type: detectLinkType(validUrl),
    });
    setSubmitting(false);

    if (insertError) {
      console.error('resource insert error:', insertError);
      return setError('Could not save — try again.');
    }

    setTitle('');
    setLink('');
    loadResources();
  }

  return (
    <main style={{ padding: '48px', maxWidth: '640px' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--indigo)' }}>
        Shared Resources
      </h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '32px', border: '1px solid #E4DCC6', padding: '16px' }}>
        <input
          placeholder="Title (e.g. 'My handwritten Polity notes')"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #E4DCC6', marginBottom: '8px' }}
        />
        <input
          placeholder="Link (Google Drive, Dropbox, Mega, YouTube...)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #E4DCC6', marginBottom: '8px' }}
        />
        {error && <p style={{ color: 'var(--kumkum)', fontSize: '13px', marginBottom: '8px' }}>{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          style={{ padding: '10px 20px', background: 'var(--marigold)', color: 'var(--ink)', border: 'none' }}
        >
          {submitting ? 'Sharing...' : 'Share resource'}
        </button>
        <p style={{ fontSize: '12px', color: '#5B665F', marginTop: '8px' }}>
          Make sure your link&apos;s sharing setting is &quot;Anyone with the link.&quot; Reviewed before appearing for others.
        </p>
      </form>

      <div className="flex flex-col gap-2">
        {resources.length === 0 && (
          <p style={{ color: '#5B665F', fontSize: '14px' }}>No shared resources yet.</p>
        )}
        {resources.map((r) => (
          <div key={r.id} style={{ border: '1px solid #E4DCC6', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--ink)', fontSize: '14px' }}>
              {r.title}
              <span style={{ color: '#5B665F', fontSize: '12px', marginLeft: '8px' }}>
                ({r.link_type}{r.status === 'pending' ? ', pending review' : ''})
              </span>
            </span>
            {r.status === 'published' && (
              <a href={r.link_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--indigo)' }}>
                Open
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
