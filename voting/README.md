# Voting System

This project aims to create a voting system with different user roles, including Admin, Candidate, and Voter. Here are the basic requirements and some information about the project structure.

## Project Structure

The project is divided into two main folders: `voting` for the React Native front-end and `votingServer` for the Node.js server.

### React Native Front-end (`voting`)

To run the React Native front-end, you can use the following command:

```
npx react-native start --reset-cache
```

#### Dependencies

Here are the main dependencies used in the React Native front-end:

- `@react-navigation` for navigation
- `axios` for making HTTP requests
- `react-native-paper` for UI components
- `react-native-image-crop-picker` and `react-native-image-picker` for image handling
- Other dependencies for various functionalities

### Node.js Server (`votingServer`)

The Node.js server handles the backend logic of the voting system.

To run the Node.js server, you can use a tool like `nodemon`. Make sure you have installed all dependencies listed in the `package.json` file.

#### Dependencies

Here are some key dependencies used in the Node.js server:

- `express` for building the server
- `mongoose` for MongoDB database connection
- `jsonwebtoken` for authentication
- `bcrypt` for password hashing
- Other dependencies for different server functionalities

## Basic Requirements

The following are the basic requirements of the Voting System:

### User Types

1. **Admin**: An admin can create different constituencies and plan and start an election. Admins can also invite other users.

2. **Candidate**: Voters can apply for candidacy by providing their information and selecting an image of their symbol and party name. Their applications will be reviewed and approved by the admin.

3. **Voter**: Voters can register, log in, and cast a single vote for a candidate. They can also view the winning candidate and candidate profiles.

### User Registration

- Users, including voters and candidates, need to upload their pictures when they sign up.

### Candidate Application

- Any voter can apply to be a candidate, and they need to select an image of their symbol and input their party name.
- Candidate applications will be reviewed and approved by the admin.

### Election Management

- Admin can set the start and end date of polling, which should be visible to all users.
- Voting will start and end at the specified time for all constituencies simultaneously.

### Voting Process

- The Voting System will display all candidates for whom voters can cast their votes.
- Each voter can cast only one vote.
- Votes cannot be updated once cast.
- Voters can only cast votes in their own constituency.
- A single constituency can have multiple candidates.

### Results

- By the end of the voting time, votes will be counted, and the winner will be announced.
- Results of each constituency should be visible and searchable on a dashboard for all users (paginated).
- Every candidate can see the total votes cast in their favor by the end of the day.

### Github-repo

```
https://github.com/0asad0/ReactNative-Training-FinalProject
```

## Getting Started

To get started with the Voting System project, follow these steps:

1. Clone the repository.

2. Set up the React Native front-end by navigating to the `voting` folder and running `npm install` to install the dependencies.

3. Set up the Node.js server by navigating to the `votingServer` folder and running `npm install` to install the server dependencies.

4. Configure the database connection and environment variables as needed.

5. Start the React Native front-end using `npx react-native start --reset-cache`.

6. Start the Node.js server using `nodemon`.

7. You may need to run additional commands or scripts depending on your specific setup and environment.

## Conclusion

This README provides an overview of the Voting System project, including its structure and basic requirements.
