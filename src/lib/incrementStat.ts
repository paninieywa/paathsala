import { supabase } from './supabase';

type StatColumn = 'total_quizzes_completed' | 'total_mocks_completed' | 'forum_post_count' | 'resources_shared_count';

export async function incrementStat(userId: string, column: StatColumn) {
  const { data } = await supabase.from('profiles').select(column).eq('id', userId).single();
  const current = (data as unknown as Record<string, number> | null)?.[column] ?? 0;
  await supabase.from('profiles').update({ [column]: current + 1 }).eq('id', userId);
}
