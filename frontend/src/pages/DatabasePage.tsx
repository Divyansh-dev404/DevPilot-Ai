import React from 'react';
import { Database, Key, Table } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';

export const DatabasePage: React.FC = () => {
  const schema = [
    {
      table: 'users',
      columns: [
        { name: 'id', type: 'UUID', isPk: true, isFk: false, isUnique: true },
        { name: 'email', type: 'VARCHAR(255)', isPk: false, isFk: false, isUnique: true },
        { name: 'hashed_password', type: 'VARCHAR(255)', isPk: false, isFk: false, isUnique: false },
        { name: 'created_at', type: 'TIMESTAMP', isPk: false, isFk: false, isUnique: false },
      ],
    },
    {
      table: 'repositories',
      columns: [
        { name: 'id', type: 'UUID', isPk: true, isFk: false, isUnique: true },
        { name: 'user_id', type: 'UUID', isPk: false, isFk: true, isUnique: false },
        { name: 'name', type: 'VARCHAR(255)', isPk: false, isFk: false, isUnique: false },
        { name: 'url', type: 'TEXT', isPk: false, isFk: false, isUnique: false },
        { name: 'status', type: 'VARCHAR(50)', isPk: false, isFk: false, isUnique: false },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <Database className="h-6 w-6 text-emerald-400" /> Database Visualizer & Entity ER Diagram
        </h1>
        <p className="text-xs text-slate-400">Auto-detected relational schemas, primary keys, foreign key constraints, and indices.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {schema.map((st) => (
          <GlassCard key={st.table} glow="cyan" className="p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Table className="h-5 w-5 text-cyan-400" />
              <h3 className="text-sm font-mono font-bold text-slate-100">{st.table}</h3>
            </div>
            <div className="space-y-2">
              {st.columns.map((col) => (
                <div key={col.name} className="flex items-center justify-between text-xs font-mono p-2 rounded bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2">
                    {col.isPk && <Key className="h-3.5 w-3.5 text-amber-400" />}
                    {col.isFk && <Key className="h-3.5 w-3.5 text-purple-400" />}
                    <span className="text-slate-200 font-semibold">{col.name}</span>
                  </div>
                  <span className="text-slate-400 text-[10px]">{col.type}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
