/**
 * @api {post} /register/ Register
 * @apiName Register
 * @apiGroup Authentication
 *
 * @apiParam {String} Username
 * @apiParam {String} Password
 * @apiParam {String} Email
 *
 * @apiSuccess {String} User username
 * @apiSuccess {String} User password
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "Domeccleston",
 *       "id": "11"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */