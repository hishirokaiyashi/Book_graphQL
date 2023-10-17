import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useQuery, useMutation } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql-client/query.js";
import { addSingleBook } from "../graphql-client/mutation.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BookForm = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const { loading, error, data } = useQuery(getAuthors);
  const [addBook, dataMutation] = useMutation(addSingleBook);
  const { name, genre, authorId } = newBook;

  const handleOnInputChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooks }],
    });
    setNewBook({ name: "", genre: "", authorId: "" });
  };
  return (
    <Col>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            name="name"
            placeholder="Book name"
            value={newBook.name}
            onChange={handleOnInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="genre"
            placeholder="Book genre"
            value={newBook.genre}
            onChange={handleOnInputChange}
          />
        </Form.Group>
        <Form.Group>
          {loading ? (
            <p>loading authors...</p>
          ) : (
            <Form.Control
              as="select"
              name="authorId"
              value={newBook.authorId}
              onChange={handleOnInputChange}
            >
              <option value="" disabled>
                Select author
              </option>
              {data.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </Form.Control>
          )}
        </Form.Group>
        <Button className="float-right" variant="info" type="submit">
          Add Book
        </Button>
      </Form>
    </Col>
  );
};

export default BookForm;
