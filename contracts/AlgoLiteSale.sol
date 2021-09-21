// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./IMintable.sol";

/// @author Iain Nash @isiain
/// @dev Minting Contract for Algo Lite Project by @jawn
/// @custom:warning UNAUDITED: Use at own risk
contract AlgoLiteSale is Ownable, ReentrancyGuard {
    /// Public sale amount (0.1 ETH)
    uint256 private constant PUBLIC_SALE_AMOUNT = 0.1 * 10**18;
    /// Private sale amount in tokens (1 Token)
    uint256 private constant PRIVATE_SALE_AMOUNT = 1 * 10**18;

    /// Mintable instance
    IMintable private immutable mintable;
    /// Private sale token
    IERC20 private immutable privateSaleToken;

    uint256 private numberPublicSale;
    uint256 private numberSoldPublic;

    uint256 private numberPrivateSale;
    uint256 private numberSoldPrivate;

    /// @dev Creates a new sales contract
    /// @param _mintable Mintable contract
    /// @param _privateSaleToken token for private sales section
    constructor(IMintable _mintable, IERC20 _privateSaleToken) {
        mintable = _mintable;
        privateSaleToken = _privateSaleToken;
    }

    modifier onlyMintableOwner() {
        require(msg.sender == mintable.owner(), "only owner");
        _;
    }

    /// @dev Public purchase token, limited by number sold public, requires ETH value
    function purchase() public payable nonReentrant {
        require(numberSoldPublic < numberPublicSale, "No sale");
        require(msg.value >= PUBLIC_SALE_AMOUNT, "Too low");
        mintable.mint(msg.sender);
        numberSoldPublic += 1;
    }

    /// @dev Returns sales info
    /// @return (numberpublic, soldpublic, numberprivate, soldprivate)
    function saleInfo()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            numberPublicSale,
            numberSoldPublic,
            numberPrivateSale,
            numberSoldPrivate
        );
    }

    /// @dev Purchase with token private sales fn
    /// Requires: 1. token amount to transfer,
    function purchaseWithToken() public nonReentrant {
        require(numberSoldPrivate < numberPrivateSale, "No sale");
        // Attempt to burn tokens for mint
        try
            privateSaleToken.transferFrom(
                msg.sender,
                address(this),
                PRIVATE_SALE_AMOUNT
            )
        returns (bool success) {
            require(success, "Cannot transfer");
            numberSoldPrivate += 1;
            mintable.mint(msg.sender);
        } catch {
            revert("Cannot transfer");
        }
    }

    /// @dev Withdraw tokens from mints to be distributed proportionally to holders of the token.
    function withdrawMasterTokens() public nonReentrant onlyMintableOwner {
        privateSaleToken.transfer(
            mintable.owner(),
            privateSaleToken.balanceOf(address(this))
        );
    }

    /// @dev Withdraw ETH from public minting
    function withdrawEth() public onlyMintableOwner {
        (bool sent, ) = mintable.owner().call{
            value: address(this).balance,
            gas: 100_000
        }("");
        require(sent, "Failed to send Ether");
    }

    /// @dev Set number of NFTs that can be purchased
    /// @param newPublicNumber new number allowed for public sale
    /// @param newPrivateNumber new number allocated for private sale
    function setSaleNumbers(uint256 newPublicNumber, uint256 newPrivateNumber)
        public
        onlyOwner
    {
        numberPublicSale = newPublicNumber;
        numberPrivateSale = newPrivateNumber;
    }
}
