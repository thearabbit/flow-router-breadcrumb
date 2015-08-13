var Breadcrumb = {};

// Register
var data = {};
Breadcrumb.register = function (options) {
    if (!_.isObject(options.route)) {
        options.route = {name: options.route};
    }

    _.defaults(options, {
        title: 'No Title'
    });

    data[options.route.name] = options;
};

// Render
var dataArray = [];
Breadcrumb.render = function (route) {
    dataArray = []; // Clear data array for the first time

    var routeName = route || FlowRouter.getRouteName();
    var getRouter = data[routeName];

    // Gen route path
    var genData = genParamsAndQuery(getRouter.route);
    var path = FlowRouter.path(routeName, genData.params, genData.queryParams);
    getRouter.path = path;

    // Set active css class
    getRouter.cssClassActive = 'active';

    // Push data
    dataArray.push(getRouter);

    // Check parent
    if (getRouter.parent) {
        getParent(getRouter.parent)
    }

    return dataArray.reverse();
};

// Get parent router
var getParent = function (route) {
    var getRouter = data[route];

    // Gen route path
    var genData = genParamsAndQuery(getRouter.route);
    var path = FlowRouter.path(route, genData.params, genData.queryParams);
    getRouter.path = path;

    // Set active css class
    getRouter.cssClassActive = '';

    // Push data
    dataArray.push(getRouter);

    // Check parent parent
    if (getRouter.parent) {
        getParent(getRouter.parent)
    }

    return false;
};

// Generate params and queries
var genParamsAndQuery = function (routeData) {
    // Check is array
    routeData.params = _.isArray(routeData.params) ? routeData.params : [routeData.params];
    routeData.queryParams = _.isArray(routeData.queryParams) ? routeData.queryParams : [routeData.queryParams];

    var params = {};
    _.each(routeData.params, function (o) {
        params[o] = FlowRouter.getParam(o);
    });
    var queryParams = {};
    _.each(routeData.queryParams, function (o) {
        queryParams[o] = FlowRouter.getQueryParam(o);
    });

    return {params: params, queryParams: queryParams};
};

/**
 * Register to flow router
 */
FlowRouter.breadcrumb = Breadcrumb.register;

/**
 * Template helper
 */
Template.registerHelper('breadcrumb', function () {
    return Breadcrumb.render();
});
