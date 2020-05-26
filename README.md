<img src="http://forexbacktesting.donovanlo.sg/assets/img/logo/donovanlogo150x150.png" style="margin: 0;">

# FOREX Backtesting Project
*Interactive Frontend Development Milestone Project*

<hr>


## Context

A trainer for a trading company need an interactive simulator to explain to the novice about backtesting and moving average strategy.

```
Definition: 
**Backtesting** is a term used in modelling to refer to testing a predictive model on historical data. 
Backtesting is a type of retrodiction, and a special type of cross-validation applied to previous time period(s).
(Source: Wikipedia)
```
```
Explanation:
**Moving averages** are the most basic technical strategy. 
The goal is to identify the trend's direction to capitalize on it. 
Traders believe when a short-term average cross over a long-term average, 
it shows the direction of the trend.
An upward trend is a buy signal and a downward trend is a sell signal.
```


## Demo

Deployed project: http://forexbacktesting.donovanlo.sg 

Source code: https://github.com/DonovanLoSg/forexbacktesting 

// TODO: pic


## Content

// TODO: 

:

<hr>


# Defining the Project (Strategy)

## Project Objectives

The objective of this project is to develop a small application that allows the trainer to demonstrate how to do backtesting using moving average strategy to the trainee.

The trainer can also allow trainees to have some hands-on using the application.

Both the trainer and trainee are considered as the users of the application.

## User Stories

* As a user, I want to selected time period to view that period's historical currency exchange rates, so that it can reflect realistic market condition. 
* As a user, I want to view the short-term and long-term moving average, so that I can identify the point where I should apply the moving average strategy to buy or sell.
* As a user, I want to simulate transactions (buying and selling), so that I know the outcome (profits or losses) after I apply the strategy.

## Use Case Diagram

<img src="http://forexbacktesting.donovanlo.sg/assets/img/readme/UseCaseDiagram.png" style="margin: 0;">

<hr>


# Defining the Project (Scope)

## Functional Requirements

1. Include a "Start a New Scenario" button
1. Include a search panel to select starting date and ending date
1. Include a chart panel to display the currency exchange rates on the selected dates
1. Include a transaction table to display the transactions made
1. Include a transaction entry form to allow adding of a transaction
1. Download Currency Exchange Rates between a set of selected dates (default dates used if none is selected) by consuming MAS's API.
1. Restructure downloaded Currency Exchange Rates and re-structure them to be used for rates retrieving and drawing charts.
1. Draw charts with the restructured information.
1. Reset the chart and empty the transaction table when "Start a New Scenario" button is clicked.
1. Allow user to select the starting date and ending date of the data to be retrieved and displayed.
1. Calculate the short-term and long-term moving average to add to the chart
1. Move and Adjust the X-axis to allow ease of analysing the chart
1. Populate the transaction entry with info from the point clicked on the chart
1. Retrieve the rates from the re-structured data using an entered date
1. Allow transaction to be entered with dates, rates and indication of buying/selling.
1. Calculate the amount increase/decrease in the fund due to buying/selling
1. Allow transaction to be made with deposit and withdrawal of fund
1. Allow display of the updated transaction table whenever a transaction is made.
1. Calculate the grand total of the scenario

<h2>Content Requirements</h2>

1. Currency exchange rates historical data has to be downloaded by consuming MAS's API.
1. Fields to be retrieved are the date and the USD to SGD exchange rates.
1. The response data need to be restructure for charting purposes as well as rates look up during transaction entries.
1. short-term moving average and ;pmg-term moving average are calculated from the restructured data.
1. A responsive chart with the exchange rates and moving average is to be display to the user.

<hr>

# Developing the Site Structure and Organize Information (Structure)

## Information Architecture

### Wireframe

<img src="http://forexbacktesting.donovanlo.sg/assets/img/readme/wireframe.png" alt="wireframe for this app" style="margin: 0;">

### Sitemap

<a href="http://forexbacktesting.donovanlo.sg/assets/img/readme/sitemap.png" alt="sitemap for this app" target="_blank"><img src="http://forexbacktesting.donovanlo.sg/assets/img/readme/sitemap_small.png" style="margin: 0;"></a><br>
<a href="http://forexbacktesting.donovanlo.sg/assets/img/readme/sitemap.png" target="_blank">Click to Enlarge</a>

