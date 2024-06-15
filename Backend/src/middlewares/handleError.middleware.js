import { ApiError } from "../utils/ApiError.js"
import { z } from "zod"
import { ApiResponse } from "../utils/ApiResponse.js"

export const handleError = (err, req, res, next) => {

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            success: false
        });
    }

    if (err instanceof z.ZodError) {
        
        const formattedErrors = err.errors.reduce((acc, err) => {
            const fieldName = err.path.join('.');
            acc[fieldName] = err.message;
            return acc;
        }, {});

        return res.status(400).json({
            statusCode: 400,
            message: formattedErrors,
            success: false
        })
        
    }

    if (err.name === 'SyntaxError' && err.type === 'entity.parse.failed') {
        return res.status(400).json({
            success: false,
            message: 'Invalid JSON syntax',
            // errors: err.message
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: err.message,
            errors: err.errors
        });
    }

    if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate key error',
            errors: err.keyValue
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Something went wrong on the server',
    });
};
