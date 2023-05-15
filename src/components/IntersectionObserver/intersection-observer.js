export default class ObserverWrapper {
  constructor(callback) {
    this.createObserver(callback, {});
  }

  createObserver(callback, { root = null, rootMargin = '0px 0px 0px 0px', threshold = [0, 1] }) {
    this.intersectionObserver = new IntersectionObserver(
      this.fireListeners(callback),
      {
        root,
        rootMargin,
        threshold
      }
    );
  }

  observe = (node, callback) => {
    this.intersectionObserver.observe(node, callback);
  }

  unobserve = (node) => {
    this.intersectionObserver.unobserve(node);
  }

  fireListeners = (callback) => {
    return entries => {
      entries.forEach(entry => {
        callback(entry);
      });
    }
  }
}
