import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../../app/layout';
import styles from '../../styles/post.module.css';
import CommentSection from '../../components/CommentSection';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostPageProps {
  post: Post;
}

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (context) => {
  const { params, req } = context;
  const host = req.headers.host;
  const { id } = params || {};
  const response = await fetch(`http://${host}/api/posts/${id}`);
  const post: Post = await response.json();

  return {
    props: {
      post,
    },
  };
};

const PostPage = ({ post }: PostPageProps) => {
  const [comments, setComments] = useState<string[]>([]);

  const handleCommentSubmit = (comment: string) => {
    setComments([...comments, comment]);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.body.slice(0, 150)} />
      </Head>
      <div className={styles['post-container']}>
        <h1 className={styles['post-title']}>{post.title}</h1>
        <p className={styles['post-body']}>{post.body}</p>
        <p className={styles['post-author']}>Author: {post.userId}</p>
        <CommentSection onCommentSubmit={handleCommentSubmit} />
        <div className="mt-5">
          {comments.length > 0 && (
            <>
              <h2 className="text-xl font-bold mb-3">Comments:</h2>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index} className="mb-2">
                    {comment}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PostPage;
