import React from "react";
import { connect } from "react-redux";
import Form from "react-jsonschema-form";
import superagent from "superagent";
import * as actions from "./actions.js";

const uiSchema = {
  _id: { "ui:widget": "hidden" },
  __v: { "ui:widget": "hidden" }
};

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schema: {} };
  }

  async componentDidMount() {
    let url = `https://javascript-401-api.herokuapp.com/api/v1/${
      this.props.model
    }/schema`;
    let data = await superagent.get(url);
    this.setState({ schema: data.body });
  }

  resetPlayer = id => {
    this.setState({ id: null });
  };

  handleSubmit = form => {
    let formData = form.formData;

    if (parseInt(this.props.id) >= 0) {
      this.props.handlePut({
        id: this.props.id,
        model: this.props.model,
        record: formData
      });
    } else {
      this.props.handlePost({ model: this.props.model, record: formData });
    }
  };

  render() {
    return (
      <div>
        <h3>Edit Record {this.props.id}</h3>
        <Form
          schema={this.state.schema}
          uiSchema={uiSchema}
          formData={this.props.records[this.props.model][this.props.id]}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  records: state.records
});

const mapDispatchToProps = (dispatch, getState) => ({
  handlePost: (model, record) => dispatch(actions.postResource(model, record)),
  handlePut: payload => dispatch(actions.put(payload)),
  handlePatch: payload => dispatch(actions.patch(payload)),
  getSchema: model => dispatch(actions.getSchema)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Record);
