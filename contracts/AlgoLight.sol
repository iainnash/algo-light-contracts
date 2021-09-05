// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

import "hardhat/console.sol";

/// @author Iain Nash @isiain
/// @dev Contract for Algo Light Project by @jawn
/// @custom:warning UNAUDITED: Use at own risk
contract AlgoLight is ERC721, IERC2981, Ownable {
    /// Base URI for metadata (immutable)
    string private metadataBase;
    /// Available IDS list
    uint256[] private availableIds;
    /// List of approved minters (can be updated by admin)
    address[] private approvedMinters;
    /// Entropy base
    bytes32 entropyBase;

    /// @param name Name of NFT contract
    /// @param symbol Symbol of NFT contract
    /// @param _metadataBase Base URL of metadata
    /// @param _maxAvailableId Max number that can be minted beyond 0
    /// @dev Sets up the serial contract with a name, symbol, and an initial allowed creator.
    constructor(
        string memory name,
        string memory symbol,
        string memory _metadataBase,
        uint256 _maxAvailableId
    ) ERC721(name, symbol) {
        metadataBase = _metadataBase;
        for (uint i = 0; i < _maxAvailableId; i++) {
            availableIds.push(i);
        }
        entropyBase = keccak256(abi.encodePacked(block.timestamp, gasleft(), tx.gasprice, metadataBase));
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "NO TOKEN");

        return string(abi.encodePacked(metadataBase, Strings.toString(tokenId), ".json"));
    }

    function setApprovedMinters(address[] memory _approvedMinters) public onlyOwner {
        approvedMinters = _approvedMinters;
    }

    modifier onlyApprovedMinter() {
        if (isApprovedMinter(msg.sender)) {
            _;
        } else {
            revert("Not approved");
        }
    }

    function isApprovedMinter(address minter) public view returns (bool) {
        if (minter == owner()) {
            return true;
        }
        for (uint i = 0; i < approvedMinters.length; i++) {
            if (minter == approvedMinters[i]) {
                return true;
            }
        }
        return false;
    }

    function mint(address to) public onlyApprovedMinter {
        require(availableIds.length > 0, "Sold out");
        entropyBase = keccak256(abi.encodePacked(gasleft(), tx.gasprice, block.timestamp, entropyBase));
        uint256 swapIndex = uint256(entropyBase) % availableIds.length;
        uint256 newId = availableIds[swapIndex];
        uint256 lastValue = availableIds[availableIds.length - 1];
        availableIds[swapIndex] = lastValue;
        availableIds.length -= 1;

        _mint(to, newId);
    }

    function royaltyInfo(
        uint256,
        uint256 _salePrice
    ) override external view returns (
        address receiver,
        uint256 royaltyAmount
    ) {
        return (
            owner(),
            // 150 bps = 15% royalty
            (_salePrice * 150) / 10_000
        );
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, IERC165)
        returns (bool)
    {
        return
            type(IERC2981).interfaceId == interfaceId ||
            ERC721.supportsInterface(interfaceId);
    }
}
