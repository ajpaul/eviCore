module.exports = {
    "id": "abc-123",
    "name" : "PaymentsExecution for 888",
    "parent" : "111111",
    "isActive" : true,
    "trigger" : {
        "id" : "PaymentsExecution",
        "selectors" : {"accountId" : "2cdb2224-8926-4b4d-a99f-1c9dfbbb4699", "partyId" : 123123123},
        "filters" : [
            {
                "paymentAmount" : [{"value" : 99999.00, "condition" : "lt"}]
            }
        ]
    },
    "actions" : [
        {
            "type": "email",
            "location" :
            {
                "emailAddress" : "alexandert@backbase.com"
            }
        }
    ]
};