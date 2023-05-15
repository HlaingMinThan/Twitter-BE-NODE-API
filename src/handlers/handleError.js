import {validationResult} from 'express-validator';

let handleError = (req,res,next) => {
    //handleError
    // https://express-validator.github.io/docs/validation-result-api
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        next()
    }else {
        return res.status(400).json({ errors: errors.array() });
    }
}

export default handleError;