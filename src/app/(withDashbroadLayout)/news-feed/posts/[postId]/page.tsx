'use client';

import React from 'react';
import PostDetails from '../../../_component/module/postDetails';

interface TPostDetailsPage {
  params: {
    postId: string;
  };
}

export default function PostDetailsPage({ params }: TPostDetailsPage) {
  const { postId } = params;

  return (
    <div>
      <PostDetails postId={postId} />
    </div>
  );
}