### Content Inventory

#### Data Source

The chart is generated from data published by Monetary  Authority of Singapore through API.

Source: https://secure.mas.gov.sg/api/APIDescPage.aspx?resource_id=95932927-c8bc-4e7a-b484-68a66a24edfe

Data consumed from this endpoint includes dates and USD-SGD daily exchange rates.

### Interaction Design

1. Match user experience and expectations

    The layout of the design has taken into account the user experience and expectation.
    Historical currency exchange rates are presented in the chat they are used seeing.

1. Consistency

    Consistency of the layout helps the users to navigate through the pages easily.
    The forms and chart are contained in panels.
    The clickable buttons are blue and the panels with interactions are in green.

1.  Functional minimalism

    The layout are at it's minimal with any clattered bells and whistles. 
    Simple forms mirror those of the physical world, increasing sense of familiarity 
    It is simple to use and fulfil all the functions required by the objectives.

1.  Cognitive loads

    The historical information can be easily retrieved by just filling in the relevant fields.
    Transactions can also be easily done using one of the two forms.
    The application helps to keep track of the transactions as well as the balance so 
    the user do not need to bother himself to remember or take notes.

1.  Engagement

    The application provide a platform to engage the user to test out their investment strategy. 
    Every actions performed is responded by the application.
    E.g. When the user key in a new value into the moving average, the chart will be updated instantly.

1.  Control, trust, and explorability

    There is no monetary exchange and the users are welcomed to try as many rounds as they like without any risks.

1.  Learnability

    The application is design to be easily learnt without much effort. 
    In rare event the user does not know where to start, he can always go to About page and How Tos page to learn more.

1.  Error prevention, detection and recovery

    Use of date pickers and numeric input fields restrict the type of input they can make, 
    reducing chance of invalid values entered.
    The user does not even need to enter the extra rate as it is retrieve based on the date of transaction.

    For convenience, if the user is interest in a certain point on the chart, 
    the information will be transfer to the Transaction Entry Form.

    The users will be alerted if an invalid value is entered.

    Even when invalid values are entered, it will not crash the system. 
    It just wait for the next command without doing anything.

1.  Responsiveness

    The site is responsive. User can access the site through browsers on a PC or through smart mobile phone.
    The content will arrange itself as not to disturb the users' experience. 



#### User Flow Diagram

<img src="http://forexbacktesting.donovanlo.sg/assets/img/readme/userflow.png" style="margin: 0;" alt="user flow diagram">

<hr>

# Developing Page Structure and Organise Interactions (Skeleton)

## Navigation Design

<img src="http://forexbacktesting.donovanlo.sg/assets/img/readme/navigation.png" style="margin: 0;" alt="Navigation Map">

Bootstrap component will be used to make the navigation responsive.

### Logo
Logo on every page, clicking on it will bring the visitor to the Home Page. [Bootstrap Component - Navbar]

### Main Navigation
Main Navigation is a fixed position menu at the top of every web page. The 3 pages (Home, Resume, Portfolio) are listed and they are hyperlinked to their respective pages. [Bootstrap Component - Navbar]

### Collapsible Hamburger Mobile Menu
The top navigation will be minimised into a hamburger menu when displayed in mobile screens or other small screens. Clicking on it will display the familiar 3 choices. [Bootstrap Component - Navbar]

## Interface Design

The site consist of three pages.

Each page will include three parts - header, main and footer.

Header and footer include sections that will be repeated all the pages to improve predictability and consistency.

Header will include a logo, title and the main navigation.

Footer will include a disclaimer.

The main content section will display content related to the page.

For the home page, it is the application which consist of different panels.

<img src="http://forexbacktesting.donovanlo.sg/assets/img/readme/interface.png" style="margin: 0;" alt="List of user tasks and corresponding interface elemnts to enable them. ">

## Information Design

### Historical currency exchange rate 

The purpose of the system is to allow the user to understand and be familiar with the concept of backtesting and using moving average strategy.

