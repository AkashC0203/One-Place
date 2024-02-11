# One - Place News Aggregator

## Description
One - Place aggregates the latest news from various news APIs and displays them on a dashboard. It aims to solve the problem of news consistency, allowing users to view the latest news based on content filtering from different regions and countries in various languages.

## Architecture
The project architecture comprises a Front-End, Back-End, and a MongoDB Database for data storage and retrieval. The Front-End uses Vue.js, creating a dynamic user experience. Users can filter news articles by category, country, and the number of articles to be displayed. A news archival feature allows searching news articles based on keywords. The Back-End uses GET and POST methods for data interaction, interfacing with NewsX and Gnews API. It also features user registration and login functionalities. The storage solution uses MongoDB Atlas, an open-source cloud storage, particularly useful for AWS deployment.

### Implementation
- **Backend**: Implemented using Rest APIs with multiple GET/POST methods to interact with the frontend and external data sources. It interfaces with NewsX and GNEWS APIs.
- **Frontend**: Provides dynamic functionality for filtering and searching news articles, user registration, and login.
- **APIs**: The project interfaces with external APIs (NewsX and GNEWS) and has various endpoints for user registration, login, and news retrieval.

## AWS Deployment
The project is successfully deployed on the AWS cloud interface using Amazon Elastic Container Service (EC2).

## References
- [Vue.js Guide](https://vuejs.org/guide/introduction.html)
- [Node.js](https://nodejs.org/en)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [AWS CodeDeploy](https://aws.amazon.com/codedeploy)

## Steps to Execute the Code
1. **Install Libraries**: Use the command `npm install` to install the necessary libraries.
2. **Start the Back-End**: Navigate to the Back-End folder and type the command `npm run start`.
3. **Start the Front-End**: Navigate to the Front-End folder and type the command `npm run serve`. This will start the server, and you will be prompted to open a browser.
