# To-do List 

There are two versions of this to-do list site. One is <a href="https://kellychhe-to-do-list.netlify.app/">front-end only</a> and the other is a full stack web application. The user can use this web app to keep track of any tasks they need to do and how many are left. The user can cross out tasks on the list, remove tasks individually, removed everything that is already checked, and delete the entire list at once!

<img width="1432" alt="Screen Shot 2022-05-30 at 1 16 29 PM" src="https://user-images.githubusercontent.com/102538779/171037278-855018b4-0ddf-4e05-9f89-8f14ab05ce81.png">

## Languages Used 

This project was created using HTML5, CSS3, MongoDB and Node.js. (front-end version: HTML5, CSS3, Javascript)

For the front-end version of this app, I used JS to dynamically add list items into the unordered list in the HTML. Inside of the list items were three spans: the task text, the remove button, and randomly generated kind words. I used the toggle method to cross out the tasks and show the compliments. I also used big arrow functions, the .forEach method, and querySelectorAll to target multiple list items at a time. My task count kept track by subtracting the total items and the crossed out items.

In the full stack version of this app I used CRUD. The server I created was used to store and retrieve information from the tasks in the mongoDB collection. The site is rendered using ejs. Each list item has a hard coded check icon and a ban icon. The check icon updates the database on whether the task has been completed for not. The ban icon deletes each list item from the database individually. The tasks are identified by id so that tasks with the same content are not interfering with each other. The function that calculates the amount of tasks left was coded into the get request. There is no longer a compliment feature.

## Lessons Learned 

The hardest part about this project was targeting elements. Logging them in the console helped me understand what e.target, parentNode, childNodes and children means. I would like to revisit this project in the future to add a compliment feature in the full-stack version.
