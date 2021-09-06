// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

/// @author Iain Nash @isiain
/// @dev Contract for Algo Light Project by @jawn
/// @custom:warning UNAUDITED: Use at own risk
contract AlgoLight is ERC721, IERC2981, Ownable {
    /// Base URI for metadata (immutable)
    string private metadataBase;
    /// Available IDS list
    uint16[] private availableIds;
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
        uint16 _maxAvailableId
    ) ERC721(name, symbol) {
        metadataBase = _metadataBase;
        // Create array of avilable ids (not initialized as a gas optimization)
        availableIds = new uint16[](_maxAvailableId);
        // Init entropy
        _updateEntropy(); 
    }

    /// @dev Updates entropy value hash
    function _updateEntropy() internal {
        entropyBase = keccak256(abi.encodePacked(msg.sender, block.timestamp, gasleft(), tx.gasprice, metadataBase));
    }

    /// @dev Returns tokenURI for given token that exists
    /// @param tokenId id of token to retrieve metadata for
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "NO TOKEN");

        return string(abi.encodePacked(metadataBase, Strings.toString(tokenId), ".json"));
    }

    /// @dev Admin owner-only function to update the list of approved minters
    /// @param _approvedMinters list of addresses that are approved minters
    function setApprovedMinters(address[] memory _approvedMinters) public onlyOwner {
        approvedMinters = _approvedMinters;
    }

    /// @dev Modifier to only allow approved minter to mint pieces
    modifier onlyApprovedMinter() {
        if (isApprovedMinter(msg.sender)) {
            _;
        } else {
            revert("Not approved");
        }
    }

    /// @dev Returns if given address is an approved minter or owner
    /// @param minter address of potential minter to test
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

    /// @dev Authenticated mint function that mints a random available NFT
    /// @param to Address to mint NFT to
    function mint(address to) public onlyApprovedMinter {
        require(availableIds.length > 0, "Sold out");
        // This updates the entropy base for minting. Fairly simple but should work for this use case.
        _updateEntropy();
        // Get index of ID to mint from available ids
        uint256 swapIndex = uint256(entropyBase) % availableIds.length;
        // Load in new id
        uint256 newId = availableIds[swapIndex];
        // If unset, assume equals index
        if (newId == 0) {
            newId = swapIndex;
        }
        uint16 lastIndex = uint16(availableIds.length - 1);
        uint16 lastId = availableIds[lastIndex];
        if (lastId == 0) {
            lastId = lastIndex;
        }
        // Set last value as swapped index
        availableIds[swapIndex] = lastId;
        // Remove potential value that was minted
        availableIds.pop();

        // Mint 
        _mint(owner(), newId);
        // Transfer (keeps ownership information intact)
        _transfer(owner(), to, newId);
    }

    /// @dev Returns 15% royalty to DAO
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
