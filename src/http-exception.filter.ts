import { ArgumentsHost, Catch } from '@nestjs/common';
import { Response } from 'express';
import { HTTP_STATUS } from 'src/common/constant';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
    catch(exception, host: ArgumentsHost) {
        console.log(exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        if (exception.status) {
            response.status(exception.status).json({
                ...exception.response
            });
        }

        let status = HTTP_STATUS.SERVER_ERROR;
        let message = 'Internal server error';
        if (exception?.toString()?.includes('NotFoundError')) {
            status = HTTP_STATUS.NOT_FOUND;
            message = 'Not Found';
        } else if (exception?.code?.startsWith('P')) {
            status = HTTP_STATUS.BAD_REQUEST;
            message = exception;
        }

        response.status(status).json({
            statusCode: status,
            message
        });
    }
}
