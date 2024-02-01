# Thoughts Smart Contracts

Thoughts is a decentralized blogging platform on Areon designed to put power back into content creators' hands. Thanks to blockchain technology, Thoughts ensures content integrity, transparency, and direct earnings for content creators. 

This repository contains the smart contract code that governs the operations of Thoughts.

## Project Structure
The project's source code is organized as follows:

```
├── contracts - This directory contains the source code of the smart contracts that underpin the Thoughts platform.
│   ├── standard/ - This subdirectory contains standard smart contracts and interfaces required by Thoughts core contracts.
│   └── writing-editions - This subdirectory contains smart contracts which form the core functionality of the Thoughts platform.
│       ├── IThoughtEdition.sol - Source code for the ThoughtEdition interface.
│       ├── IThoughtEditionFactory.sol - Source code for the ThoughtEditionFactory interface.
│       ├── ThoughtEdition.sol - Source code for the ThoughtEdition smart contract.
│       └── ThoughtEditionFactory.sol - Source code for the ThoughtEditionFactory smart contract.
├── migrations - This directory typically contains JavaScript files for migrating smart contracts to the Areon blockchain. The specific migration scripts are not listed in the provided structure.
├── sample-env - This directory may contain sample environment configuration files or examples for setting up the project environment.
├── test - This directory is often used for writing and running tests for the smart contracts. Specific test files are not listed in the provided structure.
```
Please refer to the individual contract files for more details on the smart contracts and the Areon developer docs for their deployment processes.

## Project Demo

Watch the demo of our project on [Vimeo](https://vimeo.com/909115569) to see Thoughts in action. This video showcases the project's features and functionality.

## Contributing
If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Test your changes thoroughly.
5. Commit and push your changes to your forked repository.
6. Submit a pull request, explaining your changes and why they should be merged.

Thank you for contributing!

## License
This project is licensed under the MIT License - see the LICENSE file for details.



