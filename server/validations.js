const Joi = require('@hapi/joi');

module.exports.registerSchemaValidations = (data) => {


    const schema = {
        firstname:
            Joi.string()
                .min(3)
                .max(20)
                .required(),
        lastname:
            Joi.string()
                .min(3)
                .max(20)
                .required(),
        email:
            Joi.string()
                .min(6)
                .required()
                .email({ minDomainSegments: 2 }),
        password:
            Joi.string()
                .min(6)
                .required(),

    };
    return Joi.validate(data, schema)
};

module.exports.loginSchemaValidations = data => {
    const schema = {
        email:
            Joi.string()
                .min(6)
                .required()
                .email({ minDomainSegments: 2 }),
        password:
            Joi.string()
                .min(6)
                .required(),
    };
    return Joi.validate(data, schema);
};


module.exports.projectSchemaValidations = data => {
    const schema = {
        name:
            Joi.string()
                .min(6)
                .required(),
        key:
            Joi.required(),
        description: Joi.string()
            .min(6)
            .required(),
        members: Joi.required(),
        administrators: Joi.required()

    };
    return Joi.validate(data, schema);
};

module.exports.taskSchemaValidations = data => {
    const schema = {
        name:
            Joi.string()
                .min(6)
                .required(),
        key:
            Joi.required(),
        description: Joi.string()
            .min(6)
            .required(),
        project: Joi.required(),
        assignedId: Joi.required()

    };
    return Joi.validate(data, schema);
};