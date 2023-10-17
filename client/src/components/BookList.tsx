import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";
import BookDetails from "./BookDetails";

import { useQuery } from "@apollo/client";
import { getBooks } from "../graphql-client/query.js";

const BookList = () => {
  const [bookSelected, setBookSelected] = useState(null);
  const { loading, error, data } = useQuery(getBooks);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books</p>;

  const handleSelectedBook = (id) => {
    setBookSelected(id)
  };

  return (
    <Row>
      <Col xs={8}>
        <CardGroup>
          {data.books.map((book) => (
            <Card
            key={book.id}
            border="info"
            text="info"
            className="text-center shadow"
            onClick={()=>handleSelectedBook(book.id)}
          >
            <Card.Body>{book.name}</Card.Body>
          </Card>
          ))}
        </CardGroup>
      </Col>
      <Col>
        <BookDetails bookId={bookSelected} />
      </Col>
    </Row>
  );
};

export default BookList;
