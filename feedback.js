import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    comment: String
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;