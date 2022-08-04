import express, { Application, NextFunction, Request, Response } from "express";

export const userLogin = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "User Login",
  });
};

export const userRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "User Register",
  });
};
