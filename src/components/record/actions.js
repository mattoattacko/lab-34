import superagent from "superagent";

const API = "https://javascript-401-api.herokuapp.com/api/v1";

export const getAll = model => dispatch => {
  let url = `${API}/${model}`;
  return superagent.get(url).then(data => {
    dispatch(runGetAll(data.body));
  });
};

const runGetAll = payload => {
  console.log("getting", payload.results);
  return {
    type: "GET",
    payload: payload
  };
};

export const postResource = (model, payload) => dispatch => {
  let url = `${API}/${model}`;
  return superagent
    .post(url)
    .send(payload)
    .then(data => {
      dispatch(runPost(data.body));
    });
};

const runPost = payload => {
  return {
    type: "POST",
    payload: payload
  };
};

export const destroy = payload => {
  return {
    type: "DELETE",
    payload: payload
  };
};

export const patch = payload => {
  return {
    type: "PATCH",
    payload: payload
  };
};

export const put = payload => {
  return {
    type: "PUT",
    payload: payload
  };
};
