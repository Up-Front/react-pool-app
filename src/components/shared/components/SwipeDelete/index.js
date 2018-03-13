import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isMobile from './utils/isMobile';
import Device from './utils/device';
import {
  SwipeWrapper,
  DeleteLayer,
  SwipeContentWrapper,
  SwipeContent
} from './styles';

class SwipeDelete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleted: false,
      deleteDirection: null,
      deleteCancel: false
    };

    this.deleteSwipe = 0.5;
    this.startX = 0;
    this.device = Device.factory(isMobile.any());

    this.addHandlers = this.addHandlers.bind(this);
    this.interact = this.interact.bind(this);
    this.moveAt = this.moveAt.bind(this);
    this.stopInteract = this.stopInteract.bind(this);
    this.offInteract = this.offInteract.bind(this);
    this.endInteract = this.endInteract.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  render() {
    if (this.state.isDeleted) {
      return null;
    }

    return (
      <SwipeWrapper>
        <DeleteLayer key="delete">DEL</DeleteLayer>
        <SwipeContentWrapper
          key="content"
          innerRef={el => (this.regionContent = el)}
        >
          <SwipeContent
            deleteDirection={this.state.deleteDirection}
            deleteCancel={this.state.deleteCancel}
          >
            {this.props.children}
          </SwipeContent>
        </SwipeContentWrapper>
      </SwipeWrapper>
    );
  }

  componentDidMount() {
    this.addHandlers();
  }

  addHandlers() {
    this.step = this.startInteract()
      .then(this.interact)
      .then(this.stopInteract)
      .then(this.endInteract)
      .catch(this.addHandlers);
  }

  startInteract() {
    return new Promise(resolve => {
      this.onInteract = e => {
        el.removeEventListener(
          this.device.getStartEventName(),
          this.onInteract,
          false
        );
        this.startX = this.device.getPageX(e);
        resolve();
      };
      const el = this.regionContent.firstChild;
      el.addEventListener(
        this.device.getStartEventName(),
        this.onInteract,
        false
      );
    });
  }

  interact() {
    document.addEventListener(
      this.device.getInteractEventName(),
      this.moveAt,
      false
    );
  }

  offInteract() {
    document.removeEventListener(
      this.device.getInteractEventName(),
      this.moveAt,
      false
    );
  }

  moveAt(e) {
    const target = this.regionContent.firstChild;
    const res = this.device.getPageX(e) - this.startX;

    target.style.left = `${res}px`;
  }

  stopInteract() {
    return new Promise((resolve, reject) => {
      const el = this.regionContent.firstChild;

      this._onStopInteract = e => this.onStopInteract(e, resolve, reject);

      this.device
        .getStopEventNames()
        .forEach(eventName =>
          el.addEventListener(eventName, this._onStopInteract, false)
        );
    });
  }

  onStopInteract(e, resolve, reject) {
    const el = this.regionContent.firstChild;

    this.offInteract();
    this.device
      .getStopEventNames()
      .forEach(eventName =>
        el.removeEventListener(eventName, this._onStopInteract, false)
      );

    const shift = e.currentTarget.offsetLeft;
    !shift ? reject() : resolve();
  }

  endInteract() {
    const target = this.regionContent.firstChild;
    const swipePercent = this.getSwipePercent();

    const promise = new Promise((resolve, reject) => {
      if (this.isDelete(swipePercent)) {
        target.addEventListener('transitionend', e => resolve(e), false);
        swipePercent < 0
          ? this.setState({ deleteDirection: 'left' })
          : this.setState({ deleteDirection: 'right' });
      } else {
        target.addEventListener('transitionend', e => reject(e), false);
        this.setState({ deleteCancel: true });
      }
    });

    promise.then(this.onDelete, this.onCancel);

    return promise;
  }

  getSwipePercent() {
    const shift = this.regionContent.firstChild.offsetLeft;
    const width = this.regionContent.clientWidth;

    return this.calcSwipePercent({ shift, width });
  }

  isDelete(percent) {
    return (
      (percent > 0 && percent >= this.deleteSwipe) ||
      (percent < 0 && percent <= -this.deleteSwipe)
    );
  }

  calcSwipePercent({ shift, width }) {
    return shift / width;
  }

  onDelete() {
    this.setState({ isDeleted: true });
    this.props.onDelete(this.props.deleteId);
  }

  onCancel(e) {
    const target = e.currentTarget;
    this.setState({ deleteCancel: false });
    this.setState({ deleteDirection: null });

    this.startX = target.style.left = 0;
  }
}

SwipeDelete.defaultProps = {
  tag: 'div',
  onDelete: () => {}
};

SwipeDelete.propTypes = {
  children: PropTypes.element.isRequired,
  onDelete: PropTypes.func,
  deleteId: PropTypes.string,
  tag: PropTypes.string
};

export default SwipeDelete;
