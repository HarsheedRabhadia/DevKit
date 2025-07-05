import React, { useState, useEffect, useRef } from "react";

// Expanded Mock data for dev tools (now with 100+ tools)
const allTools = [
  {
    id: 1,
    name: "Visual Studio Code",
    description: "A lightweight but powerful source code editor.",
    category: "Editors & IDEs",
    icon: "💻",
    website: "https://code.visualstudio.com/",
  },
  {
    id: 2,
    name: "Docker Desktop",
    description:
      "The fastest way to containerize applications on your desktop.",
    category: "Containerization",
    icon: "🐳",
    website: "https://www.docker.com/products/docker-desktop/",
  },
  {
    id: 3,
    name: "Git",
    description: "Distributed version control system.",
    category: "Version Control",
    icon: "🌳",
    website: "https://git-scm.com/",
  },
  {
    id: 4,
    name: "Postman",
    description: "Collaboration platform for API development.",
    category: "API Tools",
    icon: "✉️",
    website: "https://www.postman.com/",
  },
  {
    id: 5,
    name: "Figma",
    description: "The collaborative interface design tool.",
    category: "Design & Prototyping",
    icon: "🎨",
    website: "https://www.figma.com/",
  },
  {
    id: 6,
    name: "MongoDB Compass",
    description: "The GUI for MongoDB.",
    category: "Databases",
    icon: "🍃",
    website: "https://www.mongodb.com/products/compass",
  },
  {
    id: 7,
    name: "Node.js",
    description: "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
    category: "Runtimes",
    icon: "🟢",
    website: "https://nodejs.org/",
  },
  {
    id: 8,
    name: "React",
    description: "A JavaScript library for building user interfaces.",
    category: "Frameworks",
    icon: "⚛️",
    website: "https://react.dev/",
  },
  {
    id: 9,
    name: "Tailwind CSS",
    description: "A utility-first CSS framework.",
    category: "CSS Frameworks",
    icon: "💨",
    website: "https://tailwindcss.com/",
  },
  {
    id: 10,
    name: "Jira Software",
    description: "The #1 software development tool used by agile teams.",
    category: "Project Management",
    icon: "📊",
    website: "https://www.atlassian.com/software/jira",
  },
  {
    id: 11,
    name: "Kubernetes",
    description:
      "Open-source system for automating deployment, scaling, and management of containerized applications.",
    category: "Orchestration",
    icon: "☸️",
    website: "https://kubernetes.io/",
  },
  {
    id: 12,
    name: "TypeScript",
    description: "A strongly typed superset of JavaScript.",
    category: "Languages",
    icon: "🔵",
    website: "https://www.typescriptlang.org/",
  },
  {
    id: 13,
    name: "Insomnia",
    description: "A powerful REST, GraphQL, and gRPC client.",
    category: "API Tools",
    icon: "🌙",
    website: "https://insomnia.rest/",
  },
  {
    id: 14,
    name: "Webpack",
    description: "A static module bundler for modern JavaScript applications.",
    category: "Build Tools",
    icon: "📦",
    website: "https://webpack.js.org/",
  },
  {
    id: 15,
    name: "ESLint",
    description: "A pluggable and configurable linter tool for JavaScript.",
    category: "Linters",
    icon: "📏",
    website: "https://eslint.org/",
  },
  {
    id: 16,
    name: "Netlify",
    description: "An all-in-one platform for automating modern web projects.",
    category: "Deployment",
    icon: "🌐",
    website: "https://www.netlify.com/",
  },
  {
    id: 17,
    name: "Next.js",
    description: "A React framework for building full-stack web applications.",
    category: "Frameworks",
    icon: "▲",
    website: "https://nextjs.org/",
  },
  {
    id: 18,
    name: "Vite",
    description: "A next generation frontend tooling.",
    category: "Build Tools",
    icon: "⚡",
    website: "https://vitejs.dev/",
  },
  {
    id: 19,
    name: "Chakra UI",
    description:
      "A simple, modular and accessible component library for React.",
    category: "UI Libraries",
    icon: "🌸",
    website: "https://chakra-ui.com/",
  },
  {
    id: 20,
    name: "Storybook",
    description:
      "An open source tool for developing UI components in isolation.",
    category: "Design & Prototyping",
    icon: "📚",
    website: "https://storybook.js.org/",
  },
  {
    id: 21,
    name: "Terraform",
    description: "Infrastructure as Code tool.",
    category: "DevOps",
    icon: "🏗️",
    website: "https://www.terraform.io/",
  },
  {
    id: 22,
    name: "Ansible",
    description:
      "Open-source software provisioning, configuration management, and application-deployment tool.",
    category: "DevOps",
    icon: "⚙️",
    website: "https://www.ansible.com/",
  },
  {
    id: 23,
    name: "Jenkins",
    description: "Open-source automation server for CI/CD.",
    category: "CI/CD",
    icon: "⚙️",
    website: "https://www.jenkins.io/",
  },
  {
    id: 24,
    name: "GitHub Actions",
    description: "Automate software development workflows in your repository.",
    category: "CI/CD",
    icon: "🐙",
    website: "https://github.com/features/actions",
  },
  {
    id: 25,
    name: "Datadog",
    description: "Monitoring and security platform for cloud applications.",
    category: "Monitoring",
    icon: "🐶",
    website: "https://www.datadoghq.com/",
  },
  {
    id: 26,
    name: "Sentry",
    description: "Real-time error tracking.",
    category: "Monitoring",
    icon: "🚨",
    website: "https://sentry.io/",
  },
  {
    id: 27,
    name: "GraphQL",
    description: "A query language for your API.",
    category: "API Tools",
    icon: "🌐",
    website: "https://graphql.org/",
  },
  {
    id: 28,
    name: "Apollo Client",
    description: "State management library for JavaScript with GraphQL.",
    category: "API Tools",
    icon: "🚀",
    website: "https://www.apollographql.com/docs/react/",
  },
  {
    id: 29,
    name: "VS Code Extensions",
    description: "Enhance your Visual Studio Code experience.",
    category: "Editors & IDEs",
    icon: "🔌",
    website: "https://marketplace.visualstudio.com/vscode",
  },
  {
    id: 30,
    name: "WebStorm",
    description: "A powerful IDE for JavaScript, TypeScript, and Node.js.",
    category: "Editors & IDEs",
    icon: "🕷️",
    website: "https://www.jetbrains.com/webstorm/",
  },
  {
    id: 31,
    name: "PostgreSQL",
    description: "A powerful, open source object-relational database system.",
    category: "Databases",
    icon: "🐘",
    website: "https://www.postgresql.org/",
  },
  {
    id: 32,
    name: "Redis",
    description:
      "In-memory data structure store, used as a database, cache and message broker.",
    category: "Databases",
    icon: "🔴",
    website: "https://redis.io/",
  },
  {
    id: 33,
    name: "Stripe",
    description: "APIs that powers online payment processing.",
    category: "Payments",
    icon: "💳",
    website: "https://stripe.com/",
  },
  {
    id: 34,
    name: "Auth0",
    description: "Authentication and authorization as a service.",
    category: "Security & Auth",
    icon: "🔒",
    website: "https://auth0.com/",
  },
  {
    id: 35,
    name: "Jest",
    description: "A delightful JavaScript Testing Framework.",
    category: "Testing",
    icon: "✅",
    website: "https://jestjs.io/",
  },
  {
    id: 36,
    name: "Cypress",
    description:
      "Fast, easy and reliable testing for anything that runs in a browser.",
    category: "Testing",
    icon: "🧪",
    website: "https://www.cypress.io/",
  },
  {
    id: 37,
    name: "Sass",
    description: "Professional grade CSS extension language.",
    category: "CSS Preprocessors",
    icon: "🔶",
    website: "https://sass-lang.com/",
  },
  {
    id: 38,
    name: "Less",
    description: "A CSS pre-processor.",
    category: "CSS Preprocessors",
    icon: "🔵",
    website: "http://lesscss.org/",
  },
  {
    id: 39,
    name: "Babel",
    description: "A JavaScript compiler.",
    category: "Transpilers",
    icon: " Babel",
    website: "https://babeljs.io/",
  },
  {
    id: 40,
    name: "ESBuild",
    description: "An extremely fast JavaScript bundler and minifier.",
    category: "Build Tools",
    icon: "⚡",
    website: "https://esbuild.github.io/",
  },
  {
    id: 41,
    name: "Go",
    description: "An open-source programming language.",
    category: "Languages",
    icon: "🐿️",
    website: "https://go.dev/",
  },
  {
    id: 42,
    name: "Rust",
    description:
      "A language that empowers everyone to build reliable and efficient software.",
    category: "Languages",
    icon: "🦀",
    website: "https://www.rust-lang.org/",
  },
  {
    id: 43,
    name: "Kotlin",
    description: "A modern programming language that makes developers happier.",
    category: "Languages",
    icon: "☕",
    website: "https://kotlinlang.org/",
  },
  {
    id: 44,
    name: "Swift",
    description:
      "A powerful and intuitive programming language for macOS, iOS, watchOS, tvOS and beyond.",
    category: "Languages",
    icon: "🍎",
    website: "https://www.swift.org/",
  },
  {
    id: 45,
    name: "Dart",
    description: "A client-optimized language for fast apps on any platform.",
    category: "Languages",
    icon: "🎯",
    website: "https://dart.dev/",
  },
  {
    id: 46,
    name: "Flutter",
    description:
      "Google’s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.",
    category: "Frameworks",
    icon: "🦋",
    website: "https://flutter.dev/",
  },
  {
    id: 47,
    name: "Vue.js",
    description: "The Progressive JavaScript Framework.",
    category: "Frameworks",
    icon: "💚",
    website: "https://vuejs.org/",
  },
  {
    id: 48,
    name: "Angular",
    description:
      "The platform for building performant and sophisticated web applications.",
    category: "Frameworks",
    icon: "🅰️",
    website: "https://angular.io/",
  },
  {
    id: 49,
    name: "Svelte",
    description: "Cybernetically enhanced web apps.",
    category: "Frameworks",
    icon: "velte",
    website: "https://svelte.dev/",
  },
  {
    id: 50,
    name: "Django",
    description: "The web framework for perfectionists with deadlines.",
    category: "Frameworks",
    icon: "🐍",
    website: "https://www.djangoproject.com/",
  },
  {
    id: 51,
    name: "Ruby on Rails",
    description:
      "A web-application framework that includes everything needed to create database-backed web applications.",
    category: "Frameworks",
    icon: "💎",
    website: "https://rubyonrails.org/",
  },
  {
    id: 52,
    name: "Spring Boot",
    description: "Framework for building production-ready Spring applications.",
    category: "Frameworks",
    icon: "🍃",
    website: "https://spring.io/projects/spring-boot",
  },
  {
    id: 53,
    name: "ASP.NET Core",
    description:
      "Open-source, cross-platform framework for building modern, cloud-based, internet-connected applications.",
    category: "Frameworks",
    icon: "🌐",
    website: "https://dotnet.microsoft.com/apps/aspnet",
  },
  {
    id: 54,
    name: "Express.js",
    description: "Fast, unopinionated, minimalist web framework for Node.js.",
    category: "Frameworks",
    icon: "⚡",
    website: "https://expressjs.com/",
  },
  {
    id: 55,
    name: "NestJS",
    description:
      "A progressive Node.js framework for building efficient, reliable and scalable server-side applications.",
    category: "Frameworks",
    icon: "nestjs",
    website: "https://nestjs.com/",
  },
  {
    id: 56,
    name: "Laravel",
    description:
      "A PHP web application framework with expressive, elegant syntax.",
    category: "Frameworks",
    icon: "🧡",
    website: "https://laravel.com/",
  },
  {
    id: 57,
    name: "Symfony",
    description: "A PHP framework for web projects.",
    category: "Frameworks",
    icon: "symfony",
    website: "https://symfony.com/",
  },
  {
    id: 58,
    name: "Flask",
    description: "A lightweight WSGI web application framework.",
    category: "Frameworks",
    icon: "🍶",
    website: "https://flask.palletsprojects.com/",
  },
  {
    id: 59,
    name: "FastAPI",
    description:
      "A modern, fast (high-performance) web framework for building APIs with Python 3.7+.",
    category: "Frameworks",
    icon: "🚀",
    website: "https://fastapi.tiangolo.com/",
  },
  {
    id: 60,
    name: "Gatsby",
    description:
      "A free and open source framework based on React that helps developers build blazing fast websites and apps.",
    category: "Frameworks",
    icon: "⚛️",
    website: "https://www.gatsbyjs.com/",
  },
  {
    id: 61,
    name: "Nuxt.js",
    description: "The Intuitive Vue Framework.",
    category: "Frameworks",
    icon: "💚",
    website: "https://nuxt.com/",
  },
  {
    id: 62,
    name: "Remix",
    description: "A full stack web framework for React.",
    category: "Frameworks",
    icon: "💿",
    website: "https://remix.run/",
  },
  {
    id: 63,
    name: "Deno",
    description:
      "A simple, modern, and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.",
    category: "Runtimes",
    icon: "🦕",
    website: "https://deno.com/",
  },
  {
    id: 64,
    name: "Bun",
    description: "A fast all-in-one JavaScript runtime.",
    category: "Runtimes",
    icon: "🐰",
    website: "https://bun.sh/",
  },
  {
    id: 65,
    name: "VS Code Remote - Containers",
    description: "Develop inside a Docker container.",
    category: "Containerization",
    icon: "🐳",
    website: "https://code.visualstudio.com/docs/remote/containers",
  },
  {
    id: 66,
    name: "Vagrant",
    description:
      "Create and manage lightweight, reproducible, and portable development environments.",
    category: "Virtualization",
    icon: "🏕️",
    website: "https://www.vagrantup.com/",
  },
  {
    id: 67,
    name: "VirtualBox",
    description: "Powerful x86 and AMD64/Intel64 virtualization product.",
    category: "Virtualization",
    icon: "🖥️",
    website: "https://www.virtualbox.org/",
  },
  {
    id: 68,
    name: "VMware Workstation",
    description:
      "Industry standard for running multiple operating systems as virtual machines on a single Linux or Windows PC.",
    category: "Virtualization",
    icon: "☁️",
    website: "https://www.vmware.com/products/workstation-pro.html",
  },
  {
    id: 69,
    name: "GitLab CI/CD",
    description:
      "Continuous Integration, Delivery, and Deployment solution built into GitLab.",
    category: "CI/CD",
    icon: "🦊",
    website: "https://docs.gitlab.com/ee/ci/",
  },
  {
    id: 70,
    name: "CircleCI",
    description:
      "Automated CI/CD platform for fast, reliable builds and deployments.",
    category: "CI/CD",
    icon: "⭕",
    website: "https://circleci.com/",
  },
  {
    id: 71,
    name: "Travis CI",
    description:
      "Continuous integration service used to build and test projects hosted on GitHub.",
    category: "CI/CD",
    icon: "🚦",
    website: "https://www.travis-ci.com/",
  },
  {
    id: 72,
    name: "Azure DevOps",
    description:
      "Set of development tools from Microsoft that supports application lifecycle management.",
    category: "CI/CD",
    icon: "☁️",
    website: "https://azure.microsoft.com/en-us/services/devops/",
  },
  {
    id: 73,
    name: "AWS CodePipeline",
    description:
      "Continuous delivery service that automates release pipelines.",
    category: "CI/CD",
    icon: "☁️",
    website: "https://aws.amazon.com/codepipeline/",
  },
  {
    id: 74,
    name: "Google Cloud Build",
    description:
      "Service that executes your builds on Google Cloud infrastructure.",
    category: "CI/CD",
    icon: "☁️",
    website: "https://cloud.google.com/cloud-build",
  },
  {
    id: 75,
    name: "Prometheus",
    description: "Open-source monitoring system and alerting toolkit.",
    category: "Monitoring",
    icon: "🔥",
    website: "https://prometheus.io/",
  },
  {
    id: 76,
    name: "Grafana",
    description: "Open-source platform for monitoring and observability.",
    category: "Monitoring",
    icon: "📊",
    website: "https://grafana.com/",
  },
  {
    id: 77,
    name: "ELK Stack (Elasticsearch, Logstash, Kibana)",
    description:
      "A collection of open-source products for data ingestion, enrichment, storage, analysis, and visualization.",
    category: "Monitoring",
    icon: "📈",
    website: "https://www.elastic.co/elastic-stack",
  },
  {
    id: 78,
    name: "New Relic",
    description: "Observability platform for your entire stack.",
    category: "Monitoring",
    icon: "📈",
    website: "https://newrelic.com/",
  },
  {
    id: 79,
    name: "Splunk",
    description:
      "Platform for searching, monitoring, and analyzing machine-generated big data.",
    category: "Monitoring",
    icon: "🔍",
    website: "https://www.splunk.com/",
  },
  {
    id: 80,
    name: "Zabbix",
    description:
      "Open-source monitoring software tool for diverse IT components.",
    category: "Monitoring",
    icon: "👀",
    website: "https://www.zabbix.com/",
  },
  {
    id: 81,
    name: "MariaDB",
    description:
      "A community-developed, commercially supported fork of the MySQL relational database system.",
    category: "Databases",
    icon: "🗄️",
    website: "https://mariadb.org/",
  },
  {
    id: 82,
    name: "SQLite",
    description:
      "A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.",
    category: "Databases",
    icon: "💾",
    website: "https://www.sqlite.org/index.html",
  },
  {
    id: 83,
    name: "Cassandra",
    description:
      "A free and open-source distributed NoSQL database management system.",
    category: "Databases",
    icon: "🗄️",
    website: "https://cassandra.apache.org/",
  },
  {
    id: 84,
    name: "Couchbase",
    description:
      "A NoSQL document database that combines the best of relational databases with the flexibility of NoSQL.",
    category: "Databases",
    icon: "🛋️",
    website: "https://www.couchbase.com/",
  },
  {
    id: 85,
    name: "Firebase",
    description:
      "Google's mobile platform that helps you quickly develop high-quality apps.",
    category: "Databases",
    icon: "🔥",
    website: "https://firebase.google.com/",
  },
  {
    id: 86,
    name: "Supabase",
    description: "An open source Firebase alternative.",
    category: "Databases",
    icon: "🟢",
    website: "https://supabase.com/",
  },
  {
    id: 87,
    name: "Auth0 SDKs",
    description: "Libraries for integrating Auth0 into your applications.",
    category: "Security & Auth",
    icon: "🔒",
    website: "https://auth0.com/docs/sdks",
  },
  {
    id: 88,
    name: "Okta",
    description: "Identity and access management solution.",
    category: "Security & Auth",
    icon: "🔑",
    website: "https://www.okta.com/",
  },
  {
    id: 89,
    name: "Keycloak",
    description:
      "Open source identity and access management for modern applications and services.",
    category: "Security & Auth",
    icon: "🛡️",
    website: "https://www.keycloak.org/",
  },
  {
    id: 90,
    name: "OWASP ZAP",
    description: "An open-source web application security scanner.",
    category: "Security & Auth",
    icon: "🚨",
    website: "https://www.zaproxy.org/",
  },
  {
    id: 91,
    name: "Postman Flows",
    description: "Visually build API workflows in Postman.",
    category: "API Tools",
    icon: "✉️",
    website: "https://www.postman.com/product/flows/",
  },
  {
    id: 92,
    name: "Swagger UI",
    description:
      "Visualize and interact with the API’s resources without having any of the implementation logic in place.",
    category: "API Tools",
    icon: "📝",
    website: "https://swagger.io/tools/swagger-ui/",
  },
  {
    id: 93,
    name: "SoapUI",
    description: "Leading open source tool for testing web services.",
    category: "API Tools",
    icon: "🧪",
    website: "https://www.soapui.org/",
  },
  {
    id: 94,
    name: "JMeter",
    description:
      "Open source software for load testing functional behavior and measure performance.",
    category: "Testing",
    icon: "📈",
    website: "https://jmeter.apache.org/",
  },
  {
    id: 95,
    name: "Selenium",
    description: "A suite of tools for automating web browsers.",
    category: "Testing",
    icon: "🌐",
    website: "https://www.selenium.dev/",
  },
  {
    id: 96,
    name: "Playwright",
    description: "A framework for Web Testing and Automation.",
    category: "Testing",
    icon: "🎭",
    website: "https://playwright.dev/",
  },
  {
    id: 97,
    name: "Mocha",
    description:
      "A JavaScript test framework running on Node.js and in the browser.",
    category: "Testing",
    icon: "☕",
    website: "https://mochajs.org/",
  },
  {
    id: 98,
    name: "Chai",
    description: "A BDD / TDD assertion library for Node.js and the browser.",
    category: "Testing",
    icon: "☕",
    website: "https://www.chaijs.com/",
  },
  {
    id: 99,
    name: "React Testing Library",
    description: "A set of utilities that help you test React components.",
    category: "Testing",
    icon: "⚛️",
    website: "https://testing-library.com/react/",
  },
  {
    id: 100,
    name: "Enzyme",
    description:
      "A JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.",
    category: "Testing",
    icon: "🔬",
    website: "https://enzymejs.github.io/enzyme/",
  },
  {
    id: 101,
    name: "Puppeteer",
    description:
      "A Node.js library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.",
    category: "Testing",
    icon: " puppeteer",
    website: "https://pptr.dev/",
  },
  {
    id: 102,
    name: "Storybook Docs",
    description: "Automatically generate documentation for your components.",
    category: "Design & Prototyping",
    icon: "📚",
    website: "https://storybook.js.org/docs/",
  },
  {
    id: 103,
    name: "Framer",
    description: "Design, prototype, and publish interactive experiences.",
    category: "Design & Prototyping",
    icon: "✨",
    website: "https://www.framer.com/",
  },
  {
    id: 104,
    name: "Sketch",
    description: "The digital design toolkit.",
    category: "Design & Prototyping",
    icon: "✏️",
    website: "https://www.sketch.com/",
  },
  {
    id: 105,
    name: "Adobe XD",
    description: "Vector-based user experience design tool.",
    category: "Design & Prototyping",
    icon: "🅰️",
    website: "https://www.adobe.com/products/xd.html",
  },
  {
    id: 106,
    name: "Zeplin",
    description: "A collaboration tool for designers and developers.",
    category: "Design & Prototyping",
    icon: "🤝",
    website: "https://zeplin.io/",
  },
  {
    id: 107,
    name: "InVision",
    description: "Digital product design platform.",
    category: "Design & Prototyping",
    icon: "👁️",
    website: "https://www.invisionapp.com/",
  },
  {
    id: 108,
    name: "Canva",
    description: "Online design and publishing tool.",
    category: "Design & Prototyping",
    icon: "🖼️",
    website: "https://www.canva.com/",
  },
  {
    id: 109,
    name: "GIMP",
    description: "Free & Open Source Image Editor.",
    category: "Design & Prototyping",
    icon: "🖌️",
    website: "https://www.gimp.org/",
  },
  {
    id: 110,
    name: "Inkscape",
    description: "Free and open-source vector graphics editor.",
    category: "Design & Prototyping",
    icon: "✒️",
    website: "https://inkscape.org/",
  },
  {
    id: 111,
    name: "Blender",
    description: "Free and open source 3D creation suite.",
    category: "Design & Prototyping",
    icon: "🧊",
    website: "https://www.blender.org/",
  },
  {
    id: 112,
    name: "VS Code Live Share",
    description:
      "Real-time collaborative development from the comfort of your favorite tools.",
    category: "Collaboration",
    icon: "🤝",
    website: "https://visualstudio.microsoft.com/services/live-share/",
  },
  {
    id: 113,
    name: "Slack",
    description: "A channel-based messaging platform.",
    category: "Collaboration",
    icon: "💬",
    website: "https://slack.com/",
  },
  {
    id: 114,
    name: "Microsoft Teams",
    description: "A hub for teamwork in Microsoft 365.",
    category: "Collaboration",
    icon: "👥",
    website: "https://www.microsoft.com/en-us/microsoft-teams/",
  },
  {
    id: 115,
    name: "Zoom",
    description: "Video conferencing and online meetings.",
    category: "Collaboration",
    icon: "📹",
    website: "https://zoom.us/",
  },
  {
    id: 116,
    name: "Discord",
    description: "Voice, video, and text chat for gamers and communities.",
    category: "Collaboration",
    icon: "🎮",
    website: "https://discord.com/",
  },
  {
    id: 117,
    name: "Trello",
    description:
      "A collaboration tool that organizes your projects into boards.",
    category: "Project Management",
    icon: "📋",
    website: "https://trello.com/",
  },
  {
    id: 118,
    name: "Asana",
    description: "Work management platform for teams.",
    category: "Project Management",
    icon: "✅",
    website: "https://asana.com/",
  },
  {
    id: 119,
    name: "Monday.com",
    description:
      "A work OS that powers teams to run projects and workflows with confidence.",
    category: "Project Management",
    icon: "🗓️",
    website: "https://monday.com/",
  },
  {
    id: 120,
    name: "ClickUp",
    description: "One app to replace them all. All your work in one place.",
    category: "Project Management",
    icon: "👆",
    website: "https://clickup.com/",
  },
  {
    id: 121,
    name: "Notion",
    description: "A workspace for your notes, tasks, wikis, and databases.",
    category: "Project Management",
    icon: "📝",
    website: "https://www.notion.so/",
  },
  {
    id: 122,
    name: "Linear",
    description: "The issue tracking tool you'll love to use.",
    category: "Project Management",
    icon: "📏",
    website: "https://linear.app/",
  },
  {
    id: 123,
    name: "Figma Dev Mode",
    description: "Translate designs into code faster.",
    category: "Design & Prototyping",
    icon: "⚙️",
    website: "https://www.figma.com/dev-mode/",
  },
  {
    id: 124,
    name: "Adobe Photoshop",
    description: "Industry-standard image editing software.",
    category: "Design & Prototyping",
    icon: "🖼️",
    website: "https://www.adobe.com/products/photoshop.html",
  },
  {
    id: 125,
    name: "Adobe Illustrator",
    description: "Vector graphics software.",
    category: "Design & Prototyping",
    icon: "🖌️",
    website: "https://www.adobe.com/products/illustrator.html",
  },
  {
    id: 126,
    name: "Webflow",
    description: "Build responsive websites visually.",
    category: "No-Code/Low-Code",
    icon: "🌐",
    website: "https://webflow.com/",
  },
  {
    id: 127,
    name: "Bubble",
    description: "Build web apps without code.",
    category: "No-Code/Low-Code",
    icon: "🫧",
    website: "https://bubble.io/",
  },
  {
    id: 128,
    name: "Zapier",
    description: "Automate your work across 5,000+ apps.",
    category: "Automation",
    icon: "🤖",
    website: "https://zapier.com/",
  },
  {
    id: 129,
    name: "IFTTT",
    description: "Connect your apps and devices.",
    category: "Automation",
    icon: "🔗",
    website: "https://ifttt.com/",
  },
  {
    id: 130,
    name: "GitHub Copilot",
    description: "AI pair programmer.",
    category: "AI Tools",
    icon: "🤖",
    website: "https://github.com/features/copilot",
  },
  {
    id: 131,
    name: "ChatGPT",
    description: "AI chatbot for various tasks.",
    category: "AI Tools",
    icon: "💬",
    website: "https://chat.openai.com/",
  },
  {
    id: 132,
    name: "Midjourney",
    description: "AI image generation tool.",
    category: "AI Tools",
    icon: "🎨",
    website: "https://www.midjourney.com/",
  },
  {
    id: 133,
    name: "DALL-E",
    description:
      "AI system that creates realistic images and art from a description in natural language.",
    category: "AI Tools",
    icon: "🖼️",
    website: "https://openai.com/dall-e/",
  },
  {
    id: 134,
    name: "Google Cloud AI Platform",
    description: "Managed service to build, train, and deploy ML models.",
    category: "AI Tools",
    icon: "🧠",
    website: "https://cloud.google.com/ai-platform",
  },
  {
    id: 135,
    name: "TensorFlow",
    description: "An open-source machine learning framework.",
    category: "AI Tools",
    icon: "🧠",
    website: "https://www.tensorflow.org/",
  },
  {
    id: 136,
    name: "PyTorch",
    description:
      "An open source machine learning framework that accelerates the path from research prototyping to production deployment.",
    category: "AI Tools",
    icon: "🧠",
    website: "https://pytorch.org/",
  },
  {
    id: 137,
    name: "Keras",
    description:
      "An API designed for human beings, not machines. Keras follows best practices for reducing cognitive load.",
    category: "AI Tools",
    icon: "🧠",
    website: "https://keras.io/",
  },
  {
    id: 138,
    name: "Scikit-learn",
    description: "Machine Learning in Python.",
    category: "AI Tools",
    icon: "🧠",
    website: "https://scikit-learn.org/stable/",
  },
  {
    id: 139,
    name: "Anaconda",
    description:
      "The world's most popular Python distribution for data science.",
    category: "Data Science",
    icon: "🐍",
    website: "https://www.anaconda.com/",
  },
  {
    id: 140,
    name: "Jupyter Notebook",
    description:
      "An open-source web application that allows you to create and share documents that contain live code, equations, visualizations and narrative text.",
    category: "Data Science",
    icon: "📓",
    website: "https://jupyter.org/",
  },
  {
    id: 141,
    name: "RStudio",
    description: "An integrated development environment for R.",
    category: "Data Science",
    icon: "�",
    website: "https://www.rstudio.com/",
  },
  {
    id: 142,
    name: "Tableau",
    description: "A visual analytics platform.",
    category: "Data Science",
    icon: "📈",
    website: "https://www.tableau.com/",
  },
  {
    id: 143,
    name: "Power BI",
    description: "A business intelligence service by Microsoft.",
    category: "Data Science",
    icon: "📊",
    website: "https://powerbi.microsoft.com/",
  },
  {
    id: 144,
    name: "Apache Spark",
    description: "A unified analytics engine for large-scale data processing.",
    category: "Big Data",
    icon: "⚡",
    website: "https://spark.apache.org/",
  },
  {
    id: 145,
    name: "Apache Kafka",
    description: "A distributed streaming platform.",
    category: "Big Data",
    icon: "⚙️",
    website: "https://kafka.apache.org/",
  },
  {
    id: 146,
    name: "Hadoop",
    description:
      "A framework that allows for the distributed processing of large data sets across clusters of computers.",
    category: "Big Data",
    icon: "🐘",
    website: "https://hadoop.apache.org/",
  },
  {
    id: 147,
    name: "Looker",
    description:
      "A business intelligence, data application, and embedded analytics platform.",
    category: "Business Intelligence",
    icon: "🔍",
    website: "https://cloud.google.com/looker",
  },
  {
    id: 148,
    name: "Metabase",
    description: "Open source business intelligence and data visualization.",
    category: "Business Intelligence",
    icon: "📊",
    website: "https://www.metabase.com/",
  },
  {
    id: 149,
    name: "Redash",
    description:
      "Open-source tool for teams to query, visualize, and share data.",
    category: "Business Intelligence",
    icon: "📈",
    website: "https://redash.io/",
  },
  {
    id: 150,
    name: "Salesforce",
    description: "Cloud-based software company providing CRM services.",
    category: "CRM",
    icon: "☁️",
    website: "https://www.salesforce.com/",
  },
  {
    id: 151,
    name: "HubSpot",
    description:
      "CRM platform with marketing, sales, service, and content management.",
    category: "CRM",
    icon: "🧡",
    website: "https://www.hubspot.com/",
  },
  {
    id: 152,
    name: "Zendesk",
    description: "Customer service and engagement platform.",
    category: "Customer Support",
    icon: "📞",
    website: "https://www.zendesk.com/",
  },
  {
    id: 153,
    name: "Intercom",
    description: "Customer messaging platform.",
    category: "Customer Support",
    icon: "💬",
    website: "https://www.intercom.com/",
  },
  {
    id: 154,
    name: "Stripe Connect",
    description:
      "Platform for marketplaces and platforms to facilitate payments.",
    category: "Payments",
    icon: "💳",
    website: "https://stripe.com/connect",
  },
  {
    id: 155,
    name: "PayPal Developer",
    description: "Tools and APIs for integrating PayPal payments.",
    category: "Payments",
    icon: "🅿️",
    website: "https://developer.paypal.com/",
  },
  {
    id: 156,
    name: "Adyen",
    description: "Global payments platform.",
    category: "Payments",
    icon: "💰",
    website: "https://www.adyen.com/",
  },
  {
    id: 157,
    name: "Twilio",
    description:
      "Cloud communications platform for building SMS, voice, and video applications.",
    category: "Communication APIs",
    icon: "📞",
    website: "https://www.twilio.com/",
  },
  {
    id: 158,
    name: "SendGrid",
    description: "Email API for transactional and marketing emails.",
    category: "Communication APIs",
    icon: "✉️",
    website: "https://sendgrid.com/",
  },
  {
    id: 159,
    name: "Vonage (Nexmo)",
    description:
      "Cloud communications platform for voice, video, SMS, and messaging APIs.",
    category: "Communication APIs",
    icon: "📞",
    website: "https://www.vonage.com/",
  },
  {
    id: 160,
    name: "Postmark",
    description: "Reliable email delivery for web apps.",
    category: "Communication APIs",
    icon: "✉️",
    website: "https://postmarkapp.com/",
  },
  {
    id: 161,
    name: "Cloudflare",
    description: "Web performance and security company.",
    category: "CDN & Security",
    icon: "☁️",
    website: "https://www.cloudflare.com/",
  },
  {
    id: 162,
    name: "Akamai",
    description: "Global CDN and cybersecurity solutions.",
    category: "CDN & Security",
    icon: "🛡️",
    website: "https://www.akamai.com/",
  },
  {
    id: 163,
    name: "Fastly",
    description: "Edge cloud platform for content delivery and web security.",
    category: "CDN & Security",
    icon: "⚡",
    website: "https://www.fastly.com/",
  },
  {
    id: 164,
    name: "Snyk",
    description:
      "Developer-first security for code, dependencies, containers, and infrastructure.",
    category: "Security & Auth",
    icon: "🔒",
    website: "https://snyk.io/",
  },
  {
    id: 165,
    name: "HashiCorp Vault",
    description: "Tool for securely accessing secrets.",
    category: "Security & Auth",
    icon: "🔐",
    website: "https://www.vaultproject.io/",
  },
  {
    id: 166,
    name: "LastPass",
    description: "Password manager and digital vault.",
    category: "Security & Auth",
    icon: "🔑",
    website: "https://www.lastpass.com/",
  },
  {
    id: 167,
    name: "1Password",
    description: "Password manager for teams and individuals.",
    category: "Security & Auth",
    icon: "🔑",
    website: "https://1password.com/",
  },
  {
    id: 168,
    name: "Auth0 Guardian",
    description: "Multi-factor authentication app.",
    category: "Security & Auth",
    icon: "📱",
    website: "https://auth0.com/docs/multifactor-authentication/guardian",
  },
  {
    id: 169,
    name: "SAML",
    description:
      "Security Assertion Markup Language for exchanging authentication and authorization data.",
    category: "Security & Auth",
    icon: "🔄",
    website:
      "https://www.oasis-open.org/committees/download.php/34065/sstc-saml-core-2.0-os.pdf",
  },
  {
    id: 170,
    name: "OAuth",
    description: "Open standard for access delegation.",
    category: "Security & Auth",
    icon: "🤝",
    website: "https://oauth.net/",
  },
  {
    id: 171,
    name: "JWT (JSON Web Tokens)",
    description:
      "A compact, URL-safe means of representing claims to be transferred between two parties.",
    category: "Security & Auth",
    icon: "🔑",
    website: "https://jwt.io/",
  },
  {
    id: 172,
    name: "SonarQube",
    description: "Continuous Code Quality and Security.",
    category: "Code Quality",
    icon: "📐",
    website: "https://www.sonarqube.org/",
  },
  {
    id: 173,
    name: "CodeClimate",
    description:
      "Automated code review for Test Coverage, Maintainability, and more.",
    category: "Code Quality",
    icon: "📊",
    website: "https://codeclimate.com/",
  },
  {
    id: 174,
    name: "Codacy",
    description:
      "Automated code review for Scala, Java, Ruby, Python, PHP, JavaScript, and CSS.",
    category: "Code Quality",
    icon: "🔍",
    website: "https://www.codacy.com/",
  },
  {
    id: 175,
    name: "DeepSource",
    description:
      "Automated static analysis for Python, Go, Ruby, and JavaScript.",
    category: "Code Quality",
    icon: "🧠",
    website: "https://deepsource.io/",
  },
  {
    id: 176,
    name: "Prettier",
    description: "An opinionated code formatter.",
    category: "Code Formatting",
    icon: "💅",
    website: "https://prettier.io/",
  },
  {
    id: 177,
    name: "Black",
    description: "The uncompromising Python code formatter.",
    category: "Code Formatting",
    icon: "⚫",
    website: "https://github.com/psf/black",
  },
  {
    id: 178,
    name: "GoFmt",
    description: "Formats Go programs.",
    category: "Code Formatting",
    icon: "📝",
    website: "https://pkg.go.dev/cmd/gofmt",
  },
  {
    id: 179,
    name: "Docusaurus",
    description: "Easy to maintain open source documentation websites.",
    category: "Documentation",
    icon: "📚",
    website: "https://docusaurus.io/",
  },
  {
    id: 180,
    name: "GitBook",
    description:
      "Modern publishing platform for docs, APIs, and knowledge bases.",
    category: "Documentation",
    icon: "📖",
    website: "https://www.gitbook.com/",
  },
  {
    id: 181,
    name: "MkDocs",
    description:
      "A fast, simple and downright gorgeous static site generator that's geared towards building project documentation.",
    category: "Documentation",
    icon: "📝",
    website: "https://www.mkdocs.org/",
  },
  {
    id: 182,
    name: "SwaggerHub",
    description: "Design, build, and document APIs.",
    category: "API Tools",
    icon: "📝",
    website: "https://swagger.io/tools/swaggerhub/",
  },
  {
    id: 183,
    name: "Stoplight",
    description: "API Design and Development Platform.",
    category: "API Tools",
    icon: "🚦",
    website: "https://stoplight.io/",
  },
  {
    id: 184,
    name: "Kong",
    description: "Open-source API Gateway & Microservices Management Layer.",
    category: "API Gateway",
    icon: "🦍",
    website: "https://konghq.com/",
  },
  {
    id: 185,
    name: "Apigee",
    description: "API management platform by Google.",
    category: "API Gateway",
    icon: "☁️",
    website: "https://cloud.google.com/apigee",
  },
  {
    id: 186,
    name: "Nginx",
    description:
      "High-performance web server, reverse proxy, and load balancer.",
    category: "Web Servers",
    icon: "🌐",
    website: "https://nginx.org/",
  },
  {
    id: 187,
    name: "Apache HTTP Server",
    description: "The world's most popular web server.",
    category: "Web Servers",
    icon: "🌐",
    website: "https://httpd.apache.org/",
  },
  {
    id: 188,
    name: "Caddy",
    description:
      "A powerful, enterprise-ready, open source web server with automatic HTTPS.",
    category: "Web Servers",
    icon: "🔒",
    website: "https://caddyserver.com/",
  },
  {
    id: 189,
    name: "Vercel",
    description:
      "Platform for frontend developers, providing speed and reliability.",
    category: "Deployment",
    icon: "▲",
    website: "https://vercel.com/",
  },
  {
    id: 190,
    name: "Heroku",
    description:
      "A cloud platform as a service (PaaS) supporting several programming languages.",
    category: "Deployment",
    icon: "☁️",
    website: "https://www.heroku.com/",
  },
  {
    id: 191,
    name: "DigitalOcean App Platform",
    description: "Build, deploy, and scale apps quickly.",
    category: "Deployment",
    icon: "💧",
    website: "https://www.digitalocean.com/products/app-platform/",
  },
  {
    id: 192,
    name: "Render",
    description:
      "A unified platform to build and run all your apps and websites.",
    category: "Deployment",
    icon: "✨",
    website: "https://render.com/",
  },
  {
    id: 193,
    name: "Firebase Hosting",
    description: "Fast and secure static hosting for your web app.",
    category: "Deployment",
    icon: "🔥",
    website: "https://firebase.google.com/docs/hosting",
  },
  {
    id: 194,
    name: "AWS Amplify",
    description: "Develop, deploy, and host fullstack applications.",
    category: "Deployment",
    icon: "☁️",
    website: "https://aws.amazon.com/amplify/",
  },
  {
    id: 195,
    name: "Google Cloud Run",
    description: "Run stateless containers via web requests or Pub/Sub events.",
    category: "Deployment",
    icon: "☁️",
    website: "https://cloud.google.com/run",
  },
  {
    id: 196,
    name: "Azure App Service",
    description: "Build, deploy, and scale web apps and APIs.",
    category: "Deployment",
    icon: "☁️",
    website: "https://azure.microsoft.com/en-us/services/app-service/",
  },
  {
    id: 197,
    name: "Cloudinary",
    description: "Cloud-based image and video management.",
    category: "Media Management",
    icon: "🖼️",
    website: "https://cloudinary.com/",
  },
  {
    id: 198,
    name: "Imgix",
    description: "Real-time image optimization and delivery.",
    category: "Media Management",
    icon: "📸",
    website: "https://www.imgix.com/",
  },
  {
    id: 199,
    name: "FFmpeg",
    description:
      "A complete, cross-platform solution to record, convert and stream audio and video.",
    category: "Media Management",
    icon: "🎬",
    website: "https://ffmpeg.org/",
  },
  {
    id: 200,
    name: "Excalidraw",
    description: "Virtual whiteboard for sketching hand-drawn like diagrams.",
    category: "Design & Prototyping",
    icon: "✏️",
    website: "https://excalidraw.com/",
  },
];

