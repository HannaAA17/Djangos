### Build the client-side
* cd into the server/frontend

    `cd server/frontend`

* install all required packages

    `npm install`

* build the client

    `npm run build`


### Run the Mongo Server

* cd into database directory

    `cd server/database`

* Build the nodeapp.

    `docker build . -t nodeapp`

* start the server.

    `docker-compose up`


### Run the django server

* cd into server/

    `cd server`

* install virualenv lib

    `pip install virtualenv`

* create virtual environment called "djangoenv"

    `virtualenv djangoenv`

* activate the virtual env

    `source djangoenv/bin/activate`

* install the required libraries

    `python3 -m pip install -U -r requirements.txt`

* run the server

    `python3 manage.py makemigrations`

    `python3 manage.py migrate`

    `python3 manage.py runserver`


### Deploy sentiment analysis on Code Engine as a microservice
* cd into server/djangoapp/microservices directory.

    `cd server/djangoapp/microservices`

* docker build the sentiment analyzer app - code engine instance is attached to your lab space username.

    `docker build . -t us.icr.io/${SN_ICR_NAMESPACE}/senti_analyzer`

* Push the docker image.

    `docker push us.icr.io/${SN_ICR_NAMESPACE}/senti_analyzer`

* Deploy the senti_analyzer application on code engine.

    `ibmcloud ce application create --name sentianalyzer --image us.icr.io/${SN_ICR_NAMESPACE}/senti_analyzer --registry-secret icr-secret --port 5000`

* Connect to the URL that is generated to access the microservices and check if the deployment is successful.