import React from "react";
import { Field, reduxForm } from "redux-form";
class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    // console.log(formValues);
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <div className="ui grid">
          <div className="six wide column">
            <Field
              name="category"
              component={this.renderInput}
              type="text"
              label="Category Selected"
            />

            <Field name="url" component={this.renderInput} label="Video URL" />

            <Field
              name="description"
              component={this.renderInput}
              label="Enter Description"
            />
          </div>
          <div className="six wide column">
            <Field
              name="bookmark1"
              component={this.renderInput}
              label="Bookmark1 Description"
            />
            <Field
              name="bookmark2"
              component={this.renderInput}
              label="Bookmark2 Description"
            />

            <Field
              name="bookmark3"
              component={this.renderInput}
              label="Bookmark3 Description"
            />
            <Field
              name="bookmark4"
              component={this.renderInput}
              label="Bookmark4 Description"
            />
          </div>
          <div className="four wide column">
            <Field
              name="time1"
              component={this.renderInput}
              label="Bookmark1 Time (secs)"
            />
            <Field
              name="time2"
              component={this.renderInput}
              label="Bookmark2 Time (secs)"
            />
            <Field
              name="time3"
              component={this.renderInput}
              label="Bookmark3 Time (secs)"
            />
            <Field
              name="time4"
              component={this.renderInput}
              label="Bookmark4 Time (secs)"
            />
          </div>
        </div>
        <br />
        <br />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.category) {
    errors.category = "You must enter a category";
  }

  if (!formValues.url) {
    errors.url = "You must enter a url";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
  enableReinitialize: true
})(StreamForm);
