import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const userSchema = Joi.object({
  firstName: // english name
    Joi.string()
      .required()
      .min(3)
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .custom((value: string, helpers) => {
        // Capitalize the first letter of the first name
        const capitalizedFirstName = value.charAt(0).toUpperCase() + value.slice(1);
        return capitalizedFirstName;
      }, 'capitalization')
      .messages({
          'string.empty': 'First Name is required!',
          'string.min': 'First Name must be at least {#limit} characters long',
          'string.pattern.base': 'Name must contain only alphanumeric characters',
    }),
  middleName:
    Joi.string()
      .messages({
    }),

  lastName:
    Joi.string()
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .messages({
          'string.empty': 'last Name is required!',
          'string.pattern.base': 'Name must contain only alphanumeric characters',
    }),
  gender:
    Joi.string()
      .required()
      .valid('male', 'female', 'other')
      .messages({
          'string.empty': 'gender is required!',
          'any.only': 'Gender must be one of: male, female, other',
    }),
  DOB:
    Joi.string()
      .required()
      .isoDate()
      .messages({
          'string.empty': 'DOB is required!',
          'any.isoDate': 'DOB must be in ISO 8601 format (YYYY-MM-DD)',
    }),
  email:
    Joi.string()
      .email()
      .required()
      .messages({
          'string.empty': 'email is required!',
          'string.email': 'Invalid email format',
    }),
  phone:
    Joi.string()
      .required()
      .pattern(/^(078|072|073|079)\d{7}$/)
      .messages({
          'string.empty': 'phone is required!',
          'string.pattern.base': 'Invalid Phone format. Phone number must be 10 digits long and start with 078, 072, 073, or 079',
    }),
  whatsappPhone:
    Joi.string()
    .required()
    .pattern(/^(078|072|073|079)\d{7}$/)
    .messages({
        'string.empty': 'phone is required!',
        'string.pattern.base': 'Invalid Phone format. Phone number must be 10 digits long and start with 078, 072, 073, or 079',
    }),
  idNumber:
    Joi.string()
      .required()
      .pattern(/^1\d{15}$/)
      .messages({
          'string.empty': 'idNumber is required!',
        'string.pattern.base': 'Invalid ID Number format. ID Number must be 16 characters and start with a one',
    }),
  yearCompleted:
    Joi.number()
    .integer()
    .min(2000)
    .max(new Date().getFullYear())
    .required()
    .messages({
        'number.base': 'Year must be a number',
        'number.empty': 'Year is required!',
        'number.integer': 'Year must be an integer',
        'number.min': 'Year must be greater than or equal to {#limit}',
        'number.max': 'Year cannot be greater than the current year',
    }),
  schoolCat:
    Joi.string()
      .required()
      .valid('TTC', 'TVET', 'GE', 'other')
      .messages({
          'string.empty': 'schoolCat is required!',
          'any.only': 'schoolCat must be one of: TTC, TVET, GE, other',
    }),
  combination:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'combination is required!',
    }),
  indexNumber:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'indexNumber is required!',
    }),
  fatherNames:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'fatherNames is required!',
    }),
  fatherPhone:
    Joi.string()
      .required()
      .pattern(/^(078|072|073|079)\d{7}$/)
      .messages({
          'string.empty': 'phone is required!',
          'string.pattern.base': 'Invalid Phone format. Phone number must be 10 digits long and start with 078, 072, 073, or 079',
      }),
  motherNames:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'motherNames is required!',
    }),
  motherPhone:
    Joi.string()
      .required()
      .pattern(/^(078|072|073|079)\d{7}$/)
      .messages({
          'string.empty': 'phone is required!',
          'string.pattern.base': 'Invalid Phone format. Phone number must be 10 digits long and start with 078, 072, 073, or 079',
      }),
  guardianNames:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'guardian Name is required!',
    }),
  guardianPhone:
    Joi.string()
      .required()
      .pattern(/^(078|072|073|079)\d{7}$/)
      .messages({
          'string.empty': 'phone is required!',
          'string.pattern.base': 'Invalid Phone format. Phone number must be 10 digits long and start with 078, 072, 073, or 079',
      }),
  countryOfBirth:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'countryOfBirth is required!',
    }),
  countryResidence:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'countryResidence is required!',
    }),
  countryNationality:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'countryNationality is required!',
    }),
  province:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'province is required!',
    }),
  district:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'district is required!',
    }),
  sector:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'sector is required!',
    }),
  cell:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'cell is required!',
    }),
  village:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'village is required!',
    }),
  disabilities:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'disabilities is required!',
    }),
  maritalStatus:
    Joi.string()
      .required()
      .valid('single' , 'married' , 'divorced' , 'widowed')
      .messages({
          'string.empty': 'maritalStatus is required!',
          'any.only': 'maritalStatus must be one of: single, married, divorced or widowed',
    }),
  work:
    Joi.string()
      .required()
      .messages({
          'string.empty': 'work is required!',
    }),
  }).unknown();


const validateUserRegister = async (req: Request, res: Response, next: NextFunction) => {
try {

    const { error } = await userSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
    
        const errorMessage = error.details.map((detail) => detail.message).join('; ');
    
        return res.status(400).json({ error: errorMessage });
    }
    
    next();

} catch (err) {
    
    console.error('Error validating user Creation:', err);
    
    res.status(500).json({ error: 'Internal server error' });
}
};

export { validateUserRegister };