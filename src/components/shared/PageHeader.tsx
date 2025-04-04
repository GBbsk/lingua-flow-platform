
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <div className="pb-6 mb-8 border-b relative">
      <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-primary/20 to-primary/5 rounded-br-3xl -z-10"></div>
      <div className="flex justify-between items-center py-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground mt-2 max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};
