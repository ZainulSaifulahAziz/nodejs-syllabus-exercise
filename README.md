# Case Study: ATM Machine
## White Belt (Beginner Level)
### Problem Statement
In this case study, we will be building an ATM machine using Node.js, which will allow users to perform basic banking transactions such as withdrawing cash and checking their account balance. We will cover all the objectives and checkpoints of the White Belt level syllabus.

ATM Machine Features:
- Login with a PIN
- View account balance
- Withdraw cash
- Deposit cash
- Transfer funds

### Implementation
We will begin by creating a Node.js application with the following file structure and push it to the GitHub repository (*Notes: it will be better if we create a branch for each level*):
``` 
atm-machine/
├── .git/
├── node_modules/
├── src/
│   ├── atm.js
│   └── menu.js
├── .gitignore
├── package.json
└── README.md
```
We will use the atm.js file to write the code for the ATM machine and the menu.js file to display the menu options to the user.

In atm.js, we will create a function that prompts the user for their PIN and validates it against a hardcoded PIN. If the PIN is correct, we will display the menu options to the user. If the PIN is incorrect, we will display an error message and prompt the user to try again.

Next, we will create functions for each of the available transactions. We will use basic JavaScript syntax to perform the required operations, such as subtracting the withdrawn amount from the account balance.

Finally, we will create a main function that calls the login function and then displays the menu to the user. This function will run when the user runs the Node.js script.

We will use the menu.js file to display the menu options to the user. We will use the inquirer module to prompt the user for their choice and then call the appropriate function from atm.js.

We will use Git to commit changes to the repository as we develop the application. We will also answer the quizzes for Git Basic, Bash Basic, JavaScript Basic which will test the ours knowledge of Git, Bash commands and JavaScript Basic that covers basic syntax, data types, and functions.


## Yellow Belt (Intermediate Level)
### Problem Statement
Continuing from the white belt level case study of building an ATM machine, in the yellow belt level case study, we will be expanding the functionality of the ATM machine and covering additional topics from the syllabus.

ATM Machine Features:
- Login with a PIN
- View account balance
- Withdraw cash
- Deposit cash
- Transfer funds
- **View transaction history**
- **Download transaction history as a CSV file**

### Implementation
We will begin by refactoring our code from the white belt level case study to use JavaScript objects to represent the account data and transactions. We will also use JSON to store the account data and transaction history in a file.

Next, we will use some of the new features introduced in ECMAScript 6+ such as ```let``` and ```const``` declarations, arrow functions, and template literals to make our code more concise and readable.

We will use asynchronous programming and callbacks to handle file operations and API requests. We will also use Node.js modules to organize our code into separate files.

We will use Node.js events to emit and listen for events in our code. For example, we will emit an event when a transaction is completed and listen for that event to update the account balance and transaction history.

We will use the Node.js File System (FS) module to read and write to files. We will use NPM to manage our project dependencies and install external modules.

We will use the Node.js HTTP module to create a simple web interface for the ATM machine. Users will be able to access the ATM machine from a web browser and perform transactions.

Finally, we will use TypeScript to add static typing to our JavaScript code. We will also create an Exercise 2 that requires the user to add the ability to view transaction history and download it as a CSV file.


## Orange Belt (Advanced Beginner Level)
### Problem Statement
Continuing from the yellow belt level case study of building an ATM machine, in the orange belt level case study, we will be expanding the functionality of the ATM machine even further and covering additional topics from the syllabus.

ATM Machine Features:
- Login with a PIN
- View account balance
- Withdraw cash
- Deposit cash
- *Transfer funds to other accounts within the same bank*
- *Transfer funds to other banks*
- View transaction history
- Download transaction history as a CSV file
- **REST API**

### Implementation
We will begin by using design patterns such as the Factory and Prototype patterns to make our code more modular and maintainable.

Next, we will use the Express.js framework to create a more robust web interface for the ATM machine. We will also use the Loopback framework to create a REST API for the ATM machine.

We will use middleware to handle authentication and error handling in our web and API routes. We will implement error handling to handle any unexpected errors that may occur.

We will integrate a database into our application to store the account data and transaction history. We will use MongoDB as our database and access it using the Mongoose library.

We will create a RESTful API to allow other applications to interact with our ATM machine. We will implement authentication using JWT or Oauth to ensure that only authorized users can access the ATM machine.

Finally, we will use Mocha or Jest to create automated tests for our application. We will also create an Exercise 3 that requires the user to add the ability to transfer funds to other banks.


## Green Belt (Intermediate Advanced Level)
### Problem Statement
Continuing from the orange belt level case study of building an ATM machine, in the green belt level case study, we will be further expanding the functionality of the ATM machine and covering additional topics from the syllabus.

ATM Machine Features:
- Login with a PIN
- View account balance
- Withdraw cash
- Deposit cash
- Transfer funds to other accounts within the same bank
- Transfer funds to other banks
- View transaction history
- Download transaction history as a CSV file
- REST API
- **Real-time chat feature using Socket.IO**
- **Caching layer using Redis**
- **Asynchronous tasks using RabbitMQ**
- **Task scheduling**
- **Graph database and GraphQL**
- **PM2 process manager**
- **Deployment to AWS**
- **Pug template engine for dynamic views**
- **Ability to pay bills and purchase items online**

### Implementation
We will begin by implementing a real-time chat feature using Socket.IO. This will allow users to communicate with customer service representatives in real-time.

Next, we will use Redis as a caching layer to improve the performance of our application. We will also use RabbitMQ as a message broker to handle asynchronous tasks in our application.

We will use task scheduling to automate certain tasks in our application. For example, we could schedule a task to run every day to update the exchange rates for international transfers.

We will use a graph database and GraphQL to make our data queries more efficient. This will allow us to retrieve data in a more optimized manner.

We will use PM2 to manage our Node.js processes and ensure that our application is always running. We will also deploy our application to AWS and use AWS services such as EC2, S3, and CloudFront.

Finally, we will use the Pug template engine to create dynamic views for our web interface. We will also create an Exercise 4 that requires the user to add the ability to pay bills and purchase items online.