The numeric data are presented in a line chart to display trends over a period of time.

It is easier to recognise which direction the rates are going compare to a series of numbers.

### short-term and ;pmg-term Moving Average 

A simple moving average (SMA) is an arithmetic moving average calculated by adding recent prices and then dividing that by the number of time periods in the calculation average. For example, one could add the closing price of the security for a number of time periods and then dividing this total by that same number of periods. Short-term averages respond quickly to changes in the price of the underlying, while long-term averages are slower to react. 
(cite: Investopedia - investopedia.com/terms/s/sma.asp)

Laying the moving average lines on top of the exchange rates trendline, it enables the users to apply and test out their strategy.

Moving averages are an important analytical tool used to identify current price trends and the potential for a change in an established trend. The simplest use of a SMA in analysis is using it to quickly identify if a security is in an uptrend or downtrend. Another popular, albeit slightly more complex, analytical use is to compare a pair of simple moving averages with each covering different time frames. If a shorter-term simple moving average is above a longer-term average, an uptrend is expected. On the other hand, if the long-term average is above a shorter-term average then a downtrend might be the expected outcome.

### Transactions

What would be a better way to simulate a trading scenario? 

The system allows the users to enter the transactions base on their strategy, using the real historical  data.

After completing all their transaction, the will be able to see whether they are making a profit or a loss.

<hr>

# Designing Graphics User Interface (Surface)

## Visual Design

### Colour

The common color for financial sector are gold, brown, blue and green.

The main color I chosen for this site is green.

This is written in the article "the psychology of color and your financial brand"
https://www.prosperitycoaching.biz/a-psycology-of-color-and-your-brand/

Green is the color of money. If you use green in your website design you may be giving off a subconscious feeling of wealth. Green is also a healing color and the color of nature. Harmony exists where green is prevalent. Green often makes one feel calm. There are many green color variations that are suitable for an investment firm, such as sage, teal, or evergreen.

Does it works? You be the judge.

### Fonts

There not really that much reading on this site. 

But I have still chosen fonts that enhance readability.

They are Open Sans, Verdana and san-serif.

Sans serif fonts are used as the base for the website and the logo as they give the image of being modern, approachable, and clean.

The clean lines and sharp edges are able to render out more clearly on a screen which increases legibility for users.


