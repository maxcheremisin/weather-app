import httpErrors from 'http-errors';
import express from 'express';

export const errorHandler: express.ErrorRequestHandler = (error: httpErrors.HttpError, request, response, next) => {
    response.status(error.status || 500).json(error);
    next();
};
