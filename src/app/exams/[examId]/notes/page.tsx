'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getNotes } from '@/data/notes';

export default function NotesPage() {
  const params = useParams<{ examId: string }>();
  const notes = getNotes(params.examId);
  const [openId, setOpenId] = useState<string | null>(null);

  if (notes.length === 0) {
    return <main style={{ padding: '48px' }}>No notes available for this exam yet.</main>;
  }

  return (
    <main style={{ padding: '48px', maxWidth: '640px' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--indigo)' }}>
        Notes
      </h1>

      <div className="flex flex-col gap-2">
        {notes.map((note) => {
          const isOpen = openId === note.id;
          return (
            <div key={note.id} style={{ border: '1px solid var(--border)' }}>
              <button
                onClick={() => setOpenId(isOpen ? null : note.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 16px',
                  background: 'var(--paper)',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--indigo)',
                  fontFamily: 'var(--font-space-grotesk)',
                }}
              >
                {note.title}
              </button>
              {isOpen && (
                <div style={{ padding: '0 16px 16px', color: 'var(--ink)', fontSize: '14.5px', lineHeight: 1.6 }}>
                  {note.body}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
