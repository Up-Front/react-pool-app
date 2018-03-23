export class Device {
  static factory(isTouch) {
    return isTouch ? new Touch() : new Mouse();
  }
}

export class Touch extends Device {
  getPageX(e) {
    return e.targetTouches[0].pageX;
  }

  getStartEventName() {
    return 'touchstart';
  }

  getInteractEventName() {
    return 'touchmove';
  }

  getStopEventNames() {
    return ['touchend'];
  }
}

export class Mouse extends Device {
  getPageX(e) {
    return e.pageX;
  }

  getStartEventName() {
    return 'mousedown';
  }

  getInteractEventName() {
    return 'mousemove';
  }

  getStopEventNames() {
    return ['mouseup', 'mouseleave'];
  }
}

export default Device;
