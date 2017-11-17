/**
 * Async loader for scripts, styles
 *
 * @see https://davidwalsh.name/javascript-loader
 */

function finder(tag: string,
                url: string): Promise<string> {
  let element;
  switch (tag) {
    case 'link':
      element = document.head.querySelector(`link[href='${url}']`);
      break;
    case 'script':
      element = document.querySelector(`script[src='${url}']`);
      break;
  }
  return element? Promise.resolve(url) : null;
}

function loader(tag: string,
                url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let attr, element, parent;
    element = document.createElement(tag);
    switch (tag) {
      case 'link':
        attr = 'href';
        element.type = 'text/css';
        element.rel = 'stylesheet';
        parent = 'head';
        break;
      case 'script':
        attr = 'src';
        element.async = true;
        parent = 'body';
        break;
    }
    element.onload = () => resolve(url);
    element.onerror = () => reject(url);
    element[attr] = url;
    document[parent].appendChild(element);
  });
}

function setup(tag: string): Function {
  return (url: string) => {
    let promise = finder(tag, url);
    if (!promise)
      promise = loader(tag, url);
    return promise;
  };
}

export const AsyncLoader = {
  css: setup('link'),
  js:  setup('script')
};
