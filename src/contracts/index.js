import contract from 'truffle-contract'
import storageArtifact from '../../build/contracts/StorageContract'

const StorageContract = contract(storageArtifact)

export {
    StorageContract
}
