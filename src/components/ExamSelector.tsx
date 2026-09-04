'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { exams } from '@/data/exams';
import { supabase } from '@/lib/supabase';

const LOCAL_KEY = 'paathsala_chosen_exams';

export default function ExamSelector({
  onChange,
}: {
  onChange?: (ids: string[]) => void;
}) {
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
    const updated = selected.includes(id)
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
      <h2 className="font-display text-xl mb-3" style={{ color: 'var(--indigo)' }}>
        Choose your exams
      </h2>
      <div className="flex flex-wrap gap-2">
        {exams.map((exam) => {
          const isSelected = selected.includes(exam.id);
          return (
            <div key={exam.id} className="flex flex-col items-start gap-1">
              <button
                onClick={() => toggle(exam.id)}
                className="px-4 py-2 text-sm border transition-colors"
                style={{
                  borderColor: isSelected ? 'var(--marigold)' : '#E4DCC6',
                  background: isSelected ? 'var(--marigold)' : 'var(--paper)',
                  color: isSelected ? 'var(--ink)' : 'var(--indigo)',
                }}
              >
                {exam.name}
              </button>
              {isSelected && (
                <Link
                  href={`/exams/${exam.id}`}
                  style={{ fontSize: '12px', color: 'var(--indigo)', textDecoration: 'underline' }}
                >
                  Open dashboard
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
