/* <reference types="@types/react" /> */

declare module "zaibot-react-render-html" {
  export default function renderHTML(html: string, ...middlewares: ((renderNode) => (node, key) => React.ReactInstance)[]): React.ReactInstance;
  export function applyMiddleware(...middlewares: ((renderNode) => (node, key) => React.ReactInstance)[]): ((renderNode) => (node, key) => React.ReactInstance);
}
