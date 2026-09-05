export default function TermsPage() {
  return (
    <main style={{ padding: 'clamp(20px, 5vw, 48px)', maxWidth: '720px' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--indigo)' }}>
        Terms of Service
      </h1>
      <div style={{ fontSize: '14.5px', color: 'var(--ink)', lineHeight: 1.7 }}>
        <p style={{ marginBottom: '16px' }}>
          <strong>Draft terms during development.</strong> Should be reviewed by a legal professional
          before public launch.
        </p>

        <h2 className="font-display text-lg mt-6 mb-2" style={{ color: 'var(--indigo)' }}>Using Paathsala</h2>
        <p style={{ marginBottom: '16px' }}>
          Paathsala provides free exam-preparation content, practice questions, and community features.
          Content is provided as a study aid — we don&apos;t guarantee exam results.
        </p>

        <h2 className="font-display text-lg mt-6 mb-2" style={{ color: 'var(--indigo)' }}>Community conduct</h2>
        <p style={{ marginBottom: '16px' }}>
          Forum posts and shared resources must not contain harassment, hate speech, spam, or content
          harmful to other students. Posts can be reported and reviewed; violating content may be removed
          and accounts may be restricted.
        </p>

        <h2 className="font-display text-lg mt-6 mb-2" style={{ color: 'var(--indigo)' }}>Shared resources</h2>
        <p style={{ marginBottom: '16px' }}>
          When sharing a link to your own notes or files, you confirm you have the right to share that
          content and that it doesn&apos;t violate anyone else&apos;s copyright.
        </p>

        <h2 className="font-display text-lg mt-6 mb-2" style={{ color: 'var(--indigo)' }}>Accuracy</h2>
        <p style={{ marginBottom: '16px' }}>
          Cutoff trends, syllabus details, and other data are provided as estimates or references and may
          not reflect official figures. Always verify against official exam notifications.
        </p>
      </div>
    </main>
  );
}
