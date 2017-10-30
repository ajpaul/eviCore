var mock = require('mock');

// Test Stubs

var stubs = {
  accounts: [
    {
      "id": "2cdb2224-8926-4b4d-a99f-1c9dfbbb4699",
      "currency": "EUR",
      "alias": "Personal Checking Account",
      "availableBalance": 11558,
      "bookedBalance": 11558,
      "shortReferenceId": "0161",
      "accountIdentification": [
          {
              "scheme": "IBAN",
              "id": "NL66INGB0280680457"
          },
          {
              "scheme": "BBAN",
              "id": "280680457"
          }
      ]
    },
    {
      "id": "f0bd5757-75ad-4857-bf39-5e7b4577fac8",
      "currency": "EUR",
      "alias": "Business Account",
      "availableBalance": -11055,
      "bookedBalance": -11055,
      "accountIdentification": [
          {
              "scheme": "IBAN",
              "id": "NL67RABO0842497587"
          },
          {
              "scheme": "BBAN",
              "id": "842497587"
          }
      ]
    },
    {
      "id": "b4053a31-f0a2-4e32-98ed-a18b2d1d3b0e",
      "currency": "EUR",
      "alias": "Shared Account",
      "availableBalance": 11284,
      "bookedBalance": 11284,
      "accountIdentification": [
          {
              "scheme": "IBAN",
              "id": "NL56ABNA0519431642"
          },
          {
              "scheme": "BBAN",
              "id": "519431642"
          }
      ],
      "accountServicer": {
          "id": "1838",
          "name": "Discover Bank",
          "needCredentialsUpdate": false,
          "display": true
      }
    }
  ]
};

// Test Dummies

var dummies = {
  $http: {
    get: function(url) {
      return Promise.resolve(stubs.accounts)
    }
  },
  lpCoreError: {
    throwException: function(err) {
      throw err;
    }
  },
  lpAccounts: {
    load: function() {
      return Promise.resolve(stubs.accounts);
    }
  }
}

// Exports

module.exports = {
  dummies: dummies,
  stubs: stubs
};
