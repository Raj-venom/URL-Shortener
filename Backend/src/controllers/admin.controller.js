import { asyncHandler } from "../utils/assyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Url } from "../models/url.model.js"

const AllUseraAnylatic = asyncHandler(async (req, res) => {

    if (req.user.admin !== true) {
        throw new ApiError(403, "unauthorized access")
    }

    const url = await Url.aggregate([

        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",

                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            avatar: 1,
                            email: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                totaClick: {
                    $size: "$visitHistory"
                },
                owner: {
                    $first: "$owner"
                }

            }
        }
    ])

    return res
        .status(200)
        .json(new ApiResponse(200, url, "Data fetched sucessflly"))

})


export {
    AllUseraAnylatic
}