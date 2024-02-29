
import { ReactNode } from 'react';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostPageProps {
  post: Post;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface CommentSectionProps {
  onCommentSubmit: (name: string, comment: string) => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}