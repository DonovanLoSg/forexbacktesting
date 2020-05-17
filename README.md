<img src="http://currency-exchange-backtesting.donovanlo.sg/assets/img/logo/donovanlogo150x150.png" style="margin: 0;">

<h1>Currency Exchange Backtesting Project</h1>
<p>Interactive Frontend Development Milestone Project</p>

<hr>

<h2>Context</h2>

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
Traders believe when a short term average cross over a long term average, 
it shows the direction of the trend.
An upward trend is a buy signal and a downward trend is a sell signal.
```

<h2>Demo</h2>

Deployed project: http://currency-exchange-backtesting.donovanlo.sg/

Source code: https://github.com/DonovanLoSg/currency-exchange-backtesting.donovanlo-sg

// TODO: pic

<h2>Content</h2>

// TODO: 

:

<hr>

<h1>Defining the Project (Strategy)</h1>

<h2>Project Objectives</h2>

The objective of this project is to develop a small application that allows the trainer to demonstrate how to do backtesting using moving average strategy to the trainee.

The trainer can also allow trainees to have some hands-on using the application.

Both the trainer and trainee are considered as the users of the application.

<h2>User Stories</h2>
* As a user, I want to selected time period to view that period's historical currency exchange rates, so that it can relfect realistic market condition. 
* As a user, I want to view the short term and long term moving average, so that I can identify the point where I should apply the moving average strategy to buy or sell.
* As a user, I want to simulate transactions (buying and selling), so that I know the outcome (profits or losses) after I apply the strategy.

<h2>Use Case Diagram</h2>

<img src="http://currency-exchange-backtesting.donovanlo.sg/assets/img/readme/UseCaseDiagram.png" style="margin: 0;">

<hr>

<h1>Defining the Project (Scope)</h1>

<h2>Functional Requirements</h2>

1 Include a "Start a New Scenario" button
1 Include a search panel to select starting date and ending date
1 Include a chart panel to display the currency exchange rates on the selected dates
1 Include a transaction table to display the transactions made
1 Include a transaction entry form to allow adding of a transaction
1 Download Currency Exchange Rates between a set of selected dates (default dates used if none is selected) by consuming MAS's API.
1 Restructure downloaded Currency Exchange Rates and re-structure them to be used for rates retrieving and drawing charts.
1 Draw charts with the restructured information.
1 Reset the chart and empty the transaction table when "Start a New Scenario" button is clicked.
1 Allow user to select the starting date and ending date of the data to be retrieved and displayed.
1 Calculate the short term and long term moving average to add to the chart
1 Move and Adjust the X-axis to allow ease of analyzing the chart
1 Populate the transaction entry with info from the point clicked on the chart
1 Retrieve the rates from the re-structured data using an entered date
1 Allow transaction to be entered with dates, rates and indication of buying/selling.
1 Calculate the amount increase/decrease in the fund due to buying/selling
1 Allow transaction to be made with deposit and withdrawal of fund
1 Allow display of the updated transaction table whenever a transaction is made.
1 Calculate the grand total of the scenario

<h2>Content Requirements</h2>

Currency exchange rates historical data has to be downloaded by consuming MAS's API.
Fields to be retrieved are the date and the USD to SGD exchange rates.
The response data need to be restructure for charting purposes as well as rates look up during transaction entries.
Short term moving average and long term moving average are calculated from the restructured data.
A responsive chart with the exchange rates and moving average is to be display to the user.

<hr>

<h1>Developing the Site Structure and Organize Information (Structure)</h1>

<h2>Information Architecture</h2>

<h3>Content Inventory</h3>

:

<h3>Content Structure</h3>

:

<h3>Interaction Deisgn</h3>

// TODO: User Flow Diagram

<hr>

<h1>Developing Page Structure and Orgaize Interactions (Skeleton)</h1>

<h2>Navigation Deisgn</h2>

// TODO: Site map

<h2>Interface Design</h2>

:

<h2>Information Design</h2>

:

<hr>

<h1>Designing Graphics User Interface (Surface)</h1>

<h2>Visual Design</h2>

:

<hr>

<h1>Features</h1>

:

<hr>

<h1>Technologies Used</h1>

In this project I used **HTML5** to structure the webpages and **CSS3** to style them.

I uses **Git** for Versioning Control System and **GitHub** for repositories.

**Gitpod**, an online IDE, is my main coding platform. I do sometimes test out codes in **Repl.it**

The interativity is enabled by **Javascript** and it's libraries (**jQuery.js**, **axios.js**, **moment.js**, **Chart.js**), taking advantages of **DOM**, **Ajax** and **JSON**.


For viewing JSON document
* JSON Path Finder (https://jsonpathfinder.com/)

For use case Diagram
* Creately (https://creately.com/)

For grammer and spell check
* Grammer Checker - Online Editor (https://grammarchecker.io/) 
* Reverso - (https://www.reverso.net/spell-checker/english-spelling-grammar/)


<hr>

<h1>Testing</h1>

:

<hr>

<h1>Deployment</h1>

:

<hr>

<h1>Credits</h1>

: