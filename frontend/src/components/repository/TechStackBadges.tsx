import React from 'react';
import { Badge } from '../ui/Badge';

export const TechStackBadges: React.FC<{
  languages: Record<string, number>;
  frameworks: string[];
  databases: string[];
}> = ({ languages, frameworks, databases }) => {
  return (
    <div className="space-y-4">
      {/* Languages */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Languages</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(languages).map(([lang, pct]) => (
            <Badge key={lang} variant="cyan" className="py-1 px-3">
              {lang} <span className="text-[10px] text-slate-400 ml-1">{pct}%</span>
            </Badge>
          ))}
        </div>
      </div>

      {/* Frameworks */}
      {frameworks.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Frameworks & Libraries</h4>
          <div className="flex flex-wrap gap-2">
            {frameworks.map((fw) => (
              <Badge key={fw} variant="purple" className="py-1 px-3">
                {fw}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Databases */}
      {databases.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Databases & Infrastructure</h4>
          <div className="flex flex-wrap gap-2">
            {databases.map((db) => (
              <Badge key={db} variant="emerald" className="py-1 px-3">
                {db}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
