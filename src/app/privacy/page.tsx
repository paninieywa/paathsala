export default function PrivacyPage() {
  return (
    <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '720px' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--indigo)' }}>
        Privacy Policy
      </h1>
      <div style={{ fontSize: '14.5px', color: 'var(--ink)', lineHeight: 1.7 }}>
        <p style={{ marginBottom: '16px' }}>
          <strong>Last updated:</strong> This is a draft policy for Paathsala during development.
          It should be reviewed by a legal professional before real users sign up.
        </p>

        <h2 className="font-display text-lg mt-6 mb-2" style={{ color: 'var(--indigo)' }}>What we collect</h2>
        <p style={{ marginBottom: '16px' }}>
          Your email address (for login), a display name you choose, your quiz and mock test activity,
          your chosen exams, forum posts, and any resources you share.
        </p>

        <h2 className="font-display text-lg mt-6 mb-2" style={{ color: 'var(--indigo)' }}>What&apos;s public</h2>
        <p style={{ marginBottom: '16px' }}>
          Your display name, streak count, and badges are visible to anyone if you share your profile link
          or opt into the leaderboard. Forum posts are visible to anyone viewing that exam&apos;s discussion.
          Your email address is never shown publicly.
        </p>

        <h2 className="font-display text-lg mt-6 mb-2" style={{ color: 'var(--indigo)' }}>No direct messaging</h2>
        <p style={{ marginBottom: '16px' }}>
          Paathsala does not allow users to message each other directly. This is a deliberate safety choice,
          particularly since some users may be minors preparing for school-leaving or entrance exams.
        </p>

        <h2 className="font-display text-lg mt-6 mb-2" style={{ color: 'var(--indigo)' }}>Data storage</h2>
        <p style={{ marginBottom: '16px' }}>
          Data is stored with Supabase. We do not sell your data to third parties.
        </p>

        <h2 className="font-display text-lg mt-6 mb-2" style={{ color: 'var(--indigo)' }}>Your choices</h2>
        <p style={{ marginBottom: '16px' }}>
          You can edit your display name, remove yourself from the leaderboard, and request account deletion
          by contacting us.
        </p>
      </div>
    </main>
  );
}
