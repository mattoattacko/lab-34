import React from "react";
import { connect } from "react-redux";

import style from "./record.module.scss";

import Record from "./record.js";

import * as actions from "./actions.js";

class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: null };
  }

  componentDidMount() {
    this.props.getAll(this.props.model);
  }

  deleteRecord = id => {
    this.props.handleDelete({ model: this.props.model, id: id });
  };

  editRecord = id => {
    this.setState({ id });
  };

  reset = () => {
    let id = null;
    this.setState({ id });
  };

  render() {
    return (
      <div className={style}>
        <button onClick={this.reset}>Add New</button>
        <ul className={style.list}>
          {this.props.records[this.props.model].results.map((record, idx) => (
            <li key={idx}>
              {record.name}
              <button onClick={() => this.editRecord(idx)}>Edit</button>
              <button onClick={() => this.deleteRecord(idx)}>Delete</button>
            </li>
          ))}
        </ul>
        <Record model={this.props.model} id={this.state.id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  records: state.records
});

const mapDispatchToProps = (dispatch, getState) => ({
  handlePost: record => dispatch(actions.postResource(record)),
  getAll: model => dispatch(actions.getAll(model)),
  handleDelete: id => dispatch(actions.destroy(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Records);
