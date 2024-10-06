// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(
        AggregatorV3Interface priceFeed
    ) public returns (uint256) {
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        return uint256(answer * 1e10);
    }

    function getConversionRate(
        uint256 ammountETH,
        AggregatorV3Interface priceFeed
    ) internal returns (uint256) {
        uint256 priceOfEth = getPrice(priceFeed);

        return (ammountETH * priceOfEth) / 1e18;
    }

    function getVersion(
        AggregatorV3Interface priceFeed
    ) public returns (uint256) {
        return priceFeed.version();
    }
}
