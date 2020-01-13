import React, { Component } from 'react';
import connect from 'common/dist/client/base';
import actions from './action';
import style from './style.scss';

class Container extends Component {
  onSuccess = (res, modelName) => {
    console.log(res, modelName);
    if (modelName === 'user') {
      this.props.showToast({ msg: '用户添加成功' });
    }
  };

  onError = (e, res, modelName) => {
    console.log(e, res, modelName);
    if (modelName === 'user') {
      this.props.showToast({ msg: '用户添加成功' });
    }
  };

  navTo = path => () => {
    this.props.navTo({ path });
  };

  saveUser = () => {
    this.model.create('user', {
      username: 'friday'
    });
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
        <button onClick={this.saveUser}>create a user</button>
        <button onClick={this.navTo('/login')}>nav to login</button>
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
