# Exposure Validation Tool (Community Version)

The Exposure Validation Tool is a React-based application designed to validate CSV files against specific exposure criteria. This tool is an open-source community-driven version of an internal tool used within our company. It leverages functionalities from widely recognized open-source libraries such as [ods-tools](https://pypi.org/project/ods-tools/) and the [ODS_OpenExposureData](https://github.com/OasisLMF/ODS_OpenExposureData) GitHub repository.

## Disclaimer

This is an open-source tool provided under the specific license included in this repository. The company provides this tool on an "as is" basis and does not offer support, warranty, or updates. All direct or indirect risks associated with the installation and use of this software fall under the responsibility of the user. The company is not liable for any damages or issues that arise from the use of this tool.

## Features

- Two validation modes: `Location` and `Account`.
- Capability to upload single or multiple CSV files as required by the validation mode.
- Direct in-app display of validation results.
- Functionality to download issues identified in the CSV as a `.txt` file with the corresponding CSV name appended by "issues".

## Getting Started

This section will guide you through the setup and usage of the Exposure Validation Tool.

### Usage

1. Select the validation type from the dropdown menu: `Location` or `Account`.
2. Depending on the selected validation type, upload the appropriate CSV files.
3. Click `Upload` to begin the validation process and view the results.
4. Should there be any issues detected, use the "Download Issues" button to save a detailed report as a `.txt` file.

### Prerequisites

- Node.js
- npm or Yarn
- [ods-tools](https://pypi.org/project/ods-tools/) Python package

### Installation

#### Using Docker

```bash
docker-compose up -d --build
```

#### Without Docker

##### Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
npm start
```

##### Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
npm install
npm start
```

## Community Contributions

We encourage community contributions to this project. If you have improvements or fixes, please fork this repository and submit a pull request. For major changes or new features, we suggest opening an issue first to discuss what you would like to change.

Please note that while we appreciate community involvement, the company does not provide support for this open-source version of the tool.

## License

The Exposure Validation Tool is open-source software licensed under the following terms:

- The source code, and any developed tools within this project are licensed under the BSD 3-Clause License.
- The documentation, schemas, and any written content within this project are dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.

By using, distributing, or contributing to this software, you agree to the terms and conditions outlined in each respective license.

For more detailed information, please refer to the LICENSE file included in this repository or follow the links below:

- [BSD 3-Clause License](https://opensource.org/licenses/BSD-3-Clause)
- [CC0 1.0 Universal (CC0 1.0) Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/)


## Issue Reporting

If you encounter any bugs or issues with this tool, please feel free to raise an issue on the GitHub repository's [Issues](https://github.com/RenewRisk/Exposure-Validation-Tool/issues) page. While the company does not guarantee a response or resolution, community feedback is valued and contributes to potential improvements.

Remember that this is a community-driven project, and while we foster a collaborative environment, the maintenance and troubleshooting are largely reliant on community engagement.
