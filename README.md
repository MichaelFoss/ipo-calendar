# Vise Finnhub Calendar

## Quick Setup

* `npm i`
* Copy `.env.sample` to `.env` and add API keys
* `npm start`
* Fire up http://localhost:3000/!

## Additional Scripts

* `npm test` to run some unit tests (will hit Finnhub)
* `npm lint` if you want to lint the project's code
* `npm lint:fix` if you want to lint and fix the project's code

## Caveats

* Tested on latest Chrome, but not much else. YMMV.
* Desktop works fine.
* Any IPOs retrieved from Finnhub which do not have a Symbol are ignored.

## Focus Points

* Architecture
* Functionality
* Caching of API request data
* Restriction of user interaction of app while fetching data
* Unit tests of utility functions (incomplete, but something to prove they're working)
* Proper environment setup for future development

## Things Left To Do

* Styling, animations, etc.
* Responsive design (looks good on Desktop, is usable on tablet/mobile)

## Bonus Features

* ✔️ Allow switching between time interval shown - i.e. implement day, week, and month calendar views
* ❌ Allow filtering events shown by exchange, price, etc.
* ❌ Add company earnings release events with Finnhub's earnings calendar API endpoint
* ❌ Allow users to add their own events, add notes on events, and/or "highlight"/"favorite" events
* ❌ Persist these inputs across sessions
* ❌ Any other polish or useful enhancements/features you can think of. Feel free to be creative!

## Key Takeaways

* **How long you spent on the exercise**: Literally *days*.
* **What you would change if you were to do it again**:
  * Request more time. This project is not really doable in 3.5 hours
    if you want to submit something of quality.
  * Toss the project provided. I spent too much time trying to fit my own
    environment stuff in (Jest, Babel, etc.) when I could've used
    a project I've used in the past and stripped it down to a template.
* **Anything else we should note**:
  * Solving problems like these are fun! Even struggling with some of the challenges
    such as environment issues and requirements stretch me and allow me to learn
    something new every time.
  * Your `Instructions.md` references the same Finnhub URL twice on lines 15 & 16.
  * Each of the "Bonus Feature" are great ideas, but are not reasonable
    stretch goals given the limited timeframe.
