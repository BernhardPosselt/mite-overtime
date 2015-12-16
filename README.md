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
    
# Start Server Automatically Using SystemD

Adjust the following service file to your needs, most likely:
* ExecStart: adjust the NodeJs and index.js path
* User: ajdust the user which runs the app (usually same as the home directory where you've put it)
* Group: same as User
* Environment=PORT=8000: Change the port number if required

```ini
[Service]
ExecStart=/usr/local/bin/node /home/node/web/mite-overtime/index.js
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=mite-overtime
User=node
Group=node
Environment=NODE_ENV=production
Environment=PORT=8000

[Install]
WantedBy=multi-user.target
```

Then put this file into **/etc/systemd/system/mite-overtime.service** and run the following commands once:

    sudo systemctl enable mite-overtime
    sudo systemctl start mite-overtime
    
# Running The Server On A Sub-Url
If you want to run it on an already existing domain, but for instance under an additional sub-url like **yourdomain.com/mite-overtime**, add the following to your apache configuration for the respective URL:

```
ProxyPass /mite-overtime http://localhost:8000
```

You need to enable mod_proxy for this feature. On Debian you can use:

    a2enmod proxy
