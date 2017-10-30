module.exports = {
    model: {},
    getPreference: function(id) {
        switch (id) {
            case 'accountsEndpoint': return '/accounts';
        }
        return '';
    }
};
