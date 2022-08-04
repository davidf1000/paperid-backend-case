import express, { Application, NextFunction, Request, Response } from "express";
import { DataSource } from "typeorm";
import myDataSource from "../models/db";
import { User } from "../models/user.models";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const getProfileUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.userId) {
      res.status(404).json({
        status: "error",
        data: null,
        message: "bad request",
      });
      return;
    }
    const foundUser = await myDataSource.getRepository(User).findOneBy({
      id: req.params.userId,
    });

    if (!foundUser) {
      res.status(404).json({
        status: "error",
        data: null,
        message: "user not found",
      });
      return;
    }
    const { username, id } = foundUser;
    res.status(200).json({
      status: "success",
      data: {
        userId: id,
        username: username,
      },
      message: "login success",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      data: error.message,
      message: "Problem with server",
    });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const foundUser = await myDataSource.getRepository(User).findOne({
      where: { username: username },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
    const comparePassword = await bcrypt.compare(
      password,
      foundUser ? foundUser.password : ""
    );
    console.log(comparePassword);

    if (!comparePassword || !foundUser) {
      res.status(403).json({
        status: "error",
        data: null,
        message: "password or user invalid",
      });
      return;
    }
    console.log(String(process.env.SECRET_JWT));

    const token = jwt.sign(
      { id: foundUser.id, username: foundUser.username },
      String(process.env.SECRET_JWT),
      {
        expiresIn: "1h",
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
    res.status(500).json({
      status: "error",
      data: error.message,
      message: "Problem with Server",
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
