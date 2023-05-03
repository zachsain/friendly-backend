# Virtual Closet 

Phase 5 Project for Flatiron School: React/Rails API - Full Stack Application. This project is designed to allow users to create a virtual closet where they can keep track of the clothes, styles, and brands they love.

## Table of Contents

- [General Info](#general-information)
- [GitHub Repo](#github-repo)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Server Start](#server-start)
- [Usage](#usage)
- [Room for Improvement](#room-for-improvement)

## General Information

Virtual Closet was created for Flatiron Software Enineering capstone project, focused on React frontend and Rails backend, and Redux for state management.

## GitHub Repo

- [Monorepo - frontend and backend servers](https://github.com/zachsain/routinely-app-new)

## Technologies Used

- Ruby 2.7.4
- Rails 7.0.4
- Active Model Serializers
- NodeJS (v16), and npm
- Postgresql
- bcrypt 3.1.7
- React 18.2.0
- React-Router-Dom 5.3.4
- React icons 
- React-Redux


See Environment Setup below for instructions on installing these tools if you
don't already have them.

## Features

### Backend API Endpoints

GET 
/me – returns logged in user.
/brands – returns all brands 
/styles – returns all styles 
/pieces – returns all of the users pieces 

POST 
/signup – creates new user profile
/login – cretaes a user session
/brands – creates a new brand 
/styles - creates a new style
/pieces - creates a new piece

PATCH 
/pieces/:id - updates piece 

DELETE
/pieces/:id - deletes piece
/logout - deletes the user session


## Setup

### Clone repository

**clone** the project repository from github: (https://github.com/zachsain/virtual-closet-app)

```console
$ git clone git@github.com:zachsain/virtual-closet-app.git
```

## Environment Setup

### Install the Latest Ruby Version

Verify which version of Ruby you're running by entering this in the terminal:

```sh
ruby -v
```

If your version is not correct for this app, you can use `rvm` to install a newer version of Ruby:

```sh
rvm install 2.7.4 --default
```

You should also install the latest versions of `bundler` and `rails`:

```sh
gem install bundler
gem install rails
```
### Install NodeJS

Verify you are running a recent version of Node with:

```sh
node -v
```

If your Node version is not 16.x.x, install it and set it as the current and
default version with:

```sh
nvm install 16
nvm use 16
nvm alias default 16
```

You can also update your npm version with:

```sh
npm i -g npm
```

### Install Postgresql

#### PostgreSQL Installation for WSL

To install Postgres for WSL, run the following commands from your Ubuntu terminal:

```sh
sudo apt update
sudo apt install postgresql postgresql-contrib libpq-dev
```

Then confirm that Postgres was installed successfully:

```sh
psql --version
```

Run this command to start the Postgres service:

```sh
sudo service postgresql start
```

Finally, you'll also need to create a database user so that you are able to
connect to the database from Rails. First, check what your operating system
username is:

```sh
whoami
```

If your username is "ian", for example, you'd need to create a Postgres user
with that same name. To do so, run this command to open the Postgres CLI:

```sh
sudo -u postgres -i
```

From the Postgres CLI, run this command (replacing "ian" with your username):

```sh
createuser -sr ian
```

Then enter `control + d` or type `logout` to exit.

[This guide][postgresql wsl] has more info on setting up Postgres on WSL if you
get stuck.

[postgresql wsl]: https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql

#### Postgresql Installation for OSX

To install Postgres for OSX, you can use Homebrew:

```sh
brew install postgresql
```

Once Postgres has been installed, run this command to start the Postgres
service:

```sh
brew services start postgresql
```

### 

### Application Install

```sh
bundle install
rails db:create
npm install --prefix client
npm install react-redux --prefix client
npm install react-icons --prefix client
npm install react-router-dom@5 --prefix client
```

## Server Start

You can use the following commands to run the application:

- `rails db:migrate db:seed`: migrate and seed the database (use `db:seed:replant` if this is not the first time running)
- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)

### Backend Shutdown

It should be possible to shutdown the server using [CTRL-C]. If that fails, follow these steps:

- `lsof -i tcp:9292`
  response:
  COMMAND PID USER ....
  ruby 1234 root ....
- `kill -9 1234`

## Usage



1. [`Login`] with your username & password. If this is your first time, create a user profile [`Sign Up`].
2. [`Landing Page`] once logged in or signed up you'll arrive on our landing page for instructions on how to use the app. 
3. If first time user you can start by creating a new Piece on the [`My Closet`] page. Or if you want to browse or add to our brands or styles you can do so on the [`Styles`] or [`Brands`] page. 
4. On My Closet page – Select [`Add New Piece`] to create a new piece... select the brand of your piece and the style you think it goes well with. If your [`Style`] or [`Brand`] isn't already in our list you can add them on the [`Styles] and [`Brands`] pages.
5. To edit the [`Piece`] click on the piece you want to edit which will take you to the [`Single Piece`] page where you can edit your piece. This page will also have information about the  [`Style`] and [`Brand`] for your piece.
6. To delete a [`Piece`] from your closet you can click the remove button on the [`My Closet`] page, or the [`Single Piece`] page. 
7. To cretate new brand click the [`Brands`] button in the navbar and select [`Add Brand`]. 
8. To see all of your [`Brands`] click the [`My Brands`] button on the [`Brands`] page. If you want to see all the [`Pieces`] you have for a brand click the [`Show My Pieces`] button. 
9. To see all the [`Styles`] click the [`Styles`] button in the navbar, hear you can add to our [`Styles`] catalog, or view your [`Styles`] by clicking the [`My Styles`] button. If you want to see all of your pieces in a particular [`Style`] click the [`Show My Pieces`] button.   
10. To logout click the [`Logout`] button on the navbar, then click the [`Logout`] button on the page.

## Room for Improvement

Backend:

- Complete all endpoints: 
  - Add more tables that allow users to create look books, wish list, and collections of pieces they think would go well together. 

Frontend:

- Allow users to add new pieces from the brands and styles pages. 
- Add new routes for looks books, wishlist, and overall just making it a more useful tool for people who want to manage their clothes, styles and brands.  
- Allow users to track how much they are spending 

