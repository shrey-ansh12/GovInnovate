// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title EvidenceRegistry
 * @dev Prototype registry for tamper-evident pilot verification and document checksums in GovInnovate.
 *
 * IMPORTANT PRIVACY AND COMPLIANCE NOTICE:
 * This smart contract stores only cryptographic SHA-256 document hashes, unique identifiers,
 * and minimum audit metadata. Never store raw documents, proprietary code, personal identifiable
 * information (PII), or classified government data on this public or permissioned ledger.
 *
 * A matching SHA-256 hash proves that the verified file matches the recorded byte stream.
 * It does NOT certify legal authenticity, commercial truthfulness, or statutory procurement eligibility.
 */
contract EvidenceRegistry {
    struct Evidence {
        bytes32 pilotId;
        bytes32 documentHash;
        uint256 timestamp;
        address submittedBy;
    }

    /// @notice The contract deployer / authorized platform operator account
    address public owner;

    /// @notice Mapping from unique evidence identifier (bytes32) to Evidence record
    mapping(bytes32 => Evidence) private evidenceRecords;

    /// @notice Emitted when a document or pilot evidence hash is permanently committed to ledger
    event EvidenceRegistered(
        bytes32 indexed evidenceId,
        bytes32 indexed pilotId,
        bytes32 documentHash,
        uint256 timestamp,
        address submittedBy
    );

    /// @notice Emitted when the contract owner changes
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    /**
     * @notice Register a tamper-evident SHA-256 document hash associated with an evidence ID and pilot ID.
     * @param evidenceId Unique 32-byte identifier for the evidence or milestone artifact.
     * @param pilotId Unique 32-byte identifier for the pilot challenge sandbox.
     * @param documentHash The SHA-256 cryptographic digest of the document bytes.
     */
    function registerEvidence(
        bytes32 evidenceId,
        bytes32 pilotId,
        bytes32 documentHash
    ) external onlyOwner {
        require(evidenceId != bytes32(0), "Empty evidence ID");
        require(pilotId != bytes32(0), "Empty pilot ID");
        require(documentHash != bytes32(0), "Empty document hash");
        require(
            evidenceRecords[evidenceId].timestamp == 0,
            "Evidence ID already exists"
        );

        evidenceRecords[evidenceId] = Evidence({
            pilotId: pilotId,
            documentHash: documentHash,
            timestamp: block.timestamp,
            submittedBy: msg.sender
        });

        emit EvidenceRegistered(
            evidenceId,
            pilotId,
            documentHash,
            block.timestamp,
            msg.sender
        );
    }

    /**
     * @notice Retrieve the recorded evidence information using its evidence ID.
     * @param evidenceId Unique 32-byte identifier of the evidence.
     * @return pilotId The associated pilot ID.
     * @return documentHash The registered SHA-256 checksum.
     * @return timestamp The block timestamp when registered.
     * @return submittedBy The wallet address that registered the evidence.
     */
    function getEvidence(bytes32 evidenceId)
        external
        view
        returns (
            bytes32 pilotId,
            bytes32 documentHash,
            uint256 timestamp,
            address submittedBy
        )
    {
        Evidence memory evidence = evidenceRecords[evidenceId];

        require(
            evidence.timestamp != 0,
            "Evidence not found"
        );

        return (
            evidence.pilotId,
            evidence.documentHash,
            evidence.timestamp,
            evidence.submittedBy
        );
    }

    /**
     * @notice Check whether an evidence ID has already been registered on the blockchain.
     * @param evidenceId Unique 32-byte identifier of the evidence.
     * @return exists True if registered, false otherwise.
     */
    function hasEvidence(bytes32 evidenceId) external view returns (bool exists) {
        return evidenceRecords[evidenceId].timestamp != 0;
    }

    /**
     * @notice Transfer contract ownership to an authorized address.
     * @param newOwner Address of the new authorized operator.
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner");
        address prev = owner;
        owner = newOwner;
        emit OwnershipTransferred(prev, newOwner);
    }
}
