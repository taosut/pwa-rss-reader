import React, { FC } from 'react';
import { Alert, Button, ButtonToolbar, Table } from 'react-bootstrap';
import BlogName from '../../../components/BlogName';
import Loader from '../../../components/Loader';
import { Blog } from '../../../models/Blog';
import { Category } from '../../../models/Category';

type BlogTableProps = {
  blogs: Blog[];
  categories: Category[];
  loading?: boolean;
  removing?: boolean;
  selectedId?: string;
  error?: string;
  onUpdate: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
};

const BlogTable: FC<BlogTableProps> = ({
  blogs,
  categories,
  loading,
  removing,
  selectedId,
  error,
  onUpdate,
  onDelete,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const isRemovingCurrentRow = (id: string): boolean => {
    return !!removing && selectedId === id;
  };

  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {blogs.map(blog => (
          <tr key={blog.id}>
            <td>
              <a href={blog.link} target="_blank" rel="noopener noreferrer">
                <BlogName blog={blog} />
              </a>
            </td>
            <td>{categories.find(category => category.id === blog.categoryId)?.name}</td>
            <td>
              <ButtonToolbar>
                <Button size="sm" onClick={() => onUpdate(blog)}>
                  <span className="fas fa-pen" aria-label="Edit" />
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(blog)}
                  disabled={isRemovingCurrentRow(blog.id)}
                >
                  {isRemovingCurrentRow(blog.id) ? (
                    <span className="fas fa-spin fa-spinner" aria-label="Delete" />
                  ) : (
                    <span className="fas fa-trash" aria-label="Removing" />
                  )}
                </Button>
              </ButtonToolbar>
            </td>
          </tr>
        ))}
        {!blogs.length && (
          <tr>
            <td colSpan={3}>No results.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default BlogTable;
