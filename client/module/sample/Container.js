import React, { Component } from 'react';
import connect from '../common/base';
import actions from './action';

import style from './style.scss';

class Container extends Component {
  navTo = path => () => {
    this.props.navTo({ path });
  };

  render() {
    const { isLoading } = this.props;
    return (
      <div className={style.container}>
        This is a sample
        <br />
        <button onClick={isLoading ? null : this.props.submit}>
          Test a network invocation
          {isLoading ? '...' : ''}
        </button>
      </div>
    );
  }
}

export default connect(Container, {
  title: 'Sample',
  mapState: state => ({
    ...state.module.sample,
    isLoading: state.common.loadings.has('sample')
  }),
  mapDispatch: {
    ...actions
  }
});
