import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import createStore from "../../store";
import App from "../../components/app.js";
import List from "../../components/record/list.js";
import Record from "../../components/record/record.js";

describe("<App/> (Enzyme Test)", () => {
  let store, wrapper;

  beforeEach(() => {
    store = createStore();
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("is alive at application start", () => {
    expect(wrapper.find("div h3").exists()).toBeTruthy();
  });

  // it('can count up', () => {
  //   expect(true).toBeTruthy();
  //   let app = mount(<Counter />);
  //   app.find('.up').simulate('click');
  //   expect(app.state('count')).toEqual(1);
  //   app.find('.up').simulate('click');
  //   expect(app.state('count')).toEqual(2);
  // });
});

// describe("<Record /> (Enzyme Test)", () => {
//   let store, wrapper;

//   beforeEach(() => {
//     store = createStore();
//     wrapper = mount(
//       <Provider store={store}>
//         <Record />
//       </Provider>
//     );
//   });

//  console.log('wrapper', wrapper);
//   it("is alive at application start - can find the a tag", () => {
//     expect(wrapper.find("div").exists()).toBeTruthy();
//   });
// });
