import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Keyboard from '../services/Keyboard';

import '../styles/styles.css';

export default class Deck extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    footer: PropTypes.node,
  };

  static defaultProps = {
    className: '',
    footer: undefined,
  };

  state = {
    slide: Number(window.location.pathname.split('/')[1]) || 0,
  };

  componentWillMount() {
    this.KeyboardLeftListener = Keyboard.on('left', () => this.getPreviousSlide());
    this.KeyboardRightListener = Keyboard.on('right', () => this.getNextSlide());
    this.KeyboardUpListener = Keyboard.on('page up', () => this.getPreviousSlide());
    this.KeyboardDownListener = Keyboard.on('page down', () => this.getNextSlide());
  }

  componentWillUnmount() {
    Keyboard.off(this.KeyboardLeftListener);
    Keyboard.off(this.KeyboardRightListener);
    Keyboard.off(this.KeyboardUpListener);
    Keyboard.off(this.KeyboardDownListener);
  }

  getPreviousSlide() {
    const { slide } = this.state;

    if (slide === 0) {
      return;
    }

    this.setState(state => ({ ...state, slide: slide - 1 }));

    window.history.pushState(undefined, undefined, slide - 1);
  }

  getNextSlide() {
    const { slide } = this.state;
    const { children } = this.props;

    if (slide === children.length - 1) {
      return;
    }

    this.setState(state => ({ ...state, slide: slide + 1 }));
    window.history.pushState(undefined, undefined, slide + 1);
  }

  renderSlide = () => {
    const { slide } = this.state;
    const { children } = this.props;

    return cloneElement(children[slide], {
      index: slide,
    });
  };

  render() {
    const { className, footer } = this.props;
    return (
      <div className={`diorama diorama-deck ${className}`}>
        {footer && footer}
        {this.renderSlide()}
      </div>
    );
  }
}
