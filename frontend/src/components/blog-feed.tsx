import axios from 'axios';
import { useEffect, useState } from 'react';
import FeaturedPostCard from '@/components/featured-post-card';
import LatestPostCard from '@/components/latest-post-card';
import CategoryPill from '@/components/category-pill';
import { categories } from '@/utils/category-colors';

export default function BlogFeed() {
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const categoryEndpoint =
      selectedCategory === 'featured'
        ? '/api/posts/featured'
        : `/api/posts/categories/${selectedCategory}`;

    axios
      .get(import.meta.env.VITE_API_PATH + categoryEndpoint)
      .then((response) => {
        console.log('Fetching:', import.meta.env.VITE_API_PATH + categoryEndpoint);
        console.log('Response Data:', response.data);
        console.log('Response Type:', typeof response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedCategory]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_PATH + '/api/posts/latest')
      .then((response) => {
        setLatestPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="mx-auto my-6">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full p-4 sm:w-2/3">
          <div className="-mb-1 cursor-text text-base tracking-wide text-slate-500 dark:text-dark-tertiary">
            What's hot?
          </div>
          <h1 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
            {selectedCategory === 'featured'
              ? 'Featured Posts'
              : `Posts related to "${selectedCategory}"`}
          </h1>
          <div className="flex flex-col gap-6">
            {Array.isArray(posts) && posts.length > 0
              ? posts
                .slice(0, 5)
                .map((post, index) => <FeaturedPostCard key={index} post={post} />)
              : <div>No posts available or error loading posts.</div>}
          </div>
        </div>
        <div className="w-full p-4 sm:w-1/3">
          <div className="mb-6">
            <div className="-mb-1 cursor-text text-base tracking-wide text-light-tertiary dark:text-dark-tertiary">
              Discover by topic
            </div>
            <h2 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
              Categories
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  name="category"
                  key={category}
                  aria-label={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(selectedCategory === category ? 'featured' : category)
                  }
                >
                  <CategoryPill category={category} selected={selectedCategory === category} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="-mb-1 cursor-text text-base tracking-wide text-slate-500 dark:text-dark-tertiary">
              What's new?
            </div>
            <h2 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
              Latest Posts
            </h2>
            <div className="flex flex-col gap-4">
              {Array.isArray(latestPosts) && latestPosts.length > 0
                ? latestPosts
                  .slice(0, 5)
                  .map((post, index) => <LatestPostCard key={index} post={post} />)
                : <div>No latest posts available.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
