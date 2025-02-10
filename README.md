<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/BinaryBeast007/linkr">
    <img src="https://img.icons8.com/fluency/96/link.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Linkr</h3>

  <p align="center">
    A simple URL shortener to make your links cleaner and easier to share.
    <br />
    <a href="https://github.com/BinaryBeast007/linkr"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/BinaryBeast007/linkr">View Demo</a>
    &middot;
    <a href="https://github.com/BinaryBeast007/linkr/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/BinaryBeast007/linkr/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Linkr is a simple URL shortener that helps you convert long, complex URLs into short, shareable links.
It also supports basic analytics, such as click tracking.
This tool is designed to be lightweight, easy to use, and efficient for anyone looking to make links cleaner and easier to manage.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![NodeJS][NodeJS]][NodeJS-url]
- [![NestJS][NestJS]][NestJS-url]
- [![Postgres][Postgres]][Postgres-url]
- [![Redis][Redis]][Redis-url]
- [![Docker][Docker]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy of the project up and running, follow these steps. This guide will help you set up the environment for **Linkr**

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Node.js** (Recommended version: >= 22.12)

  - Install from: [Node.js][NodeJS-url]

- **PostgreSQL** (for database management)

  - Install from: [PostgreSQL][Postgres-url]

- **Redis** (for caching)

  - Install from: [Redis][Redis-url]

- **npm** (Node package manager)

  - If you have Node.js installed, npm should be installed automatically. You can verify by running:
    ```bash
    npm -v
    ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/BinaryBeast007/linkr.git
   ```
2. Navigate into the project directory:
   ```sh
   cd linkr
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Set up environment variables: Create a .env file in the root directory of the project and add the following configuration:
   ```sh
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=dummyuser
   DATABASE_PASSWORD=dummypassword
   DATABASE_NAME=linkr
   DATABASE_SYNC=true
   DATABASE_AUTOLOAD=true
   JWT_SECRET=dummy_jwt_secret_key
   JWT_TOKEN_AUDIENCE=localhost:3000
   JWT_TOKEN_ISSUER=localhost:3000
   JWT_ACCESS_TOKEN_TTL=3600
   JWT_REFRESH_TOKEN_TTL=86400
   GOOGLE_CLIENT_ID=dummy-google-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=dummy-google-client-secret
   REDIS_URL=redis://localhost:6379
   REDIS_TTL=8h
   ```
5. Start the development server: Run the following command to start the application:
   ```sh
   npm run start:dev
   ```
   The application should now be running locally on `http://localhost:3000`
6. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin BinaryBeast007/linkr
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

The **Usage** section is currently in progress and will be updated with detailed examples and instructions shortly. Please stay tuned for further updates.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

The roadmap is under development, and specific details will be added soon. Please check the [open issues](https://github.com/BinaryBeast007/linkr/issues) for proposed features and known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/BinaryBeast007/linkr/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=BinaryBeast007/linkr" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See [License][License-url] for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/BinaryBeast007/linkr.svg?style=for-the-badge
[contributors-url]: https://github.com/BinaryBeast007/linkr/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/BinaryBeast007/linkr.svg?style=for-the-badge
[forks-url]: https://github.com/BinaryBeast007/linkr/network/members
[stars-shield]: https://img.shields.io/github/stars/BinaryBeast007/linkr.svg?style=for-the-badge
[stars-url]: https://github.com/BinaryBeast007/linkr/stargazers
[issues-shield]: https://img.shields.io/github/issues/BinaryBeast007/linkr.svg?style=for-the-badge
[issues-url]: https://github.com/BinaryBeast007/linkr/issues
[license-shield]: https://img.shields.io/github/license/BinaryBeast007/linkr.svg?style=for-the-badge
[license-url]: https://github.com/BinaryBeast007/linkr/blob/main/LICENSE
[product-screenshot]: images/screenshot.png
[NodeJS-url]: https://nodejs.org/
[NodeJS]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NestJS-url]: https://nestjs.com/
[NestJS]: https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Redis-url]: https://redis.io/
[Redis]: https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white
[Docker-url]: https://www.docker.com/
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[License-url]: https://github.com/BinaryBeast007/linkr/blob/main/LICENSE
