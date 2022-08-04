import express, { Application, NextFunction, Request, Response } from "express";


export const getProfileUser = (req: Request, res: Response, next: NextFunction) => {
    res.json({
      message: "getProfileUser",
    });
  };

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
