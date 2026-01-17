import React from 'react';

export interface BaseLayoutProps {
  children: React.ReactNode;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  headerSlot,
  footerSlot,
}) => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50">
      <header className="w-full bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {headerSlot || (
            // Default Fallback Header Content (Can be removed or customized)
            <div className="font-bold text-xl text-blue-600">App Logo</div>
          )}
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="w-full bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {footerSlot || (
             // Default Fallback Footer Content
             <p className="text-center text-gray-500 text-sm">
               © {new Date().getFullYear()} My Application. All rights reserved.
             </p>
          )}
        </div>
      </footer>
    </div>
  );
};
