import { Request, Response, Router } from "express";
import Hotel from "../models/hotel";
import User from "../models/user";

const router = Router();

router.post("/reset", async (req: Request, res: Response) => {
  try {
    await User.deleteMany({});
    await Hotel.deleteMany({});

    res.status(200).end();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
