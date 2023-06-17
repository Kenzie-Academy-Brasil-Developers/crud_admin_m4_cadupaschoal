import verifyEmailExists from "./verifyEmailExists.middleware";
import handleErrors from "./handleErrors";
import validateBody from "./validateBody.middleware";
import verifyAdmin from "./verifyAdmin.middleware";
import verifyToken from "./verifyToken.middleware";
import verifyCourseExists from "./verifyCourseExists.middlewares";
import validateParams from "./validateParams.middleware";
import validateCourseParams from "./verifyCourseParam.middleware";
import verifyUserParams from "./verifyUserParams.middlewares";
export default { 
    verifyEmailExists, 
    handleErrors, 
    validateBody, 
    verifyAdmin, 
    verifyToken, 
    verifyCourseExists,
    validateParams,
    validateCourseParams,
    verifyUserParams
 };
