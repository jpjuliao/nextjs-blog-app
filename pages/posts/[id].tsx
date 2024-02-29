import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../../app/layout';
import styles from '../../styles/post.module.css';
import CommentSection from '../../components/CommentSection';
import {Post, PostPageProps} from '../../types'

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
  const [comments, setComments] = useState<{ 
    name: string; comment: string }[]>([]);

  const handleCommentSubmit = (name: string, comment: string) => {
    setComments([...comments, { name, comment }]);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.body} />
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
                    <strong>{comment.name}: </strong>
                    {comment.comment}
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
