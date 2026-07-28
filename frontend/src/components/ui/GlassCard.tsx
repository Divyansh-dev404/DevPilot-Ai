import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'cyan' | 'purple' | 'none';
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<CardProps> = ({
  children,
  className,
  glow = 'none',
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'glass-panel rounded-xl p-6 transition-all duration-300 relative overflow-hidden',
        hoverEffect && 'glass-panel-hover',
        glow === 'cyan' && 'glow-cyan',
        glow === 'purple' && 'glow-purple',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
