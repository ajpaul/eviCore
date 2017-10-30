module.exports = {"id":"111111","name":"PaymentsExecution amount","triggerDefinition":{"name":"PaymentsExecution","selectors":{"accountId":"string","partyId":"string"}},"actions":[{"type":"sms","location":{"phoneNumber":"phone"}},{"type":"email","location":{"emailAddress":"email"}}],"filters":[{"placeholder":"amount","label":"Amount of the payment","name":"paymentAmount","type":"amount"}]};