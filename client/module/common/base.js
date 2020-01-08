import React from 'react';
import { connect as reduxConnect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, formValueSelector } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Validator from '../../util/validationUtil';
import utils from '../../util';
import { i18n } from '../../component/i18n';

const proxyHook = (WrapperComponent, injectProps) =>
  class BASE_HOC extends WrapperComponent {
    constructor(props) {
      super(props);
      // inject utilities from util/index.js to instances
      this.$utils = utils;
      this.validator = new Validator();
      // for convenience
      this.t = this.props.t;
    }

    setTitle = title => {
      if (utils.isClient()) {
        document.title = title;
      }
    };

    setBodyStyle = style => {
      Object.keys(style).forEach(k => {
        document.body.style[k] = style[k];
      });
    };

    toggleBodyClass = className => {
      document.body.classList.toggle(className);
    };

    listenLangChange = key => {
      this.setTitle(this.t(key));
    };

    componentDidMount() {
      // proxy the cdm function of containers then we can modify dom title
      const { title, i18nTitleKey } = injectProps;

      if (i18nTitleKey) {
        this.setTitle(this.t(i18nTitleKey));

        i18n.on('languageChanged', () => this.listenLangChange(i18nTitleKey));
      } else if (title) {
        document.title = title;
      }

      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }

    componentWillUnmount() {
      i18n.off('languageChanged', this.listenLangChange);
    }
  };

/**
 * wrap components with this magic HOC function
 * for some more useful functionalities
 */
function connect(Component, injectProps = {}) {
  const { fetchInitData, mapState, mapDispatch, form, formProps } = injectProps;

  const oriCom = Component;

  Component = proxyHook(Component, injectProps);

  // supply this.props.location... etc.
  let WrapperComponent = withTranslation()(
    withRouter(reduxConnect(mapState || (() => ({})), mapDispatch)(Component))
  );

  // if form prop of the container exists, we wrap the container with reduxForm for using `redux-form` functionalities.
  if (form) {
    WrapperComponent = reduxForm({
      form,
      ...formProps
    })(WrapperComponent);

    const selector = formValueSelector(form);

    /* eslint-disable no-param-reassign */
    oriCom.getFormValues = function getFormValues(state, names = []) {
      if (!names.length) {
        return {};
      } else if (names.length === 1) {
        const first = names[0];

        return { [first]: selector(state, first) };
      }
      return selector(state, ...names);
    };
  }

  WrapperComponent.fetchInitData = fetchInitData;

  return WrapperComponent;
}

export default connect;
