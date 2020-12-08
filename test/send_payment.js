'use strict';

var Client = require('../');
var assert = require('chai').assert;
var account_info = require('./fixtures/account_info')();
var uuid = require('node-uuid');
var success = require('./fixtures/send_payment').success;
var errorFixture = require('./fixtures/send_payment').error;
var SECRET = process.env.DIVVY_ACCOUNT_SECRET;

describe('Divvy REST Client Send Payment', function() {
  var client;

  beforeEach(function(done) {
    client = new Client({
      account: account_info.source_account
    });
    done();
  });

  afterEach(function(done) {
    client = undefined;
    done();
  });

  if (SECRET) {
    it('should send payment and receive status URL with protocol specified', function(done) {

      var successfulPayment = {
        source_account: account_info.source_account,
        source_amount: {
          value: '0.05',
          currency: 'SWD',
          issuer: ''
        },
        destination_account: account_info.destination_account,
        destination_amount: {
          value: '0.056',
          currency: 'SWD',
          issuer: account_info.source_account
        },
        partial_payment: false,
        no_direct_divvy: false,
        destination_tag: '0'
      };

      var paymentObj = {
        payment: successfulPayment,
        client_resource_id: uuid.v4(),
        secret: account_info.source_account_secret
      };

      client.sendPayment(paymentObj, function(error, response) {
        assert(!error);
        assert(response);
        assert.deepEqual(success(response), response);
        done();
      });
    });

  } else {
    it.skip('skipping this test because secret is not provided.');
  }

  it('should fail because source_account and secret are missing',
    function(done) {

      var failedPayment = {
        source_account: '',
        source_amount: {
          value: '1',
          currency: 'XDV',
          issuer: ''
        },
        destination_account: account_info.destination_account,
        destination_amount: {
          value: '1',
          currency: 'XDV',
          issuer: ''
        },
        partial_payment: false,
        no_direct_divvy: false,
        destination_tag: '0'
      };

      var paymentObj = {
        payment: failedPayment,
        client_resource_id: uuid.v4(),
        secret: account_info.source_account_secret
      };

      client.sendPayment(paymentObj, function(error, response) {
        assert(error);
        assert(!response);
        assert(errorFixture(), error.error);
        done();
      });
    });
});
