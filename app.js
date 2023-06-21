/**
 * Import express and store in a constant.
 */
const express = require("express");

/**
 * Create an express application by running express as a function,
 * and store it to a constant.
 */
const app = express();

/**
 * Define the port number that the express application should use.
 */
const port = 3050;

/**
 * Import the database connection file.
 */
const db = require("./config/database");

/**
 * Import the Customer model.
 */
const CustomerModel = require("./models/Customer");

/**
 * Handle the POST request to create a customer.
 */
app.post("/create-customer", (req, res, next) => {
    /**
     * Call the create function on the Cutomer model, and pass the data that you receive.
     */
    CustomerModel.create(
        req.body
        // {   
        //     firstName : req.body.firstName,
        //     lastName : req.body.lastName,
        //     bvn : req.body.bvn,
        //     dateOfBirth : req.body.dateOfBirth,
        //     phoneNumber : req.body.phoneNumber,
        //     email : req.body.email,
        //     password : req.body.password,
        //     confirmPassword : req.body.confirmPassword,
        //     acctType : req.body.acctType,
        // }
    )
    .then((result) => {
        return res.json({
          	message: "Record created successfully!",
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
          	message: "Unable to create a record!",
        });
    });
});

/**
 * Handle the GET request to fetch a single customer.
 */
app.get("/get-one-customer", (req, res, next) => {
    /**
     * Call the findOne function on the Customer model.
     *
     * You can pass the name of the columns you
     * want in the result by using the 'attributes' key.
     *
     * You can use the 'where' condition by using
     * the 'where' key, and passing the value for any coumn.
     */
    CustomerModel.findOne({
        where: {
            id: req.params.id,
        },
    })
    .then((result) => {
      	return res.json(result);
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: 'Unable to fetch the record!'
        });
    });
});

/**
 * Handle the GET request to fetch all customers.
 */
app.get("/get-all-customers", (req, res, next) => {
    /**
     * Call the findAll function on the Customer model.
     *
     * You can pass the name of the columns you
     * want in the result by using the 'attributes' key.
     *
     * You can use the 'where' condition by using
     * the 'where' key, and passing the value for any coumn.
     */
    CustomerModel.findAll()
    .then((result) => {
      	return res.json(result);
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: 'Unable to fetch records!'
        });
    });
});

/**
 * Handle the POST request to update a single customer.
 */
app.post("/update-customer", (req, res, next) => {
    /**
     * Call the update function on the Customer model.
     *
     * You can pass the name of the columns and their new value
     * in JSON format.
     *
     * You can use the 'where' condition by using
     * the 'where' key, and passing the value to update the specific record.
     */
    CustomerModel.update(
        {
            firstName,
            lastName,
            bvn,
            dateOfBirth,
            phoneNumber,
            email,
            password,
            confirmPassword,
            acctType,
        } = req.body,
        {
            where: {
                id: req.params.id,
            },
        }
    )
    .then((result) => {
        return res.json(result);
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: 'Unable to update the record!'
        });
    });
});

/**
 * Handle the POST request to delete a single customer.
 */
app.post("/delete-customer", (req, res, next) => {
    /**
     * Call the destroy function on the Customer model.
     *
     * You can use the 'where' condition by using
     * the 'where' key, and passing the value to delete the specific record.
     */
    CustomerModel.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((result) => {
      	return res.json(result);
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: 'Unable to delete the record!'
        });
    });
});

/**
 * Create a anonymous function to establish the database connection.
 * After the connection is established, start the server.
 */
const initApp = async () => {
    console.log("Testing the database connection..");
    /**
     * Test the connection.
     * You can use the .authenticate() function to test if the connection works.
     */
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");

        /**
         * Syncronize the Customer model.
         */
        CustomerModel.sync({
            alter: true,
        });
		
        /**
         * Start the web server on the specified port.
         */
        app.listen(port, () => {
            console.log(`Server is up and running at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};

/**
 * Initialize the application.
 */
initApp();