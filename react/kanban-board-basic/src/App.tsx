import { useRef, useEffect } from 'react';
import { KanbanBoard, KanbanBoardRef, setLicense } from '@timelinekit/react';
import { KanbanColumn, KanbanCard, KanbanSwimlane } from '@timelinekit/core';
import '@timelinekit/core/styles';
import './App.css';

setLicense(import.meta.env.VITE_TK_LICENSE_KEY ?? '');

function buildSampleData(board: KanbanBoardRef) {
  // Columns
  const todo = new KanbanColumn(null);
  todo.title = 'To Do';
  todo.color = 0;

  const inProgress = new KanbanColumn(null);
  inProgress.title = 'In Progress';
  inProgress.color = 2;
  inProgress.wipLimit = 4;

  const review = new KanbanColumn(null);
  review.title = 'Review';
  review.color = 4;
  review.wipLimit = 2;

  const done = new KanbanColumn(null);
  done.title = 'Done';
  done.color = 6;
  done.isTerminal = true;

  board.data.assignColumns([todo, inProgress, review, done]);

  // Swimlanes
  const frontend = new KanbanSwimlane(null);
  frontend.title = 'Frontend';

  const backend = new KanbanSwimlane(null);
  backend.title = 'Backend';

  board.data.assignSwimlanes([frontend, backend]);

  // Cards
  const cards: KanbanCard[] = [];

  const c1 = new KanbanCard(null, todo.id);
  c1.title = 'Design login page';
  c1.priority = 'high';
  c1.tags = ['ui', 'auth'];
  c1.swimlaneId = frontend.id;
  cards.push(c1);

  const c2 = new KanbanCard(null, todo.id);
  c2.title = 'Write API tests';
  c2.priority = 'medium';
  c2.tags = ['testing'];
  c2.swimlaneId = backend.id;
  cards.push(c2);

  const c3 = new KanbanCard(null, inProgress.id);
  c3.title = 'Implement dashboard';
  c3.priority = 'critical';
  c3.tags = ['ui', 'feature'];
  c3.weight = 8;
  c3.swimlaneId = frontend.id;
  c3.assigneeIds = ['alice'];
  cards.push(c3);

  const c4 = new KanbanCard(null, inProgress.id);
  c4.title = 'User authentication API';
  c4.priority = 'high';
  c4.tags = ['auth', 'api'];
  c4.weight = 5;
  c4.swimlaneId = backend.id;
  c4.assigneeIds = ['bob'];
  cards.push(c4);

  const c5 = new KanbanCard(null, review.id);
  c5.title = 'Database migrations';
  c5.priority = 'medium';
  c5.tags = ['database'];
  c5.swimlaneId = backend.id;
  c5.assigneeIds = ['carol'];
  cards.push(c5);

  const c6 = new KanbanCard(null, done.id);
  c6.title = 'Project setup';
  c6.priority = 'none';
  c6.tags = ['infra'];
  cards.push(c6);

  const c7 = new KanbanCard(null, todo.id);
  c7.title = 'Responsive layout';
  c7.priority = 'low';
  c7.tags = ['ui'];
  c7.swimlaneId = frontend.id;
  cards.push(c7);

  const c8 = new KanbanCard(null, inProgress.id);
  c8.title = 'REST endpoints';
  c8.priority = 'high';
  c8.tags = ['api'];
  c8.weight = 3;
  c8.swimlaneId = backend.id;
  c8.assigneeIds = ['alice', 'bob'];
  cards.push(c8);

  board.data.assignCards(cards);

  // Assignee resolver
  board.assigneeResolver = (id) => {
    const users: Record<string, { name: string }> = {
      alice: { name: 'Alice Johnson' },
      bob: { name: 'Bob Smith' },
      carol: { name: 'Carol Williams' },
    };
    return users[id] ?? null;
  };
}

export default function App() {
  const ref = useRef<KanbanBoardRef>(null);

  useEffect(() => {
    if (!ref.current) return;
    buildSampleData(ref.current);

    const sub = ref.current.events.cardClick$.subscribe((args) => {
      console.log(`Card clicked: ${args.card.title}`);
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <div className="app">
      <h1>TimelineKit - Kanban Board</h1>
      <div className="toolbar">
        <button onClick={() => ref.current?.undo()}>Undo</button>
        <button onClick={() => ref.current?.redo()}>Redo</button>
        <button onClick={() => {
          if (!ref.current) return;
          const cols = [];
          for (let i = 0; i < ref.current.data.columnsLength; i++) {
            cols.push(ref.current.data.getColumn(i));
          }
          if (cols.length === 0) return;
          const card = new KanbanCard(null, cols[0]!.id);
          card.title = 'New Card';
          ref.current.data.addCard(card);
        }}>Add Card</button>
        <button onClick={() => {
          if (!ref.current) return;
          const col = new KanbanColumn(null);
          col.title = 'New Column';
          ref.current.data.addColumn(col);
        }}>Add Column</button>
      </div>
      <div className="board-container">
        <KanbanBoard ref={ref} />
      </div>
    </div>
  );
}
