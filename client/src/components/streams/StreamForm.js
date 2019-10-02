import React from "react";
import { Field, reduxForm } from "redux-form";
import { categories } from "../categories";
import DropDownSelect from "./DropDownSelect";
class StreamForm extends React.Component {
  componentDidMount() {
    console.log(categories);
  }
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
    console.log(formValues);
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
              name="title"
              component={this.renderInput}
              label="Enter Title"
            />
            <Field
              name="description"
              component={this.renderInput}
              label="Enter Description"
            />
            {/* <Field
              name="category"
              component={this.renderInput}
              label="Category Description"
            /> */}
            <br />

            <label htmlFor="dropDownSelect">
              <strong>Select Category</strong>
            </label>
            <Field
              name="category"
              label="dropDownSelect"
              component={DropDownSelect}
              patterns={categories}
              className="form-control"
            ></Field>
            <br />
            <Field name="url" component={this.renderInput} label="Video URL" />
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

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate
})(StreamForm);
