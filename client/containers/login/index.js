import React, { Component } from 'react';
import connect from 'common/dist/client/base';
import {
  moduleStateActionCreator,
  setLoadingState,
  navTo,
  showToast
} from 'common/dist/client/action';

class Container extends Component {
  navTo = path => () => {
    this.props.navTo({ path });
  };

  render() {
    return (
      <div>
        Login page
        <button onClick={this.navTo('/')}>Nav back</button>
      </div>
    );
  }
}

export default connect(Container, {
  title: 'Login',
  mapDispatch: {
    navTo
  }
});
