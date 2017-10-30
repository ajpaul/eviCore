module.exports = [
    {
        "id":"111111",
        "name":"PaymentsExecution amount",
        "triggerDefinition":{
            "name":"PaymentsExecution",
            "selectors":{
                "accountId":"string",
                "partyId":"string"
            }
        },
        "actions":[
            {
                "type":"sms",
                "location":{
                    "phoneNumber":"phone"
                }
            },
            {
                "type":"email",
                "location":{
                    "emailAddress":"email"
                }
            }
        ],
        "filters":[
            {
                "placeholder":"amount",
                "label":"Amount of the payment",
                "name":"paymentAmount",
                "type":"amount"
            }
        ]
    },
    {
        "id":"111112",
        "name":"TransactionExecuted contact",
        "triggerDefinition":{
            "name":"TransactionExecuted",
            "selectors":{
                "partyId":"string"
            }
        },
        "actions":[
            {
                "type":"sms",
                "location":{
                    "phoneNumber":"phone"
                }
            },
            {
                "type":"email",
                "location":{
                    "emailAddress":"email"
                }
            }
        ],
        "filters":[
            {
                "placeholder":"counter party name",
                "label":"The name of the counter party",
                "name":"counterPartyName",
                "type":"string"
            }
        ]
    }
];