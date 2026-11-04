import Tour from "../models/tourModel.js";

// ======================
// READ DATA
// ======================

export const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }

  next();
};

// ---------- TOURS ----------

// GET ALL TOURS
export const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
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
export const createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
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
