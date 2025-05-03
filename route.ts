/** these route can be accessed without auth 
 * @type {string[]}
*/
export const publicRoutes = [
    //because then if user want to change his email 
    '/','/auth/new-verification',

]

/**  used for authentication and will redirect user to /settings
 * 
 * @type {string[]}
 */
export const authRoutes = [ 
 '/auth/login',
 '/auth/register',
 '/auth/error',

]
/**prefix for api auth routes, routes that starts with this 
* prefix used for api auth purposes
* for ex: /api/auth/providers 
* no need to protect them cause next auth needs them 
* @type {string}
* */
export const apiAuthPrefix = '/api/auth'
/** The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/home'