const isMobile = {
  Android() {
    return navigator.userAgent.match(/Android/i);
  },

  iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },

  Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },

  any() {
    return this.Android() || this.iOS() || this.Windows();
  },
};

export default isMobile;
