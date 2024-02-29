import Link from 'next/link';
import styles from './PostCard.module.css';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const summary = post.body.split(' ').slice(0, 50).join(' ');

  return (
    <div className={styles['post-card']}>
      <h2>{post.title}</h2>
      <p>{summary}...</p>
      <Link href={`/posts/${post.id}`}>
        <span className="text-blue-600">Read more</span>
      </Link>
    </div>
  );
};

export default PostCard;
