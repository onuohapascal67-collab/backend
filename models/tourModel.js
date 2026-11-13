import mongoose from "mongoose";
import slugify from "slugify";
import validator from "validator";

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: [40, "Characters must not be more than 40"],
      minlength: [10, " A tour name must have more or equal than 10 charcters"],
      validator: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either easy, medium or difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a summary"],
    },
    description: {
      type: String,
      trim: true,
      required: [false, "A tour must have a description"],
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

//Document middleware
tourSchema.pre("save", function () {
  this.slug = slugify(this.name, { lower: true });
});

// tourSchema.pre('save', function(){
//   console.log('Will save document...');
// })

// tourSchema.post('save', function(doc) {
//   console.log(doc);
// })

//Query middleware
tourSchema.pre(/^find/, function () {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
});

tourSchema.post(/^find/, function (docs) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
});

//Aggregation middleware
tourSchema.pre("aggregate", function () {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;