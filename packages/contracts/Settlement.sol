// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "./MarketManager.sol";

contract Settlement is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;
    
    MarketManager public immutable marketManager;
    
    mapping(bytes32 => string) public requestToMarketId;
    mapping(string => bytes32) public marketRequests;
    
    uint256 private oracleUpdateFee;
    
    event ChainlinkRequested(bytes32 indexed requestId);
    event ChainlinkFulfilled(bytes32 indexed requestId);
    
    constructor(
        address _marketManager, 
        address _linkToken
    ) ConfirmedOwner(msg.sender) {
        marketManager = MarketManager(_marketManager);
        setChainlinkToken(_linkToken);
        oracleUpdateFee = 0.2 * 10**18; // 0.2 LINK
    }
    
    function requestSettlement(
        string memory _marketId
    ) external returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            string(abi.encodePacked("YOUR_JOB_ID_GOES_HERE")), // Replace with real job ID
            address(this),
            this.fulfill.selector
        );
        
        req.add("get", string(abi.encodePacked("https://api.example.com/sports/", _marketId)));
        req.add("path", "result,winner");
        
        requestId = sendChainlinkRequest(req, oracleUpdateFee);
        requestToMarketId[requestId] = _marketId;
        marketRequests[_marketId] = requestId;
        
        emit ChainlinkRequested(requestId);
        return requestId;
    }
    
    function fulfill(bytes32 _requestId, string memory _result) external 
        recordChainlinkFulfillment(_requestId) 
    {
        string memory marketId = requestToMarketId[_requestId];
        require(bytes(marketId).length > 0, "Invalid request ID");
        
        marketManager.settleMarket(marketId, _result);
        emit ChainlinkFulfilled(_requestId);
    }
    
    function updateFee(uint256 _fee) external onlyOwner {
        oracleUpdateFee = _fee;
    }
}