import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function FormExample({ onSubmit }) {
  const [validated, setValidated] = useState(false);
  const opRef = useRef(null);
  const urlRef = useRef(null);
  const logoRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      const formData = {
        op: opRef.current.value,
        url: urlRef.current.value,
        logo: logoRef.current.value,
      };
      onSubmit(formData,form, setValidated);
      form.reset();
      setValidated(false);
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="validationCustom01">
        <Form.Label>Enter Name</Form.Label>
        <Form.Control
          ref={opRef}
          required
          type="text"
          placeholder="MyItem"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="validationCustom02">
        <Form.Label>URL</Form.Label>
        <Form.Control
          ref={urlRef}
          type="text"
          placeholder="URL"
          required
          pattern="https?://.+"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid URL starting with http:// or https://
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="validationCustom03">
        <Form.Label>Logo</Form.Label>
        <Form.Control
          ref={logoRef}
          type="text"
          placeholder="Logo"
          required
          pattern="https?://.+"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid URL starting with http:// or https://
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default FormExample;