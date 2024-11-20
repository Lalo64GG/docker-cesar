import { Request, Response } from "express";
import { query } from "../config/db";

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const sql = "SELECT id, email, password FROM user WHERE email = ? AND password = ?";
    const [rows]: any = await query(sql, [email, password]);

    console.log(rows.length);

    if (rows.length === 0) {
      return res.status(204).json({
        message: "User not found",
      });
      
    }

    return res.status(200).json({
      message: "User found",
      user: rows[0],
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};
