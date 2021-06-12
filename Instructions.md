# Vise IPO Calendar Exercise

Thank you for taking the time to complete this exercise! We're excited to see the way you code, build user interfaces and experiences, and make technical decisions.

The exercise is scoped to **~3.5 hours**. If you do end up working for it longer than the suggested time, please let us know–this is just to make sure that our hiring team has the correct expectations when reviewing your work.

## High level objective

Design and implement a small web app to retrieve and present recent and upcoming company IPOs on a calendar.

## Details

Your calendar app should fetch the data about recent and upcoming IPOs from Finnhub's IPO calendar API.

- [Link](https://finnhub.io/docs/api/ipo-calendar) to Finnhub API usage instructions
- [Link](https://finnhub.io/docs/api/ipo-calendar) to Finnhub IPO calendar endpoint documentation

To call the API, you can use either one of these API keys. We are limited to 60 requests per minute, so in case you exceed the limit, feel free to switch between them as a workaround.

- `c1hiib748v6rmj5834rg`
- `c1hq6gf48v6sod8lj9a0`

This data should then be presented to the user with a neat, easy-to-use, and interactive interface. The exact design of this UI + UX is up to you - we'd like to give you the opportunity to demonstrate both your personal frontend skillset and your product intuition!

**Do not use libraries or pre-built components that solve too much of the problem** - for example, a library that renders a calendar. Otherwise, we're fine with general purpose frameworks and libraries like React, Angular, jQuery, Bootstrap, or moment.

After you have a basic calendar, here are some potential improvements to attempt:

- Allow switching between time interval shown - i.e. implement day, week, and month calendar views
- Allow filtering events shown by exchange, price, etc.
- Add company earnings release events with Finnhub's [earnings calendar](https://finnhub.io/docs/api/earnings-calendar) API endpoint
- Allow users to add their own events, add notes on events, and/or "highlight"/"favorite" events
  - Persist these inputs across sessions
- Any other polish or useful enhancements/features you can think of. Feel free to be creative!

Please also include a README that covers:

- How long you spent on the exercise
- What you would change if you were to do it again
- Anything else we should note

If you did not use the starter code, please also include instructions on how to build and run your project.

## Starter code

To use the starter code:

1. Navigate to this project directory
2. Run `npm install` to install dependencies
3. Run `npm start` to initialize and connect to a node server
4.

**Feel free to use as much or as little of the starter code as you'd like.**
