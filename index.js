'use strict';

var htmlParser = require('parse5');
var React = require('react');
var convertAttr = require('react-attr-converter');
var styleParser = require('./lib/style-parser');

const compose = (...fns) => arg => fns.reduceRight((prev, fn) => fn(prev), arg);

var renderNode = (renderNode) => {
  return (node, key) => {
    if (node.nodeName === '#text') {
      return node.value;
    }

    if (node.nodeName === '#comment') {
      return node.value;
    }

    var attr = node.attrs.reduce(function (result, attr) {
      var name = convertAttr(attr.name);
      result[name] = name === 'style' ? styleParser(attr.value) : attr.value;
      return result;
    }, {key: key});

    if (node.childNodes.length === 0) {
      return React.createElement(node.tagName, attr);
    }

    var children = node.childNodes.map(renderNode);
    return React.createElement(node.tagName, attr, children);
  };
};

// function applyMiddleware(list) {
//   return list.filter(x => x !== undefined).reduce((next, cb) => {
//     return (node, key) => cb((node, key) => next(node, key))(node, key);
//   }, (node, key) => { throw new Error('Unhandled'); });
// }

function applyMiddleware(...middlewares) {
  return renderNode => (node, key) => {
    const chain = middlewares.map(middleware => middleware(renderNode));
    return compose(...chain)(node, key);
  };
}

function prepareAST(html) {
  return htmlParser.parseFragment(html);
}

function renderAST(htmlAST, ...middlewares) {
  if (htmlAST.childNodes.length === 0) {
    return null;
  }
  const middleware = applyMiddleware(...middlewares);
  const finalRenderNode = (node, key) => middleware(finalRenderNode)(renderNode(finalRenderNode))(node, key);
  const result = htmlAST.childNodes.map(finalRenderNode);

  return result.length === 1 ? result[0] : result;
};

function renderHTML(html, ...middlewares) {
  return renderAST(prepareAST(html), ...middlewares);
};

exports.default = renderHTML;
exports.prepareAST = prepareAST;
exports.renderAST = renderAST;
exports.renderHTML = renderHTML;
exports.applyMiddleware = applyMiddleware;
