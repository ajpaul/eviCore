var testsContext = [
    require.context('./', true, /^((?![\\/]node_modules|bower_components[\\/]).)*\.[Ss]pec$/),
    require.context('../../scripts/', true, /^((?![\\/]node_modules|bower_components[\\/]).)*\.[Ss]pec$/)
];

testsContext.forEach(function(context) {
    context.keys().forEach(context);
});
