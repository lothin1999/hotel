import { ValidationPipe as NestValidationPipe } from '@nestjs/common';
import { validationConfig } from '../../config/validation.config';

export const GlobalValidationPipe = new NestValidationPipe(validationConfig);
