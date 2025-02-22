import { Request, Response, Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body, validationResult } from "express-validator";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

// api/my-hotels
router.post(
  "/",
  verifyToken,
  upload.array("imageFiles", 6),
  [
    body("name", "Name is required").notEmpty(),
    body("city", "City is required").notEmpty(),
    body("country", "Country is required").notEmpty(),
    body("description", "Description is required").notEmpty(),
    body("type", "Hotel type is required").notEmpty(),
    body(
      "childCount",
      "The number of children is required and must be a number"
    ).isNumeric(),
    body(
      "adultCount",
      "The number of adults is required and must be a number"
    ).isNumeric(),
    body("facilities").custom((value) => {
      if (!value) throw new Error("Facilities are required");
      try {
        const isArray = Array.isArray(value);
        if (!isArray) {
          throw new Error("Facilities must be an array");
        } else {
          return isArray;
        }
      } catch (error) {
        throw new Error("Facilities must be an array");
      }
    }),
    body("pricePerNight", "Price per night is required and must be a number")
      .notEmpty()
      .isNumeric(),
    body("starRating", "starRating is required").isNumeric(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const imageFiles = req.files as Express.Multer.File[];

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      const newHotel: HotelType = {
        ...req.body,
        userId: req.userId,
        lastUpdated: new Date(),
        imageUrls: imageUrls,
      };

      const createdHotel = new Hotel(newHotel);
      await createdHotel.save();

      res.status(201).json({ createdHotel });
    } catch (error) {
      console.log(`Error creating hotel: ${error}`);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const hotels = await Hotel.find({ userId: userId });

    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
