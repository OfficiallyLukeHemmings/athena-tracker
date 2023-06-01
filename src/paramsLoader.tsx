/** @fileoverview simple function for getting the url params, e.g. for passing
 * game name to the corresponding route to allow for the corresponding
 * listener to be created on the page itself.
 */

export async function paramsLoader({ params }) {
    return params;
  }