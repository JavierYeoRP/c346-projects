Green Habits Tracker

C346 – Mobile Application Development (CA2)
Project Documentation
-------------------------
# Project Overview
-------------------------
Green Habits Tracker is a mobile application developed using React Native to encourage environmentally sustainable daily behaviours aligned with the Singapore Green Plan 2030.

The application allows users to:

1) Log eco-friendly actions

2) Categorise habits into sustainability themes

3) Edit or delete logged habits

4) Track weekly progress through a dashboard and statistics screen

The project demonstrates full-stack mobile development, including frontend UI/UX design, backend API development, and database integration.
-----------------------------------------------------------------
# System Architecture
--------------------------------
[ React Native Mobile Application ]
                ↓
[ Express.js REST API ]
                ↓
[ MySQL Database ]

----------------------------------


The React Native app handles user interaction and UI rendering

The Express.js API processes requests and business logic

The MySQL database stores habits and categories persistently

# Key Features
----------------------------------------
1) Dashboard

Displays all logged habits

Shows weekly progress summary

Category filter chips for quick filtering

Hero section highlighting sustainability goals
----------------------------------------

2) Add Habit

----------------------------------------

Form with input validation

Category selection from database

Date selection

Optional notes

POST request to backend API

----------------------------------------


3) Edit Habit
----------------------------------------


Pre-filled form with existing habit data

Allows updating title, category, date, and notes

PUT request to backend API

----------------------------------------


4) Delete Habit
----------------------------------------

Custom modal confirmation dialog

Prevents accidental deletion

DELETE request to backend API
----------------------------------------

5) Statistics
----------------------------------------

Weekly habit count

Total habits logged

Top sustainability category

Mini bar chart visualisation
----------------------------------------


6) User Guide
----------------------------------------

Step-by-step instructions for app usage

Improves usability and onboarding

Accessible from within the app
----------------------------------------


# Database Design

----------------------------------------

Table: categories
Field	Description
id (PK)	Category ID
name	Category name (e.g. Energy, Recycling)
description	Sustainability purpose
----------------------------------------

Table: habits
Field	Description
id (PK)	Habit ID
title	Habit title
category_id (FK)	Linked category
date	Completion date
notes	Optional notes
created_at	Record creation timestamp
----------------------------------------

# API Endpoints
----------------------------------------
Method	Endpoint	   Description
GET	    /habits	Fetch      all habits
POST	/habits	        Add a new habit
PUT	   /habits/:id	    Update an existing habit
DELETE	/habits/:id	    Delete a habit
GET	    /categories	        Fetch habit categories

All endpoints follow RESTful API conventions.

🇸🇬 Alignment with Singapore Green Plan 2030

----------------------------------------

The application supports multiple Green Plan pillars:

1) Sustainable Living

2) Encourages recycling, waste reduction, and daily eco-friendly actions

3) Builds awareness through consistent habit logging

----------------------------------

# Energy Reset

1) Tracks actions such as saving electricity and reducing energy usage

2) Promotes energy-conscious behaviour

3) Green Economy (Behavioural Level)

4) Develops sustainable mindsets

5) Reinforces long-term environmentally responsible habits


# Team Member-(Responsibility)
--------------------------------------------
Weijie	

Dashboard screen, UI/UX design, filters, habit list, reusable components, database integration - design (schema)
--------------------------------------
Darius	
--------------------------------------
Add Habit & Edit Habit screens, form validation, category picker, POST & PUT API integration
--------------------------------------
Hong Chun	
--------------------------------------
Custom delete modal, Statistics screen, progress charts and visualisations
--------------------------------------
Javier Yeo	
--------------------------------------
User Guide screens, UI improvements, navigation flow updates

--------------------------------------

# Learning Outcomes

Through this project, the team gained experience in:

1) React Native component-based development

2) API integration using Fetch

3) CRUD operations with a real database

4) UI/UX design for mobile applications

5) Collaboration and task allocation

6) Applying real-world sustainability context to software solutions


# Conclusion

Green Habits Tracker successfully fulfils the C346 CA2 requirements by implementing:

1) A functional mobile application

2) Backend API with database integration

3) Full CRUD functionality

4) Clear navigation and usability

5) Real-world sustainability alignment

The project demonstrates how mobile technology can be used to encourage positive environmental behaviour through simple, consistent habit tracking.


## Backend API URL (Render)

https://ca2-greenhabittracker.onrender.com

Note: This URL hosts the backend service only. The mobile application is built using Expo React Native and is run locally via Expo Go.