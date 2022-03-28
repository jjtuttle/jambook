## Welcome to Jambook!<br />
Connect with musicians and the world around you on **Jambook**.<br />
Here you can simply login or signup, takes less than a minute and you are posting.

* *If you do not want to signup but still look around inside click the **Demo User Login** button and you are in.*
<br />


<img width="600" alt="Screen Shot 2022-03-26 at 6 04 45 PM" src="https://user-images.githubusercontent.com/2349101/160262271-e6769095-4eb5-4820-b2b4-709c34659044.png">

Once signed in ou can simply type you message/question in the message box up top.<br />

<img width="471" alt="Screen Shot 2022-03-26 at 6 00 36 PM" src="https://user-images.githubusercontent.com/2349101/160262172-4194235a-21ed-4f4c-9acc-bb6f04509f9d.png">





And other users can reply right inside your post. You can even comment on other users' posts since you have to be logged in to do any posting or commenting.<br />


<img width="411" alt="Screen Shot 2022-03-26 at 6 02 49 PM" src="https://user-images.githubusercontent.com/2349101/160262227-eff56234-18a1-4267-ab16-841e8b937e0f.png">


## Application Architecture
Jambook is a fullstack site built with:
* React and Redux for frontend 
* Flask Server & Python for the backend 
* PostgreSQL as the database
* Node.js
* AlchemySQL as the ORM that works well with Python on the backend.



## Next Steps and Future Features
This is a basic and clean UI experience for getting authenticated, signing up as a user and start posting and others can log in and reply to a post in a comment. It is all logged and disaplyed by which user and how many days since the post/comment.

In the next sprint:
* Adding a seacrh feature so as a user one can easily at the top of the page type any word/phrase in and have the results displayed and the ability to click it to be taken to that post.
* Adding a "like" feature so as a user one could like a post or a comment that they chose or unlike it.

## Instalation Instructions
1. Clone this repo
    * `git clone`
2. Install dependencies for backend
    * `pipenv install`
3. Install dependencies for frontend
    * `cd react-app`
    * `npm install`
4. Create PostgreSQL user
    * `CREATE USER midnight_oil_dev WITH CREATEDB PASSWORD '<password>'`
5. Create PostgreSQL database
    * `CREATE DATABASE midnight_oil_db WITH OWNER midnight_oil_dev`
6. Create a `.env` file in the root directory based on the `.env.example` file
7. In `.env` file:
    * Replace 'password' in DATABASE_URL with your chosen password
    * Enter a secure combination of characters for you SECRET_KEY
*. Flask Migrate and Seed your database in root directory
    * `pipenv shell`
    * `flask db upgrade`
    * `flask seed all`
9. Start backend server in root directory
    * `flask run`
10. Start frontend server in `react-app` directory
    * `npm start`
11. In your browser go to `localhost:3000`
12. You may use the Demo User by clicking on the **Log In** button
    * or create a new user by clicking **Create new account**  
13. Then you are logged in and can create a post, look at other posts, add comments to a post, edit your posts/comments 
14. As you scroll down simply click the up arrow button <img width="30" alt="Screen Shot 2022-03-28 at 6 25 01 AM" src="https://user-images.githubusercontent.com/2349101/160407601-02458cf7-0e1f-4541-9fa5-935c1a52c1e2.png"> to be smoothly taken to the top of the page again where all posts and comments are sorted by the newest, top down.
