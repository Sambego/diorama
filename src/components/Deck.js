import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Swipe from 'react-easy-swipe';
import Keyboard from '../services/Keyboard';
import Navigation from './Navigation';

import '../styles/styles.css';

export default class Deck extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    footer: PropTypes.node,
    navigation: PropTypes.bool,
    swipeToChange: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    footer: undefined,
    navigation: false,
    swipeToChange: true,
  };

  state = {
    slide: Number(window.location.pathname.split('/')[1]) || 0,
  };

  constructor(props) {
    super(props);

    this.getPreviousSlide = ::this.getPreviousSlide;
    this.getNextSlide = ::this.getNextSlide;
    this.getSlide = ::this.getSlide;
  }

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

  getSlide(slideId) {
    this.setState(state => ({ ...state, slide: slideId }));
    window.history.pushState(undefined, undefined, slideId);
  }

  renderSlide = () => {
    const { slide } = this.state;
    const { children } = this.props;

    return cloneElement(children[slide], {
      index: slide,
      navigate: this.getSlide,
    });
  };

  render() {
    const {
      className, footer, navigation, swipeToChange,
    } = this.props;

    return (
      <Swipe
        onSwipeLeft={swipeToChange ? this.getNextSlide : undefined}
        onSwipeRight={swipeToChange ? this.getPreviousSlide : undefined}
        allowMouseEvents
      >
        <div className={`diorama diorama-deck ${className}`}>
          {footer && footer}
          {navigation && (
            <Navigation onPreviousSlide={this.getPreviousSlide} onNextSlide={this.getNextSlide} />
          )}
          {this.renderSlide()}
        </div>
      </Swipe>
    );
  }
}
