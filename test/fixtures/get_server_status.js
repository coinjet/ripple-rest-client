'use strict';

exports.success = function(args) {
  var returnData = {
    success: true,
    api_documentation_url: 'https://github.com/xdv/divvy-rest',
    divvyd_server_url: 'wss://s2.xdv.io:443',
    divvyd_server_status: {
      build_version: args.divvyd_server_status.build_version,
      complete_ledgers: args.divvyd_server_status.complete_ledgers,
      hostid: args.divvyd_server_status.hostid,
      io_latency_ms: args.divvyd_server_status.io_latency_ms,
      last_close: {
        converge_time_s: args.divvyd_server_status.last_close.converge_time_s,
        proposers: args.divvyd_server_status.last_close.proposers
      },
      load_factor: args.divvyd_server_status.load_factor,
      peers: args.divvyd_server_status.peers,
      pubkey_node: args.divvyd_server_status.pubkey_node,
      server_state: args.divvyd_server_status.server_state,
      validated_ledger: {
        age: args.divvyd_server_status.validated_ledger.age,
        base_fee_xdv: args.divvyd_server_status.validated_ledger.base_fee_xdv,
        hash: args.divvyd_server_status.validated_ledger.hash,
        reserve_base_xdv: args.divvyd_server_status.validated_ledger.reserve_base_xdv,
        reserve_inc_xdv: args.divvyd_server_status.validated_ledger.reserve_inc_xdv,
        seq: args.divvyd_server_status.validated_ledger.seq
      },
      validation_quorum: args.divvyd_server_status.validation_quorum
    }
  };

  if (args.divvyd_server_status.fetch_pack) {
    returnData.divvyd_server_status.fetch_pack = args.divvyd_server_status.fetch_pack;
  }

  return returnData;
};
