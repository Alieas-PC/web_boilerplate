import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import { hot } from 'react-hot-loader/root';

import { bindActionCreators } from 'redux';

import ClipboardJS from 'clipboard';

import CssBaseline from '@material-ui/core/CssBaseline';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './component/i18n';

import { navTo, setCommonState, showToast } from './module/common/action';

import connect from './module/common/base';

import { routes } from './routes';

import * as style from './style.scss';

import Commons from './component/commons';

const theme = createMuiTheme({
  overrides: {},
  palette: {},
  typography: {}
});

class App extends Component {
  state = { routes };

  UNSAFE_componentWillMount() {
    this.props.setCommonState({
      // avoid 'has' method missing while server output a Set of state to the client
      loadings: new Set()
    });
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    new ClipboardJS('.copy').on('success', () => {
      this.props.showToast({ msg: '已复制' });
    });
  }

  render() {
    const { redirectTo } = this.props;

    return (
      <div className={style.container}>
        {redirectTo ? <Redirect to={redirectTo} /> : null}
        <Commons />
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Switch>
            {this.state.routes.map(({ path, Component: C, key }) => (
              <Route exact key={key || path} path={path} component={C} />
            ))}
          </Switch>
        </ThemeProvider>
      </div>
    );
  }
}

export default hot(
  connect(App, {
    mapState: ({ common: { redirectTo } }) => ({
      redirectTo
    }),

    mapDispatch: dispatch => ({
      ...bindActionCreators(
        {
          navTo,
          setCommonState,
          showToast
        },
        dispatch
      ),
      dispatch
    })
  })
);
