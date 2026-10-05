import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("card-3d", className)}>
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-extrabold text-navy mb-6 pb-4 border-b-2 border-navy/10">
      {children}
    </h2>
  );
}
