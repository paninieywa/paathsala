'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { joinMatch, submitCorrectAnswer } from '@/lib/arena';
import { ArenaQuestion } from '@/data/arenaQuestions';
import TugOfWarVisual from '@/components/TugOfWarVisual';
import { Copy } from 'lucide-react';

type Match = {
  id: string;
  room_code: string;
  topic: string;
  status: string;
  questions: ArenaQuestion[];
  player1_id: string;
  player1_name: string;
  player1_progress: number;
  player2_id: string | null;
  player2_name: string | null;
  player2_progress: number;
  winner_id: string | null;
};

export default function ArenaMatchPage() {
  const params = useParams<{ matchId: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState('Student');
  const [match, setMatch] = useState<Match | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);
        const { data: profile } = await supabase.from('profiles').select('display_name').eq('id', session.user.id).single();
        if (profile?.display_name) setUserName(profile.display_name);
      }

      const { data } = await supabase.from('arena_matches').select('*').eq('id', params.matchId).single();
      setMatch(data);
      setLoading(false);
    }
    init();

    const channel = supabase
      .channel(`arena-${params.matchId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'arena_matches', filter: `id=eq.${params.matchId}` }, (payload) => {
        setMatch(payload.new as Match);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [params.matchId]);

  async function handleJoin() {
    if (!userId || !match) return;
    const updated = await joinMatch(match.id, userId, userName);
    if (updated) setMatch(updated);
  }

  async function handleAnswer(optionIndex: number) {
    if (!match || !userId || selected !== null) return;
    setSelected(optionIndex);

    const current = match.questions[questionIndex];
    const isCorrect = optionIndex === current.correctIndex;
    const isPlayer1 = userId === match.player1_id;

    setTimeout(async () => {
      if (isCorrect) {
        const newProgress = (isPlayer1 ? match.player1_progress : match.player2_progress) + 1;
        await submitCorrectAnswer(match.id, isPlayer1, newProgress, match.questions.length, userId);
      }
      setSelected(null);
      setQuestionIndex((i) => Math.min(i + 1, match.questions.length - 1));
    }, 700);
  }

  if (loading) return <main style={{ padding: '48px' }}>Loading...</main>;
  if (!match) return <main style={{ padding: '48px' }}>Match not found.</main>;
  if (!userId) return <main style={{ padding: '48px' }}>Log in to join this challenge.</main>;

  const isPlayer1 = userId === match.player1_id;
  const isPlayer2 = userId === match.player2_id;
  const isSpectator = !isPlayer1 && !isPlayer2;

  if (match.status === 'waiting') {
  return (
    <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '480px' }}>
      <h1 className="font-display text-2xl mb-4" style={{ color: 'var(--indigo)' }}>Waiting for an opponent</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px' }}>
        Give this room code to a friend so they can join:
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <p className="font-display" style={{ fontSize: '36px', letterSpacing: '6px', color: 'var(--marigold)' }}>
          {match.room_code}
        </p>
        <button
          onClick={() => navigator.clipboard.writeText(match.room_code)}
          style={{ padding: '6px', background: 'none', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--indigo)' }}
          title="Copy code"
        >
          <Copy size={15} />
        </button>
      </div>
      {isSpectator && userId && (
        <button
          onClick={handleJoin}
          style={{ padding: '10px 18px', background: 'var(--indigo)', color: 'var(--paper)', border: 'none' }}
        >
          Join this challenge
        </button>
      )}
    </main>
  );
}

  if (match.status === 'finished') {
    const won = match.winner_id === userId;
    return (
      <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '480px' }}>
        <h1 className="font-display text-2xl mb-4" style={{ color: 'var(--indigo)' }}>
          {isSpectator ? 'Match finished' : won ? 'You won! 🎉' : 'Better luck next time'}
        </h1>
        <TugOfWarVisual
          player1Progress={match.player1_progress}
          player2Progress={match.player2_progress}
          totalQuestions={match.questions.length}
          player1Name={match.player1_name}
          player2Name={match.player2_name ?? 'Opponent'}
        />
      </main>
    );
  }

  const current = match.questions[questionIndex];
  const myProgress = isPlayer1 ? match.player1_progress : match.player2_progress;

  return (
    <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '640px' }}>
      <h1 className="font-display text-xl mb-4" style={{ color: 'var(--indigo)' }}>Challenge Arena — {match.topic}</h1>

      <TugOfWarVisual
        player1Progress={match.player1_progress}
        player2Progress={match.player2_progress}
        totalQuestions={match.questions.length}
        player1Name={match.player1_name}
        player2Name={match.player2_name ?? 'Waiting...'}
      />

      {isSpectator ? (
        <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '14px' }}>Watching this match live.</p>
      ) : (
        <div style={{ marginTop: '24px' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Your progress: {myProgress}/{match.questions.length}
          </p>
          <p style={{ fontSize: '16px', color: 'var(--ink)', marginBottom: '16px' }}>{current.text}</p>
          <div className="flex flex-col gap-2">
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  border: '1px solid var(--border)',
                  background: selected === i ? (i === current.correctIndex ? 'var(--feedback-correct-bg)' : 'var(--feedback-wrong-bg)') : 'var(--surface)',
                  color: 'var(--ink)',
                  cursor: selected === null ? 'pointer' : 'default',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
