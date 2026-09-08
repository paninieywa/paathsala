import { supabase } from './supabase';
import { getArenaQuestions, ArenaTopic } from '@/data/arenaQuestions';

export async function createMatch(userId: string, userName: string, topic: ArenaTopic) {
  const questions = getArenaQuestions(topic, 10);
  const { data, error } = await supabase
    .from('arena_matches')
    .insert({
      topic,
      questions,
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

export async function joinMatch(matchId: string, userId: string, userName: string) {
  const { data, error } = await supabase
    .from('arena_matches')
    .update({ player2_id: userId, player2_name: userName, status: 'in_progress' })
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

export async function submitCorrectAnswer(matchId: string, isPlayer1: boolean, newProgress: number, totalQuestions: number, userId: string) {
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
