import { Response } from 'express';

export const success = (res: Response, data: unknown): void => {
  res.status(200).json({ success: true, data });
};

export const fail = (res: Response, code = 500, message = 'Internal Server Error'): void => {
  res.status(code).json({ success: false, message });
};
