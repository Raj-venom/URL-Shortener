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
        redirectURL,
        owner: req.user?._id
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
        .json(new ApiResponse(200, { orignalUrl: url.redirectURL }, "url fetched succssfully"))

})

const getUserUrls = asyncHandler(async (req, res) => {

    const url = await Url.aggregate([
        {
            $match: {
                owner: req.user?._id
            }
        },
        {
            $addFields: {
                totaClick: {
                    $size: "$visitHistory"
                }
            }
        }
    ])

    return res
        .status(200)
        .json(new ApiResponse(200, url, "url fetched sucessfully"))

})

export {
    createShortUrl,
    getRedirectUrl,
    getUserUrls
}