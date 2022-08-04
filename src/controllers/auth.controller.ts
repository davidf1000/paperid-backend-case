import express, { Application, NextFunction, Request, Response } from "express";
import { DataSource } from "typeorm";
import myDataSource from "../models/db";
import { User } from "../models/user.models";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getProfileUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "getProfileUser",
  });
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const foundUser = await myDataSource.getRepository(User).findOne({
      where: { username: username },
    });
    const comparePassword = await bcrypt.compare(
      password,
      foundUser ? foundUser.password : ""
    );
    if (!comparePassword || !foundUser) {
      res.status(403).json({
        status: "error",
        data: null,
        message: "password or user invalid",
      });
      return;
    }
    const token = jwt.sign(
      { id: foundUser.id, username: foundUser.username },
      "secret_key",
      {
        expiresIn: "1 hours",
      }
    );
    const responseData = {
      userId: foundUser.id,
      token: token,
    };
    res.status(200).json({
      status: "success",
      data: responseData,
      message: "login success",
    });
  } catch (error: any) {
    res.status(405).json({
      status: "error",
      data: error.message,
      message: "user not found",
    });
  }
};

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundUser = await myDataSource.getRepository(User).findOne({
      where: { username: req.body.username },
    });
    if (foundUser) {
      res.status(401).json({
        status: "error",
        data: null,
        message: "user already exists",
      });
      return;
    }
    const { username, password } = req.body;
    await myDataSource.getRepository("User").save({
      username: username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
    });
    res.status(201).json({
      status: "success",
      data: null,
      message: "user created",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      data: error.message,
      message: "user not found",
    });
  }
};
