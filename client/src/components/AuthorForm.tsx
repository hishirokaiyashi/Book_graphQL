import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/client";
import { getAuthors } from "../graphql-client/query.js";
import { addSingleAuthor } from "../graphql-client/mutation.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const AuthorForm = () => {
    const [newAuthor, setNewAuthor] = useState({
        name: "",
        age:""
      });
    
      const [addAuthor, dataMutation] = useMutation(addSingleAuthor);
      const { name, age } = newAuthor;
    
      const handleOnInputChange = (event) => {
        setNewAuthor({
          ...newAuthor,
          [event.target.name]: event.target.value,
        });
      };
    
      const handleOnSubmit = (event) => {
        event.preventDefault();
        addAuthor({
          variables: {
            name,
            age:parseInt(age)
          },
          refetchQueries: [{ query: getAuthors }],
        });
        setNewAuthor({ name: "", age:"" });
      };

  return (
    <Col>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="invisible">
            <Form.Control />
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Author name" value={name} name="name" onChange={handleOnInputChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="number" placeholder="Author age" name="age" value={age} onChange={handleOnInputChange}/>
          </Form.Group>
          <Button className="float-right" variant="info" type="submit">
            Add Author
          </Button>
        </Form>
      </Col>
  )
}

export default AuthorForm