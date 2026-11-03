import express from "express"
import { getAllTours, getTour, createTour, checkID, checkBody, updateTour, deleteTour } from "../controllers/tourController.js";

const router= express.Router()

router.param("id", checkID)

// ======================
// TOUR ROUTES
// ======================

router
  .route("/")
  .get(getAllTours)
  .post(checkBody, createTour);

router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

export default router