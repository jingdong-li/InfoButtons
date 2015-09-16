'use strict';

var oibAssetServiceModule = angular.module('oibAssetServiceModule', ['ui.bootstrap']);

oibAssetServiceModule.factory('assetFactory', ['$http', function($http) {

    var urlBase = 'http://' + localStorage.getItem('hostName') + ':3000/';

    var responderManagerBase = 'http://' + localStorage.getItem('hostName') + ':8080/openInfobutton/assetManager/';

    var responderExpander = 'http://' + localStorage.getItem('hostName') + ':8080/openInfobutton/';
//    var urlBase = 'http://service.oib.utah.edu:8080/infobutton-service-dev/manager/';
    var assetFactory = {};

    assetFactory.getAssets = function () {

        return $http.get(responderManagerBase + 'assets');
    };

    assetFactory.getAsset = function (id) {
        return $http.get(responderManagerBase + 'asset/' + id);
    };

    assetFactory.updateAsset = function (asset) {
        return $http.post(responderManagerBase + 'asset/update', asset);
    };

    assetFactory.deleteAsset = function (asset) {
        return $http.get(responderManagerBase + 'deleteAsset/' + asset);
    };

    assetFactory.deleteAssetProperty = function (assetProperty) {
        return $http.get(responderManagerBase + 'deleteAssetProperty/' + assetProperty);
    };

    assetFactory.getAssetPropertiesForAsset = function (assetId) {
        return $http.get(responderManagerBase + 'assetProperties/' + assetId);
    };

    assetFactory.updateAssetProperty = function (assetProperty) {
        return $http.post(responderManagerBase + 'assetProperty/update', assetProperty);
    };

    assetFactory.expandAssetIndex = function (assetId, codeSystem) {
        return $http.get(responderExpander + 'assetExpander/' + assetId + '/codeSystem/' + codeSystem +'/');
    }

    return assetFactory;
}]);

oibAssetServiceModule.service('editModal', function ($modal) {

    return function(selectedProperty, assetId) {
        var instance = $modal.open({
            templateUrl: 'responder/editProperty.html',
            controller: 'EditModalCtrl',
            controllerAs: 'EditModalCtrl',
            resolve: {
                selectedProperty : function () {

                    return selectedProperty;
                },
                assetId : function () {

                    return assetId;
                }
            }
        });

        return instance.result;
    };

});




