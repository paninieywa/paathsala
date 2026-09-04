'use client';

import Link from 'next/link';
import { useState } from 'react';
import { exams } from '@/data/exams';

export default function ExamSelector() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
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
