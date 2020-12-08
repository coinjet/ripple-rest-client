[![Build Status](https://travis-ci.org/xdv/divvy-rest-client.svg)](https://travis-ci.org/xdv/divvy-rest-client)

## Divvy REST Node.js Client Library

The Divvy REST Api Server software simplifies interaction with the Divvy payment network. This library aims to provide the most simplified service for using the REST api in node.js.

### Installation

    npm install divvy-rest-client

#### Usage
    
    var DivvyRestClient = require("divvy-rest-client").Client;
    
    var client = new DivvyRestClient({
      api: 'http://localhost:5990',
      account: 'rw6qnMHxqg1m3xki7Y89H45BjU7LnAYyoL',
      secret: 'shgL7M1kbgrBkkkQwwRGHBmbLamxe' 
    });

There are two primary payemnt functions, sending payments and listening to incoming payments.

Sending a Payment:

    client.sendPayment({
      recipient: 'rfZqa3caUggfV2p1K19HHMnQbJcAposMNc',
      amount: 10,
      currency: 'XAG',
      issuer: 'rNipPmQdFMm8SwtsqjjiupRHo8KBwQrDbk' 
    }, function(err, response){
      console.log('payment submitted');
      console.log(response);
    });

#### Proposed API actions

http://dev.xdv.io/rest-api-tool.html#get-payment-history

    const divvy = new DivvyAPI({
      adapter: 'rest',
      url: 'http://127.0.0.1:5990'
    })

Adapters are planned for `rest`, `rpc`, and `websocket`.

The following API methods return an instance of Promise

Generate Account

    divvy.generateAccount()

Get Account Balances

    divvy.getAccountBalances({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    })

Get Account Settings

    divvy.getAccountSettings({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    })

Update Account Settings

    divvy.updateAccountSettings({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
      require_destination_tag: false,
      require_authorization: false,
      disallow_xdv: true,
      disable_master: false,
      email_hash: "98b4375e1d753e5b91627516f6d70977"
      secret: 'sssssssssssssssssssssss'
    }) 

Prepare Payment

    divvy.preparePayment({
      source_account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      source_amount: {
        "value": "1",
        "currency": "USD"
      },
      destination_account: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
      destination_amount: {
        value: "1",
        currency: "USD",
        issuer: "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn"
      },
      invoice_id: 1234
    })

Submit Payment

    divvy.submitPayment({
      source_account: "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
      source_amount: {
        "value": "1",
        "currency": "USD"
      },
      destination_account: "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
      destination_tag: 567,
      destination_amount: {
        value: "1",
        currency: "USD",
        issuer: "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn"
      },
      invoice_id: 1234,
      paths: [],
      secret: "sssssssssssssssssssssssssssss",
    })

Confirm Payment

    divvy.confirmPayment({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      hash: 'A7C3B03663C205C84C7A91730A3E7874A88969B50D80471D8E62BFC04D2EA07A'
    }) 

Get Payment History

    divvy.getPaymentHistory({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      direction: 'incoming'
    })

Get Trustlines

    divvy.getTrustlines({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      counterparty: 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q'
      currency: 'USD'
    })

Grant Trustline

    divvy.grantTrustline({
      limit: 110,
      currency: "USD",
      counterparty: "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
      allows_rippling: false,
      secret: 'sssssssssssssssssssssss'
    })

Check Notifications

    divvy.checkNotifications({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      hash: 'A7C3B03663C205C84C7A91730A3E7874A88969B50D80471D8E62BFC04D2EA07A'
    })

Retrive Divvy Transaction

    divvy.retrieveDivvyTransaction({
      hash: 'A7C3B03663C205C84C7A91730A3E7874A88969B50D80471D8E62BFC04D2EA07A'
    })

Generate UUID

    divvy.generateUUID()

