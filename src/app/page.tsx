import Hero3D from '@/components/Hero3D';
import ExamSelector from '@/components/ExamSelector';

export default function Home() {
  return (
    <main>
      <section
        style={{ background: 'var(--ink)', height: '70vh', position: 'relative' }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <Hero3D />
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '80px 48px',
            color: 'var(--paper)',
            pointerEvents: 'none',
          }}
        >
          <h1 className="font-dev" style={{ fontSize: '56px', color: 'var(--marigold)' }}>
            पाठशाला
          </h1>
          <p className="font-display" style={{ fontSize: '20px', maxWidth: '480px' }}>
            One school. Every exam. Your language.
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 48px' }}>
        <ExamSelector />
      </section>
    </main>
  );
}
