
import http from 'http';
type Middleware = (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>,
    next: () => void
  ) => void;
  
  const middlewares: Middleware[] = [];
  
  export function use(middleware: Middleware) {
    middlewares.push(middleware);
  }
  
  export function runMiddlewares(
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>,
    finalHandler: () => void
  ) {
    let index = 0;
  
    function next() {
      const middleware = middlewares[index++];
      if (middleware) {
        middleware(req, res, next);
      } else {
        finalHandler();
      }
    }
  
    next();
  }
  