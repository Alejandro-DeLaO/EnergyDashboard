import React from 'react';
import CreateCommentSection from './components/CreateCommentSection';
import AllCommentsSection from './components/AllCommentsSection';

export default function CommentPage() {
  return(
    <section>
      <CreateCommentSection />
      <AllCommentsSection />
    </section>
  );
}