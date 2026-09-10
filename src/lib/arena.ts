import { supabase } from './supabase';
import { getArenaQuestions, ArenaTopic } from '@/data/arenaQuestions';

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no O/0/I/1 to avoid confusion
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function createMatch(userId: string, userName: string, topic: ArenaTopic) {
  const questions = getArenaQuestions(topic, 10);
  const roomCode = generateRoomCode();

  const { data, error } = await supabase
    .from('arena_matches')
    .insert({
      topic,
      questions,
      room_code: roomCode,
      player1_id: userId,
      player1_name: userName,
    })
    .select()
    .single();

  if (error) {
    console.error('createMatch error:', error);
    return null;
  }
  return data;
}

export async function findMatchByCode(code: string) {
  const { data, error } = await supabase
    .from('arena_matches')
    .select('*')
    .eq('room_code', code.toUpperCase())
    .single();

  if (error) {
    console.error('findMatchByCode error:', error);
    return null;
  }
  return data;
}

export async function joinMatch(matchId: string, userId: string, userName: string) {
  const { data, error } = await supabase
    .from('arena_matches')
    .update({
      player2_id: userId,
      player2_name: userName,
      status: 'in_progress',
      started_at: new Date().toISOString(),
    })
    .eq('id', matchId)
    .eq('status', 'waiting')
    .select()
    .single();

  if (error) {
    console.error('joinMatch error:', error);
    return null;
  }
  return data;
}

export async function submitCorrectAnswer(
  matchId: string,
  isPlayer1: boolean,
  newProgress: number,
  totalQuestions: number,
  userId: string
) {
  const updates: Record<string, unknown> = isPlayer1
    ? { player1_progress: newProgress }
    : { player2_progress: newProgress };

  if (newProgress >= totalQuestions) {
    updates.status = 'finished';
    updates.winner_id = userId;
  }

  const { error } = await supabase.from('arena_matches').update(updates).eq('id', matchId);
  if (error) console.error('submitCorrectAnswer error:', error);
}

export async function forfeitMatch(matchId: string, opponentId: string | null) {
  const { error } = await supabase
    .from('arena_matches')
    .update({ status: 'finished', winner_id: opponentId })
    .eq('id', matchId);

  if (error) console.error('forfeitMatch error:', error);
}

export async function timeoutMatch(
  matchId: string,
  player1Progress: number,
  player2Progress: number,
  player1Id: string,
  player2Id: string | null
) {
  const winnerId =
    player1Progress === player2Progress ? null : player1Progress > player2Progress ? player1Id : player2Id;

  const { error } = await supabase
    .from('arena_matches')
    .update({ status: 'finished', winner_id: winnerId })
    .eq('id', matchId);

  if (error) console.error('timeoutMatch error:', error);
}
