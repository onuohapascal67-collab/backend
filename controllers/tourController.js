import Tour from "../models/tourModel.js";
import APIFeatures from "../utils/apiFeatures.js";

export const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};



// GET ALL TOURS
export const getAllTours = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// GET SINGLE TOUR
export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// CREATE TOUR
export const createTour = async (req, res) => {
  console.log("request body:", req.body);
  try {
    // const newTour = new Tour({})
    // newTour.save()
    const newTour = await Tour.create(req.body);

    console.log("tour created successfully");

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log("error creating tour:", err.message);

    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// UPDATE TOUR
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// DELETE TOUR
export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


export const getTourStats = async (req, res) => {
  try{
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: {gte: 4.5}}
      },
      {
        $group: {
          _id: { $toUpper: "$difficulty" }, 
          num: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        }
      },
      {
        $sort: { avgPrice: 1 }
      },
      // {
      //   $match: { _id: {$ne: 'EASY'}}
      // }
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });

  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

export const getMonthlyPlan = async (req, res) => {
  try{
    const year = req.params.year * 1; 

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numTourStarts: -1 }
      },
      {
        $limit: 12
      }
    ])

    res.status(200).json({
      status: "success",
      data: {
        plan,
      },
    });

  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}