# Mite Overtime
Calculate your overtime from mite entries

**Dependencies**:
* Node >=4.0.0

# Setup
Clone the project into the desired folder

    git clone https://github.com/BernhardPosselt/mite-overtime

Then change into the directory and create a file with the following contents:

    cd mite-overtime

**local.js**
```javascript
'use strict'

module.exports = {
    baseUrl: '/'
}
```

* **baseUrl** is the URL under which the application is served

Then install the dependencies:

    npm install

and run the server with:

    node index.js