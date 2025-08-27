<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/StereoPT/insta-puppeteer">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">InstaPuppeteer</h3>

  <p align="center">
    A web-based automation tool for streamlined Instagram management
    <br />
    <a href="https://github.com/StereoPT/insta-puppeteer"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/StereoPT/insta-puppeteer">View Demo</a>
    ·
    <a href="https://github.com/StereoPT/insta-puppeteer/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/StereoPT/insta-puppeteer/issues/new?labels=enhancement">Request Feature</a>
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
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

InstaPuppeteer is a web-based automation tool that leverages browser automation to streamline Instagram management tasks. The application provides users with the ability to automate routine Instagram activities through an intuitive web interface and dashboard.

The project aims to create a user-friendly platform where users can configure and schedule various Instagram automation workflows. By utilizing headless browser technology with Puppeteer, the application can interact with Instagram's web interface programmatically while maintaining natural browsing patterns.

Here's why InstaPuppeteer stands out:
* **User-Friendly Dashboard**: Intuitive web interface for managing automation tasks
* **Browser Automation**: Uses Puppeteer for reliable, programmatic Instagram interactions
* **Natural Patterns**: Maintains human-like browsing behavior to ensure account safety
* **Configurable Workflows**: Flexible automation settings tailored to your needs

Current features include automated liking of posts from specified hashtags, with more automation capabilities planned for future releases.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This project is built using modern web technologies to ensure performance, reliability, and maintainability.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TailwindCSS][TailwindCSS]][TailwindCSS-url]
* [![Puppeteer][Puppeteer]][Puppeteer-url]
* [![Prisma][Prisma]][Prisma-url]
* [![SQLite][SQLite]][SQLite-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get InstaPuppeteer up and running locally, follow these simple steps.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Yarn package manager**
  ```sh
  npm install -g yarn
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/StereoPT/insta-puppeteer.git
   ```

2. Navigate to the project directory
   ```sh
   cd insta-puppeteer
   ```

3. Install dependencies
   ```sh
   yarn install
   ```

4. Set up environment variables
   ```sh
   cp .env.example .env
   ```
   Edit the `.env` file and add your required environment variables as specified in the example file.

5. Set up the database
   ```sh
   yarn db:migrate:dev
   ```

6. Start the development server
   ```sh
   yarn dev:dashboard
   ```

The application will be available at `http://localhost:3000`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

InstaPuppeteer provides an intuitive web dashboard for managing your Instagram automation tasks.

### Current Features

**Hashtag Automation**: Automatically like posts from specified hashtags
- Configure target hashtags through the web interface
- Monitor automation activity in real-time

### Getting Started with Automation

1. **Login**: Access the web dashboard at `http://localhost:3000/login`
2. **Create Workflow**: Define hashtag
3. **Monitor**: Track automation progress and results

⚠️ **Important**: Always ensure your automation activities comply with Instagram's Terms of Service and community guidelines.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Hashtag-based post liking automation
- [x] Web-based dashboard interface
- [x] SQLite database integration
- [ ] Fix known issues
- [ ] Improved Dashboard
- [ ] Hashtag Management

See the [open issues](https://github.com/StereoPT/InstaPuppeteer/issues) for a full list of proposed features (and known issues).

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

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes thoroughly before submitting
- Update documentation as needed
- Respect Instagram's Terms of Service in all contributions

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

StereoPT - [@StereoPT](https://github.com/StereoPT) - [Open an issue](https://github.com/StereoPT/insta-puppeteer/issues)

Project Link: [https://github.com/StereoPT/insta-puppeteer](https://github.com/StereoPT/insta-puppeteer)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Special thanks to the following resources and libraries that made this project possible:

* [Puppeteer Documentation](https://pptr.dev/)
* [Shadcn/ui Components](https://ui.shadcn.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/StereoPT/insta-puppeteer.svg?style=for-the-badge
[contributors-url]: https://github.com/StereoPT/insta-puppeteer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/StereoPT/insta-puppeteer.svg?style=for-the-badge
[forks-url]: https://github.com/StereoPT/insta-puppeteer/network/members
[stars-shield]: https://img.shields.io/github/stars/StereoPT/insta-puppeteer.svg?style=for-the-badge
[stars-url]: https://github.com/StereoPT/insta-puppeteer/stargazers
[issues-shield]: https://img.shields.io/github/issues/StereoPT/insta-puppeteer.svg?style=for-the-badge
[issues-url]: https://github.com/StereoPT/insta-puppeteer/issues
[license-shield]: https://img.shields.io/github/license/StereoPT/insta-puppeteer.svg?style=for-the-badge
[license-url]: https://github.com/StereoPT/insta-puppeteer/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/guidosp

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Puppeteer]: https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white
[Puppeteer-url]: https://pptr.dev/
[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://prisma.io/
[SQLite]: https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://sqlite.org/