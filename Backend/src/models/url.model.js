import mongoose, { Schema } from "mongoose";


const urlSchema = new mongoose.Schema(
    {
        redirectURL: {
            type: String,
            required: true
        },
        shortId: {
            type: String,
            required: true,
            unique: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        visitHistory: [{ timestamps: { type: Number } }]
    },
    { timestamps: true }
)

export const Url = mongoose.model("Url", urlSchema)