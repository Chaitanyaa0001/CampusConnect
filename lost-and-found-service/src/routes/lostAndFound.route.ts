import { Router } from "express";
import { authenticate } from "auth-sdk";
import {createItemSchema,idParamSchema,listItemsQuerySchema,myItemsQuerySchema,validate,} from "../validator/validator.js";
import { upload, validateImage } from "../middleware/upload.js";
import { createItemLimiter } from "../middleware/ratelimit.js";
import { createItemController } from "../controllers/postLost&Found.controller.js";
import { listItemsController } from "../controllers/getAllLost&Found.controller.js";
import { getMyItemsController } from "../controllers/getLost&FoundByme.controller.js";
import { getItemByIdController } from "../controllers/getLost&FoundbyId.controller.js";
import { resolveItemController } from "../controllers/resolveitem.controller.js";
import { deleteItemController } from "../controllers/delete.controller.js";

const router = Router();

router.use(authenticate); // every route needs a logged-in user

// order matters: limiter (how often) -> multer (parse the form + the file) -> validate (the text
// fields, which only exist AFTER multer ran) -> validateImage (real bytes). Nothing is uploaded to
// Cloudinary until all of these passed.
router.post(
  "/",
  createItemLimiter,
  upload.single("image"),
  validate(createItemSchema, "body"),
  validateImage,
  createItemController
);

router.get("/", validate(listItemsQuerySchema, "query"), listItemsController);

// "/me" MUST stay above "/:id", otherwise "me" would be read as an item id
router.get("/me", validate(myItemsQuerySchema, "query"), getMyItemsController);

router.get("/:id", validate(idParamSchema, "params"), getItemByIdController);
router.patch("/:id/resolve", validate(idParamSchema, "params"), resolveItemController);
router.delete("/:id", validate(idParamSchema, "params"), deleteItemController);

export default router;