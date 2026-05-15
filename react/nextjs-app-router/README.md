# Gantt Chart - Next.js App Router Integration

## What this example demonstrates

This example solves a specific integration challenge: **using TimelineKit in a Next.js App Router project**. Next.js App Router renders all components as Server Components by default, but TimelineKit needs access to the browser DOM. The example shows the recommended pattern — wrapping TimelineKit in a Client Component (`'use client'`) and importing it from a Server Component page. This way, the page benefits from server-side rendering while TimelineKit runs entirely on the client.

The Gantt chart itself contains a realistic 4-phase software project (Planning, Design, Development, Testing & Launch) with 22 tasks including summary tasks, milestones, parallel work streams, and a full dependency chain — demonstrating that the integration pattern works with non-trivial data.

**Use this example when:** You are building a Next.js application with App Router and need to integrate TimelineKit components.

## The Pattern

1. Create a Client Component wrapper (`src/components/GanttWrapper.tsx`):

```tsx
'use client';

import { GanttChart, GanttChartRef, setLicense } from '@timelinekit/react';
import '@timelinekit/core/styles';

// All TimelineKit logic goes here
export default function GanttWrapper() {
  return <GanttChart ref={ganttRef} onReady={onReady} />;
}
```

2. Import and render it from a Server Component page (`src/app/page.tsx`):

```tsx
import GanttWrapper from '@/components/GanttWrapper';

export default function Home() {
  return <GanttWrapper />;
}
```

This keeps the page as a Server Component (benefiting from SSR for surrounding content) while TimelineKit runs entirely on the client.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and add your license key:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## License Key

No license key is needed to run this example — see the [root README](../../README.md#license-key) for details. If you have a key, set it via `NEXT_PUBLIC_TK_LICENSE_KEY` in `.env.local` (the `NEXT_PUBLIC_` prefix is required so that Next.js exposes the variable to the client bundle).