// Get unique categories from the mock data, including 'All'
const categories = [
  "All",
  ...new Set(allTools.map((tool) => tool.category)),
].sort();

// ToolCard Component with scroll animation logic
const ToolCard = ({ tool, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the item is visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleCardClick = () => {
    if (tool.website) {
      window.open(tool.website, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick} // Make the entire card clickable
      // Staggered animation delay based on index
      style={{ transitionDelay: `${index * 50}ms` }}
      className={`bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:border-blue-300 transition-all duration-700 ease-out p-6 flex flex-col items-start space-y-3 border border-gray-700 transform cursor-pointer
        ${
          isVisible
            ? "opacity-100 translate-y-0 scale-[1.02]"
            : "opacity-0 translate-y-8"
        }
        `}
    >
      <div className="text-4xl leading-none mb-2 text-gray-100">
        {tool.icon || "🛠️"}
      </div>{" "}
      {/* Tool Icon */}
      <h3 className="text-xl font-semibold text-gray-100">{tool.name}</h3>{" "}
      {/* Tool Name */}
      <p className="text-gray-400 text-sm flex-grow line-clamp-3">
        {tool.description}
      </p>{" "}
      {/* Tool Description */}
      <span className="text-xs font-medium text-blue-400 bg-blue-900/30 px-2.5 py-1 rounded-full mt-2">
        {tool.category}
      </span>
    </div>
  );
};

// App Component
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const headerRef = useRef(null);

  // Set html element to dark mode on mount and keep it there
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Header entrance animation
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.classList.add("animate-fade-in-down");
    }
  }, []);

  // Filtered tools based on search term and category
  const filteredTools = allTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen font-inter antialiased bg-gray-900 text-gray-100 flex flex-col">
      {/* Custom Keyframes for header animation */}
      <style>
        {`
        /* Global Custom Scrollbar for Webkit (Chrome, Safari) */
        ::-webkit-scrollbar {
          width: 10px; /* For vertical scrollbar */
          height: 10px; /* For horizontal scrollbar */
        }

        ::-webkit-scrollbar-track {
          background: #2d3748; /* Dark track for main scrollbar */
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb {
          background: #4a5568; /* Darker thumb for main scrollbar */
          border-radius: 5px;
          border: 2px solid #2d3748; /* Border to make it thinner */
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #6b7280; /* Lighter thumb on hover */
        }

        /* Custom Scrollbar for Firefox (if needed, though Firefox's default is often fine) */
        html {
          scrollbar-color: #4a5568 #2d3748; /* thumb color track color */
          scrollbar-width: thin; /* auto | thin | none */
        }

        /* Specific Custom Scrollbar for Categories Section */
        .categories-scroll-container::-webkit-scrollbar {
          height: 8px; /* Make horizontal scrollbar slightly thinner */
        }

        .categories-scroll-container::-webkit-scrollbar-track {
          background: #4a5568; /* Track for categories scrollbar */
          border-radius: 4px;
        }

        .categories-scroll-container::-webkit-scrollbar-thumb {
          background: #60a5fa; /* Blue thumb for categories */
          border-radius: 4px;
          border: 1px solid #3b82f6;
        }

        .categories-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }

        /* Animations */
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
        }

        @keyframes pulse-once {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        .animate-pulse-once {
          animation: pulse-once 0.3s ease-in-out;
        }
        `}
      </style>

      {/* Header */}
      <header
        ref={headerRef}
        className="sticky top-0 z-10 bg-gray-800 shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 border-b border-gray-700 opacity-0" // Start hidden for animation
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">
          DevKit - Tools Collection
        </h1>

        {/* Search Bar */}
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search tools..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col gap-8 flex-grow">
        {" "}
        {/* Added flex-grow here */}
        {/* Category Filters - Horizontal Mini-Bento Scroll */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-3 border border-gray-700">
          {" "}
          {/* Adjusted padding */}
          <h2 className="text-base font-semibold mb-3 text-gray-100">
            Browse Categories
          </h2>{" "}
          {/* Adjusted heading size/margin */}
          <nav className="overflow-x-auto pb-2 categories-scroll-container">
            {" "}
            {/* Added custom scrollbar class */}
            <ul className="flex flex-nowrap space-x-3">
              {" "}
              {/* Use flex-nowrap for horizontal scrolling, increased space */}
              {categories.map((category) => (
                <li key={category} className="flex-shrink-0">
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`flex flex-col items-center justify-center w-28 h-16 p-2 rounded-lg text-center transition-all duration-300 relative overflow-hidden group
                      ${
                        selectedCategory === category
                          ? "bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-lg transform scale-105 animate-pulse-once"
                          : "bg-gradient-to-br from-gray-700 to-gray-800 text-gray-200 hover:from-gray-600 hover:to-gray-700 hover:shadow-md"
                      }`}
                  >
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-200"></span>
                    <span className="text-xl mb-1 relative z-10">
                      {
                        /* Adjusted icon size */
                        // Updated and more diverse category icons
                        category === "All"
                          ? "🌟"
                          : category === "AI Tools"
                          ? "🤖"
                          : category === "API Gateway"
                          ? "🚦"
                          : category === "API Tools"
                          ? "🔗"
                          : category === "Automation"
                          ? "⚙️"
                          : category === "Big Data"
                          ? "📊"
                          : category === "Build Tools"
                          ? "🔨"
                          : category === "Business Intelligence"
                          ? "📈"
                          : category === "CDN & Security"
                          ? "🛡️"
                          : category === "CI/CD"
                          ? "🚀"
                          : category === "CRM"
                          ? "🤝"
                          : category === "CSS Frameworks"
                          ? "🎨"
                          : category === "CSS Preprocessors"
                          ? "✨"
                          : category === "Code Formatting"
                          ? "✍️"
                          : category === "Code Quality"
                          ? "✅"
                          : category === "Collaboration"
                          ? "👥"
                          : category === "Communication APIs"
                          ? "📞"
                          : category === "Containerization"
                          ? "🐳"
                          : category === "Customer Support"
                          ? "💬"
                          : category === "Data Science"
                          ? "🔬"
                          : category === "Databases"
                          ? "🗄️"
                          : category === "Deployment"
                          ? "☁️"
                          : category === "Design & Prototyping"
                          ? "📐"
                          : category === "DevOps"
                          ? "🛠️"
                          : category === "Documentation"
                          ? "📚"
                          : category === "Editors & IDEs"
                          ? "📝"
                          : category === "Frameworks"
                          ? "🏗️"
                          : category === "Languages"
                          ? "🗣️"
                          : category === "Linters"
                          ? "🔍"
                          : category === "Media Management"
                          ? "📸"
                          : category === "Monitoring"
                          ? "👀"
                          : category === "No-Code/Low-Code"
                          ? "🧩"
                          : category === "Orchestration"
                          ? "☸️"
                          : category === "Payments"
                          ? "💰"
                          : category === "Project Management"
                          ? "🗓️"
                          : category === "Runtimes"
                          ? "⚡"
                          : category === "Security & Auth"
                          ? "🔑"
                          : category === "Testing"
                          ? "🧪"
                          : category === "Transpilers"
                          ? "↔️"
                          : category === "UI Libraries"
                          ? "✨"
                          : category === "Version Control"
                          ? "🌿"
                          : category === "Virtualization"
                          ? "🖥️"
                          : category === "Web Servers"
                          ? "🌐"
                          : "❓" // Default icon for unknown categories
                      }
                    </span>
                    <span className="text-xs font-medium relative z-10">
                      {category}
                    </span>{" "}
                    {/* Adjusted text size */}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Tool Cards Grid */}
        <section className="flex-grow">
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} /> // Pass index for staggered animation
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-10">
              No tools found matching your criteria.
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center p-4 border-t border-gray-700 mt-8">
        © 2025 Harsheed Rabhadia
      </footer>
    </div>
  );
};

export default App;
