import { schema } from 'normalizr';
import { Category, categorySchema } from '../../category/models/Category';

export interface Blog {
  id: string;
  name: string;
  slug: string;
  link: string;
  rss: string;
  icon: string;
  categoryId: string;

  // only frontend
  category?: Category;
}

export const blogSchema = new schema.Entity(
  'blogs',
  { category: categorySchema },
  { processStrategy: (value: Blog) => ({ ...value, category: value.categoryId }) },
);

export const blogSortComparer = (a: Blog, b: Blog) => a.name.localeCompare(b.name);

export interface SaveBlog {
  id?: string;
  rss: string;
  categoryId: string;
}
