/**
 * @module location-service-client
 */
 import nanoajax from "nanoajax";

/**
 * The client that makes location service requests.
 *
 * @class Client
 * @constructor
 * @param {ClientConfig} the configuration for the location service client.
 */
class Client {

  constructor(clientConfig) {
    this.clientConfig = clientConfig;
  }

  /**
   * Returns a list of locations that match the provided suggest query.
   * @method suggestLocations
   * @param {LocationSuggestRequest} locationSuggestRequest the request object
   */
  suggestLocations(locationSuggestRequest) {
    let self = this;
    return new Promise(function(resolve, reject){
      self.executeRequest(locationSuggestRequest)
      .then(function(response){
        resolve(response);
      })
      .catch(function(error){
        reject(error);
      });
    });
  }

  /**
   * Returns a list of locations that match the provided proximity query.
   * @method findLocationByProximity
   * @param {ProximityRequest} proximityRequest the request object
   */
  findLocationByProximity(proximityRequest) {
    let self = this;
    return new Promise(function(resolve, reject){
      self.executeRequest(proximityRequest)
      .then(function(response){
        resolve(response);
      })
      .catch(function(error){
        reject(error);
      });
    });
  }

  /**
   * This method adds the base url to the constructed client request and then
   * binds the on success and error functions to the request.
   * @method executeRequest
   * @param {ClientRequest} request the request to make
   */
   executeRequest(request) {
     var url = this.clientConfig.baseUrl + "/" + request.createRequest();
     return new Promise(function(resolve,reject){
       nanoajax.ajax({
         url: url,
         cors: true,
         method: "GET"
       }, function (responseCode, responseText) {
         if (responseCode === 200) {
           var responseJson;
           try {
             responseJson = JSON.parse(responseText);
           } catch (error) {
             reject(responseText);
           }
           resolve(responseJson);
         } else {
           reject(responseText);
         }
       });
     });
   }
}

export default Client;
