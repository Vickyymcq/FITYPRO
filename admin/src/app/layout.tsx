import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-main' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Fity Pro Admin - Control Center',
  description: 'Manage Fity Pro Fitness Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          {/* Sidebar */}
          <aside style={{ width: '260px', backgroundColor: 'var(--surface)', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '30px 20px' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '40px' }}>Fity Pro Admin</h2>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="/" style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(122, 201, 67, 0.1)', color: 'var(--primary)' }}>Dashboard</a>
              <a href="/users" style={{ padding: '12px', color: 'var(--text-muted)' }}>User Management</a>
              <a href="/trainers" style={{ padding: '12px', color: 'var(--text-muted)' }}>Trainers</a>
              <a href="/plans" style={{ padding: '12px', color: 'var(--text-muted)' }}>Plans & Slots</a>
              <a href="/sessions" style={{ padding: '12px', color: 'var(--text-muted)' }}>Daily Sessions</a>
              <a href="/payments" style={{ padding: '12px', color: 'var(--text-muted)' }}>Payments</a>
              <a href="/marketing" style={{ padding: '12px', color: 'var(--text-muted)' }}>Marketing Analytics</a>
            </nav>
          </aside>
          
          <main style={{ flex: 1, padding: '20px 40px' }}>
            <Header />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
