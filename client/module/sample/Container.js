import React, { Component } from 'react';
import connect from '@module/common/base';
import actions from './action';

import style from './style.scss';

class Container extends Component {
  static title = 'Sample';
  static mapState = state => ({
    ...state.module.sample,
    isLoading: state.common.loadings.has('sample')
  });
  static mapDispatch = {
    ...actions
  };

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

export default connect(Container);
