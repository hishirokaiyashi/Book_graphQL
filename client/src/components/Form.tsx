import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import BookForm from "./BookForm.js";
import AuthorForm from "./AuthorForm.js";

const Forms = () => {
  

  return (
    <Row>
		<BookForm/>
		<AuthorForm/>
    </Row>
  );
};

export default Forms;
