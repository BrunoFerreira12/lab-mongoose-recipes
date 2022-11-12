const express = require('express');
const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';



//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
//insert one
    const myReceipe = {
      title:'tuaprima',
      level:'Amateur Chef',
      ingredients:['orange','aplle'],
      cuisine:'portuguese',
      dishType:'snack',
      duration: 1,
      creator:'bruno'
    }
    const createReceipe = await Recipe.create(myReceipe);
    console.log(createReceipe.title);
    //insert multiple
    const inseredData = await Recipe.insertMany(data)
    inseredData.forEach((obj) => {
      console.log(obj.title)
    })
await Recipe.findByIdAndUpdate(condition, {duration:100}, {new:true}) //we will not receive the updated one!
console.log('Success!');

const toDelete = {title:'Carrot Cake'}
await Recipe.deleteOne(toDelete)
console.log('Sucess!')
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
    console.log('Connection Closed!')
  }
};

//manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
