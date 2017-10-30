define(function() {
    'use strict';

    return [
        {
            question: 'I have a question about Online Banking',
            preQuestion: 'Online Banking Assistance',
            recipient: 0,
            category: 'support'
        },
        {
            question: 'I have a question about Mobile Banking',
            preQuestion: 'Mobile Banking Assistance',
            recipient: 1,
            category: 'mobile'
        },
        {
            question: 'I have a question about Bill Pay',
            preQuestion: 'Bill Pay Assistance',
            recipient: 0,
            category: 'offer'
        },
        {
            question: 'I have a question about Accounts or Payments',
            preQuestion: 'Account or Payment Inquiry',
            recipient: 0,
            category: 'business'
        },
        {
            question: 'I have a question about Fee or Interest Charges',
            preQuestion: 'Fee or Interest Charges',
            recipient: 1,
            category: 'mobile'
        },
        {
            question: 'I have a question about Loans',
            preQuestion: 'Loan Inquiry',
            recipient: 0,
            category: 'consultancy'
        },
        {
            question: 'I have a question about Taxes',
            preQuestion: 'Tax Information',
            recipient: 1,
            category: 'support'
        },
        {
            question: 'I have a Transaction Dispute',
            preQuestion: 'Transaction Dispute',
            recipient: 0,
            category: 'support'
        },
        {
            question: 'I have a question about Wire Transfer',
            preQuestion: 'Wire Transfer Inquiry',
            recipient: 0,
            category: 'consultancy'
        },
        {
            question: 'I have another question',
            preQuestion: 'Other',
            recipient: 1,
            category: 'other'
        }
    ];
});
