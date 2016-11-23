/* <reference types="@types/react" /> */

declare module "zaibot-react-render-html" {
  export default function renderHTML(html: string, ...middlewares: ((renderNode) => (next) => (node, key) => React.ReactInstance)[]): React.ReactInstance;
  export function prepareAST(html: string): any;
  export function renderAST(htmlAST: any, ...middlewares: ((renderNode) => (next) => (node, key) => React.ReactInstance)[]): React.ReactInstance;
  export function applyMiddleware(...middlewares: ((renderNode) => (next) => (node, key) => React.ReactInstance)[]): ((renderNode) => (node, key) => React.ReactInstance);
}
