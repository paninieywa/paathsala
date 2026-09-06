'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { exams } from '@/data/exams';
import { examMeta } from '@/data/examMeta';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/LanguageContext';
import { clearExamLocalData } from '@/lib/examData';
import { Check } from 'lucide-react';

const LOCAL_KEY = 'paathsala_chosen_exams';

export default function ExamSelector({
  onChange,
}: {
  onChange?: (ids: string[]) => void;
}) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        setUserId(session.user.id);
        const { data } = await supabase
          .from('profiles')
          .select('chosen_exams')
          .eq('id', session.user.id)
          .single();
        const ids = data?.chosen_exams ?? [];
        setSelected(ids);
        onChange?.(ids);
      } else {
        const raw = localStorage.getItem(LOCAL_KEY);
        const ids = raw ? JSON.parse(raw) : [];
        setSelected(ids);
        onChange?.(ids);
      }
    }
    load();
  }, [onChange]);

  async function toggle(id: string) {
  const isDeselecting = selected.includes(id);

  if (isDeselecting) {
    const confirmed = window.confirm(
      'Removing this exam will delete your syllabus progress, flashcard progress, and mock test attempts for it on this device. Continue?'
    );
    if (!confirmed) return;
    clearExamLocalData(id);
  }

  const updated = isDeselecting
    ? selected.filter((x) => x !== id)
    : [...selected, id];
  setSelected(updated);
  onChange?.(updated);

  if (userId) {
    await supabase.from('profiles').update({ chosen_exams: updated }).eq('id', userId);
  } else {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  }
}

  return (
    <div>
      <h2 className="font-display text-xl mb-4" style={{ color: 'var(--indigo)' }}>
        {t('chooseExams')}
      </h2>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
      >
        {exams.map((exam) => {
          const meta = examMeta[exam.id];
          const Icon = meta?.icon;
          const isSelected = selected.includes(exam.id);

          return (
            <div
              key={exam.id}
              onClick={() => toggle(exam.id)}
              style={{
                border: `1px solid ${isSelected ? 'var(--marigold)' : 'var(--border)'}`,
                borderTop: isSelected ? '3px solid var(--marigold)' : '1px solid var(--border)',
                padding: '20px',
                cursor: 'pointer',
                background: isSelected ? 'var(--surface)' : 'var(--surface)',
                opacity: isSelected ? 1 : 0.9,
                transition: 'border-color 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--ink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {Icon && <Icon size={20} color="var(--marigold)" />}
                </div>
                {isSelected && (
                  <div style={{ background: 'var(--marigold)', borderRadius: '50%', padding: '3px' }}>
                    <Check size={14} color="var(--paper)" />
                  </div>
                )}
              </div>

              <h3 className="font-display" style={{ fontSize: '17px', color: 'var(--indigo)', marginBottom: '4px' }}>
                {exam.name}
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--marigold)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                {exam.category}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: isSelected ? '12px' : 0 }}>
                {meta?.description}
              </p>

              {isSelected && (
  <Link
    href={`/exams/${exam.id}`}
    onClick={(e) => e.stopPropagation()}
    style={{
      display: 'inline-block',
      fontSize: '13px',
      fontWeight: 600,
      color: 'var(--hero-text)',
      background: 'var(--hero-bg)',
      padding: '8px 16px',
      textDecoration: 'none',
    }}
  >
    Start learning →
  </Link>
)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
