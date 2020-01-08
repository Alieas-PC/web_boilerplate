import React, { Component } from 'react';

import { Button, Box, Typography } from '@material-ui/core';

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
        <Box px={2} py={2}>
          <Typography>This is a sample</Typography>
          <Button
            onClick={isLoading ? null : this.props.submit}
            variant="contained"
          >
            Test a network invocation
            {isLoading ? '...' : ''}
          </Button>
        </Box>
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
