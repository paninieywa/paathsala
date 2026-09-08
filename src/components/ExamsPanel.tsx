'use client';

import Link from 'next/link';
import { Trash2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { exams } from '@/data/exams';
import { examMeta } from '@/data/examMeta';
import { clearExamLocalData } from '@/lib/examData';

export default function ExamsPanel({
  userId,
  chosenExams,
  onChange,
}: {
  userId: string;
  chosenExams: string[];
  onChange: (updated: string[]) => void;
}) {
  async function removeExam(examId: string) {
    const exam = exams.find((e) => e.id === examId);
    const confirmed = window.confirm(
      `Remove ${exam?.name ?? examId}? This deletes your syllabus progress, flashcard progress, and mock test attempts for it on this device.`
    );
    if (!confirmed) return;

    clearExamLocalData(examId);
    const updated = chosenExams.filter((id) => id !== examId);
    onChange(updated);
    await supabase.from('profiles').update({ chosen_exams: updated }).eq('id', userId);
  }

  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h2 className="font-display text-lg" style={{ color: 'var(--indigo)' }}>Your exams</h2>
        <Link href="/" style={{ fontSize: '12.5px', color: 'var(--indigo)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Add more <ArrowRight size={13} />
        </Link>
      </div>

      {chosenExams.length === 0 ? (
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
          No exams selected yet — <Link href="/" style={{ color: 'var(--indigo)' }}>choose one on the homepage</Link>.
        </p>
      ) : (
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {chosenExams.map((id) => {
            const exam = exams.find((e) => e.id === id);
            const meta = examMeta[id];
            const Icon = meta?.icon;
            return (
              <div key={id} style={{ border: '1px solid var(--border)', padding: '14px', position: 'relative' }}>
                <button
                  onClick={() => removeExam(id)}
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                  title="Remove this exam"
                >
                  <Trash2 size={14} />
                </button>
                <Link href={`/exams/${id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    {Icon && <Icon size={16} color="var(--marigold)" />}
                    <span style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--indigo)' }}>{exam?.name ?? id}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{meta?.description}</p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
