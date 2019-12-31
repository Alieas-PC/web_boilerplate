import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from '@module/common/base';

import { setCommonState } from '@module/common/action';

import Toast from '../../module/common/component/toast';

class Commons extends PureComponent {
  static mapState = state => ({
    toastMsg: state.common.toastMsg
  });

  static mapDispatch = {
    setCommonState
  };

  render() {
    const { toastMsg } = this.props;

    return (
      <React.Fragment>
        <Toast
          text={toastMsg}
          open={!!toastMsg}
          onClose={() => {
            this.props.setCommonState({ toastMsg: null });
          }}
        />
      </React.Fragment>
    );
  }
}

Commons.propTypes = {
  setCommonState: PropTypes.func,
  toastMsg: PropTypes.any
};

Commons.defaultProps = {
  setCommonState: () => {},
  toastMsg: null
};

export default connect(Commons);