Fonts family used as the base is Open Sans (https://fonts.google.com/specimen/Open+Sans).


<hr>

# Features

- View historical currency exchange rates from Monetary Authority of Singapore
- View chart within a user specified timeframe
- View and customised short- and long-term moving average
- Display or Hide the trendline and moving average
- Click on a point of the chart to have its date and exchange rate populate the transaction entry form
- Select a date on the transaction entry form and the exchange rate for the day will be automatically retrieved
- Conduct trading (buy / sell) USD
- Deposit/Withdraw SGD
- View the transactions records sorted ascendingly by date
- View the balance of the funds instantly updated after every transaction


<hr>

# Technologies Used

In this project I used **HTML5** to structure the webpages and **CSS3** to style them.

I uses **Git** for Versioning Control System and **GitHub** for repositories.

**Gitpod**, an online IDE, is my main coding platform. I do sometimes test out codes in **Repl.it**

I use **Bootstrap 4**, including its compoents and utilities for layout. **NavBar** is used for the main navigation, **box-shadow* utilities are also applied.

The interativity is enabled by **Javascript** and it's libraries (**jQuery.js**, **jQuery Validator**, **axios.js**, **moment.js**, **Chart.js** ), taking advantages of **DOM**, **Ajax** and **JSON**.

A CSS Reset style sheet from Killer Collection of CSS Resets (https://perishablepress.com/a-killer-collection-of-global-css-reset-styles/) is used in additional to
Code Institues templates (https://github.com/Code-Institute-Org/gitpod-full-template) to start the coding. 
The template used for Readme.md is also from Code Institute (https://github.com/Code-Institute-Solutions/readme-template/blob/master/README.md)

For codes generating
* CSS Button Generator (http://www.bestcssbuttongenerator.com/)
* Embed Responsively (https://embedresponsively.com/)

For codes formatting
* HTML Codes Formatter (https://www.freeformatter.com/html-formatter.html)
* CSS Beautifier (https://www.freeformatter.com/css-beautifier.html)
* Dirty Markup (https://www.10bestdesign.com/dirtymarkup/)

For codes validation
* W3C Markup Validation Service (https://validator.w3.org/)
* W3C CSS Validation Service (https://jigsaw.w3.org/css-validator/)
* JSLint (https://jslint.com/)
* W3C Link Checker (https://validator.w3.org/checklink)
* Color Contrast Accessibility Validator (https://color.a11y.com/Contrast/)

For user flow diagram and mindmaping
* Xmind (https://www.xmind.net/)

For fonts
* Font Awesome 4 (https://fontawesome.com/v4.7.0/)

For wireframe
* MockFlow (https://www.mockflow.com/)

For sitemap
* GlooMaps (https://www.gloomaps.com/)
* Draw.io (https://www.draw.io/)

For viewing JSON document
* JSON Path Finder (https://jsonpathfinder.com/)

For use case Diagram
* Creately (https://creately.com/)

For image editing
* Pixlr (https://pixlr.com)
* Paint.NET (https://www.getpaint.net)

For placeholder before real content are inserted
* Placeholder.com (http://placeholder.com)
* PlaceIMG (http://placeimg.com)
* Lorem Ipsum Generator (https://loremipsum.io/)
* Lipsum Generator (https://www.lipsum.com/)

For grammer and spell check
* Grammer Checker - Online Editor (https://grammarchecker.io/) 
* Reverso - (https://www.reverso.net/spell-checker/english-spelling-grammar/)


<hr>

# Testing

## Functionality Testing

### Link Testing
Using W3C Link Checker (https://validator.w3.org/checklink)

Home Page

    Links
    Valid links!

    Anchors
    Found 33 anchors.

    Valid anchors!

    Checked 1 document in 22.76 seconds.

About Page

    Links
    Valid links!

    Anchors
    Found 7 anchors.

    Valid anchors!

    Checked 1 document in 16.93 seconds.

HowTos Page

    Links
    Valid links!

    Anchors
    Found 8 anchors.

    Valid anchors!

    Checked 1 document in 17.68 seconds.

### Form Testing

Command panel

Transaction Entry Form

Fund Adjustment Form

### HTML Testing
Using W3C Markup Validation Service (https://validator.w3.org/)

Home Page

    Warnings (4) · Hide all warnings · Show all warnings
    The date input type is not supported in all browsers. Please be sure to test, and consider using a polyfill. (4)



### CSS Testing

### Color Contrast Accessibility Testing

Using Color Contrast Accessibility Validator (https://color.a11y.com/Contrast/)

Home Page

    Congratulations!
    No automated color contrast issues found on the webpage tested

About Page

    Congratulations!
    No automated color contrast issues found on the webpage tested

How Tos Page

    Congratulations!
    No automated color contrast issues found on the webpage tested



## Usability Testing

### Navigation Testing

### Content Testing

# Compatibility Testing

## Browser Compatibility Testing

## Mobile Compatibility Testing






<hr>

# Deployment

## Preparation

Before the site goes 'live':

## Content

Ensured all the last changes are saved and committed.
Did a Git Push
Register a domain name
Search and register a domain name at Vodien.com (https://www.vodien.com/)
(for more info: https://www.vodien.com/domain-names/)

Go to the domain name registered and select Manage DNS
Add a CNAME entry for "forex-backtesting" and link it to my Git Hub Repository (donovanlosg.github.io)

# Production

Putting the site into production.

## Git Pages

At the Git Repository, I navigate to the 'Setting'
I scrolled down to the Git Pages section.
Select 'master branch'
View and test the site at https://donovanlosg.github.io/donovanlo-sg/
(for more info: https://help.github.com/en/github/working-with-github-pages/getting-started-with-github-pages)

## Directing Internet Traffic

At the Git Repository, I navigate to the 'Setting'
I scrolled down to the Git Pages section.
Enter the custom domain name 'forexbacktesting.donovanlo.sg'
View and test the site at http://forexbacktesting.donovanlo.sg
(for more info: https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site)


<hr>

# Credits

: