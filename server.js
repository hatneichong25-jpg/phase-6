
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Feedback from "./models/feedback.js";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.resolve("../frontend")));

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully!");

        app.listen(process.env.PORT || 3000, () => {
            console.log("Server running on port 3000");
        });
    })
    .catch(err => console.log("MongoDB Error:", err));

// POST - Save feedback
app.post("/feedback", async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        const feedback = new Feedback({
            name: req.body.name,
            rating: Number(req.body.rating),
            comment: req.body.comment
        });

        await feedback.save();

        console.log("Feedback Saved!");

        res.json({ message: "Feedback submitted successfully!" });

    } catch (error) {
        console.log("Save Error:", error);
        res.status(500).json({
            message: "Error saving feedback",
            error: error.message
        });
    }
});

// GET - Fetch feedback
app.get("/feedback", async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.json(feedback);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching feedback" });
    }
});
