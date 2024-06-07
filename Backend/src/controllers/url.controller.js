import mongoose from "mongoose";
import { asyncHandler } from "../utils/assyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Url } from "../models/url.model.js"
import { nanoid } from 'nanoid'

const createShortUrl = asyncHandler(async (req, res) => {
    const { redirectURL } = req.body;

    if (!redirectURL) {
        throw new ApiError(400, "redirect URL required")
    }

    const url = await Url.create({
        shortId: nanoid(10),
        redirectURL
    })

    if (!url) {
        throw new ApiError(500, "something went wrong while shorting url")
    }

    return res
        .status(201)
        .json(new ApiResponse(201, url, "Url short sucessfully"))

})

const getRedirectUrl = asyncHandler(async (req, res) => {

    const { shortId } = req.params

    if (!shortId) {
        throw new ApiError(400, "Short url id is required")
    }

    const url = await Url.findOneAndUpdate(
        {
            shortId
        },

        {
            $push: {
                visitHistory: {
                    timestamps: Date.now()
                }
            }

        }
    )

    if (!url) {
        throw new ApiError(404, "url not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, url.redirectURL , "url fetched succssfully"))

})

export {
    createShortUrl,
    getRedirectUrl
}