import React from 'react';
import { useParams } from 'react-router-dom';
import { docsConfig } from './docsConfig';

const DocsContent: React.FC<{ page?: string }> = ({ page: propPage }) => {
  const { page: paramPage } = useParams();
  const page = paramPage || propPage || 'introduction';
  
  const content = docsConfig
    .flatMap(section => section.items)
    .find(item => item.slug === page);

  if (!content) {
    return (
      <div className="prose dark:prose-invert">
        <h1>Page Not Found</h1>
        <p>The requested documentation page could not be found.</p>
      </div>
    );
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </article>
  );
};

export default DocsContent;