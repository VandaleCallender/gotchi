import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DocsSidebar from './DocsSidebar';
import DocsContent from './DocsContent';

const Documentation: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <DocsSidebar />
      <main className="flex-1 overflow-auto">
        <div className="container max-w-4xl px-8 py-12">
          <Routes>
            <Route path="/" element={<DocsContent page="introduction" />} />
            <Route path="/:page" element={<DocsContent />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Documentation;