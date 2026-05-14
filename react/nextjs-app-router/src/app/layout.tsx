import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TimelineKit - Next.js Example',
  description: 'TimelineKit GanttChart component in a Next.js App Router application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
