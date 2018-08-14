import React from 'react'
import { Field, reduxForm } from 'redux-form'

const ContactFormFunction = props => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      {/* form body*/}
    </form>
  );
};

export const ContactForm = reduxForm({
  form: 'calculator'
})(ContactFormFunction)

