define([], function() {
    var api = 'http://ekb.shri14.ru/api';

    return {
        geocode: api + '/geocode?coords={long},{lat}',
        forecast: api + '/localities/{geoid}',
        suggest: api + '/suggest?query={query}'
    };
});