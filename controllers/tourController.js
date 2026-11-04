import fs from "fs"
import Tour from "../models/tourModel.js";

// ======================
// READ DATA
// ======================

const tours = JSON.parse(
  fs.readFileSync(`./dev-data/data/tours-simple.json`)
);

export const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }

  next();
};


export const checkID = (req, res, next, val) => {
  if (val > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  console.log(`Tour ID is: ${val}`);

  next();
}


// ---------- TOURS ----------

// GET ALL TOURS
export const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

// GET SINGLE TOUR
export const getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);


  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

// CREATE TOUR
export const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `./dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// UPDATE TOUR
export const updateTour = (req, res) => {

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

// DELETE TOUR
export const deleteTour = (req, res) => {

  res.status(204).json({
    status: "success",
    data: null,
  });
};
