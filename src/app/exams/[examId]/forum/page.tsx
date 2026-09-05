'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Post = {
  id: string;
  body: string;
  upvotes: number;
  created_at: string;
  author_id: string;
};

export default function ForumPage() {
  const params = useParams<{ examId: string }>();
  const examId = params.examId;

  const [userId, setUserId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user.id ?? null);
    });
    loadPosts();
  }, [examId]);

  async function loadPosts() {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*')
      .eq('exam_id', examId)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('loadPosts error:', error);
      return;
    }
    setPosts(data ?? []);
  }

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!userId) return setError('Log in to post in the forum.');
    if (!newPost.trim()) return;

    const { error } = await supabase.from('forum_posts').insert({
      exam_id: examId,
      author_id: userId,
      body: newPost.trim(),
    });
    if (error) {
      console.error('post insert error:', error);
      return setError('Could not post — try again.');
    }
    setNewPost('');
    loadPosts();
  }

  async function handleUpvote(postId: string) {
    if (!userId) return setError('Log in to upvote.');
    if (votedIds.includes(postId)) return;

    const { error } = await supabase.from('forum_upvotes').insert({
      post_id: postId,
      user_id: userId,
    });
    if (error) {
      console.error('upvote error:', error);
      return;
    }

    setVotedIds((v) => [...v, postId]);
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p))
    );

    await supabase
      .from('forum_posts')
      .update({ upvotes: posts.find((p) => p.id === postId)!.upvotes + 1 })
      .eq('id', postId);
  }

  async function handleReport(postId: string, authorId: string) {
  if (!userId) return setError('Log in to report a post.');
  if (userId === authorId) return setError("You can't report your own post.");
  const reason = window.prompt('Why are you reporting this post?');
  if (!reason) return;

  const { error } = await supabase.from('forum_reports').insert({
    post_id: postId,
    reported_by: userId,
    reason,
  });
  if (error) {
    console.error('report error:', error);
    return;
  }
  alert('Thanks — this has been reported for review.');
}

  return (
    <main style={{ padding: '48px', maxWidth: '640px' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--indigo)' }}>
        Discussion
      </h1>

      <form onSubmit={handlePost} style={{ marginBottom: '32px' }}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Ask a question or share something useful..."
          rows={3}
          style={{ width: '100%', padding: '10px', border: '1px solid #E4DCC6', fontFamily: 'inherit' }}
        />
        {error && <p style={{ color: 'var(--kumkum)', fontSize: '13px', marginTop: '6px' }}>{error}</p>}
        <button
          type="submit"
          style={{ marginTop: '8px', padding: '10px 20px', background: 'var(--marigold)', color: 'var(--ink)', border: 'none' }}
        >
          Post
        </button>
      </form>

      <div className="flex flex-col gap-3">
        {posts.length === 0 && (
          <p style={{ color: '#5B665F', fontSize: '14px' }}>No posts yet — be the first to ask something.</p>
        )}
        {posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #E4DCC6', padding: '14px 16px' }}>
            <p style={{ color: 'var(--ink)', fontSize: '14.5px', marginBottom: '10px' }}>{post.body}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleUpvote(post.id)}
                disabled={votedIds.includes(post.id)}
                style={{
                  fontSize: '13px',
                  background: 'none',
                  border: '1px solid var(--indigo)',
                  color: 'var(--indigo)',
                  padding: '4px 10px',
                  cursor: votedIds.includes(post.id) ? 'default' : 'pointer',
                }}
              >
                ▲ {post.upvotes}
              </button>
              <button
                onClick={() => handleReport(post.id, post.author_id)}
                style={{
                  fontSize: '13px',
                  background: 'none',
                  border: '1px solid var(--kumkum)',
                  color: 'var(--kumkum)',
                  padding: '4px 10px',
                  cursor: 'pointer',
                }}
              >
                Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
