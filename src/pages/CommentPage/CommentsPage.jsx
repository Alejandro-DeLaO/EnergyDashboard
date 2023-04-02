import React from 'react';
import { CommentProvider } from '../../context/CommentContext';
import CommentsSection from './components/CommentsSection';

export default function CommentPage() {
  return(
    <CommentProvider>
      <section>
        <CommentsSection />
      </section>
    </CommentProvider>
  );
}