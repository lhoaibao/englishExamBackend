const { check, validationResult } = require('express-validator');
let checkValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }
    res.status(422).send({ message: result.array() });
}

let createValidator = (route) => {
    switch (route) {
        case 'register':
            return [
                check("ho", 'ho is required.').not().isEmpty(),
                check("ten", 'ten is required.').not().isEmpty(),
                check("tennguoidung", 'tennguoidung is required.').not().isEmpty(),
                check("tennguoidung", 'tennguoidung must be more than 6 and less than 30 characters').isLength({ min: 6, max: 30 }),
                check("matkhau", 'matkhau is required.').not().isEmpty(),
                check("matkhau", 'matkhau must be more than 8 characters').isLength({ min: 8 }),
                check("xacnhanmatkhau", 'xacnhanmatkhau is required.').not().isEmpty(),
                check("xacnhanmatkhau").custom((value, { req }) => value === req.body.matkhau).withMessage('matkhau mismatch'),
            ];
        case 'login':
            return [
                check("tennguoidung", 'tennguoidung is required.').not().isEmpty(),
                check("matkhau", 'matkhau is required.').not().isEmpty(),
                check("matkhau", 'matkhau must be more than 8 characters').isLength({ min: 8 }),
            ];
        default:
            return [];
    }
}

const validateForm = {
    checkValidationResult: checkValidationResult,
    createValidator: createValidator,
};

module.exports = validateForm;