import { Response } from 'express';

const SuccessResponse = async (res: Response, message: string, data: String[], statusCode: number) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    });
};
export default SuccessResponse;



