import { Request, Response, NextFunction } from 'express';

function trafficMiddleware(req: Request, res: Response, next: NextFunction): void {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  console.log(`[${timestamp}] ${method} ${url}`);

  next();
}

export default trafficMiddleware;
