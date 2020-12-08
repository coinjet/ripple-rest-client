'use strict';

var Client = require('../');
var assert = require('chai').assert;
var account_info = require('./fixtures/account_info')();
var uuid = require('node-uuid');
var success = require('./fixtures/send_and_confirm_payment').success;
var errorFixture = require('./fixtures/send_and_confirm_payment').error;

var SECRET = process.env.DIVVY_ACCOUNT_SECRET;

describe('Divvy REST Client sendPayment', function() {
  var payment, faildPayment, nonXDVPayment, client;

  beforeEach(function(done) {
    client = new Client({
      account: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz'
    });
    done();
  });

  afterEach(function(done) {
    client = undefined;
    done();
  });

  if (SECRET) {
    it('should send and confirm payment via the response payment status url', function(done) {
      this.timeout(10000);

      payment = {
        source_account: account_info.source_account,
        source_amount: {
          value: '0.005',
          currency: 'GWD',
          issuer: ''
        },
        destination_account: account_info.destination_account,
        destination_amount: {
          value: '0.005',
          currency: 'GWD',
          issuer: account_info.source_account
        },
        partial_payment: false,
        no_direct_divvy: false,
        destination_tag: '0'
      };

      var paymentObj = {
        payment: payment,
        client_resource_id: uuid.v4(),
        secret: SECRET
      };

      client.sendAndConfirmPayment(paymentObj, function(error, response) {
        assert.deepEqual(success(response), response);
        done();
      });
    });

    it('should fail because destination account and amount is missing',
      function(done) {
        this.timeout(10000);
        faildPayment = {
          source_account: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
          source_amount: {
            value: '.005',
            currency: 'XDV',
            issuer: ''
          },
          destination_account: '',
          destination_amount: {},
          partial_payment: false,
          no_direct_divvy: false
        };

        var paymentObj = {
          payment: faildPayment,
          client_resource_id: uuid.v4(),
          secret: SECRET
        };

        client.sendAndConfirmPayment(paymentObj, function(error, response) {
          assert(!response);
          assert(error);
          assert.deepEqual(errorFixture(), error.response.body);
          done();
        });
      });
  } else {
    it.skip('should fail because destination account and amount is missing -- MISSING SECRET, so skipping test');
  }
});
