define([], function() {
    var api = 'http://ekb.shri14.ru/api';

    return {
        forecast: api + '/localities/54',
        suggest: api + '/suggest?query={query}'
    };
});