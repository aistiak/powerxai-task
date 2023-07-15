

## Running the project 
- cd to the root directory of the project
- yarn install 
- yarn serve

server will run at `http://localhost:3000`


## what I did within 1 houre 
- desing a datastructure to store the data 
- implemented `GET /data?from={start_date}&to={end_date}` endpoint
- implemented `POST /data` endpoint 

## what I would have done if hade more time 
- would have used mongodb as databse 
- would have broken down big funtions into multipe smaller ones to make the code more testable
- put the parsing login in a middleware 
- try improve the project dirctory structure 
- name variables in a more meaningful way 
- add ts-docs for functions 
- maybe containerize the application  
- write unit tests and api tests 

would also adress the "Additional Considerations" 

## Additional Considerations

_How can we test the code to be confident in the implementation?_

By writing tests , could write unit test with `jest` and api test with `supertest`

_How can we make sure this code is easy to maintain for future developers?_

- could write api documentation or implementing swagger 
- writing tests , as reading tests tend to give a better understanding of what the code is supposed to do 

_Our API needs to be high-performance — how can we measure the performance of our API?_

- by monitoring api with tools such as datadog , ELK stack or solutions similar to those analyzing perfomance metrics and alert 
 

_How could we optimise this code if the API receives many more POST requests than GET requests? What about if the API receives many more GET requests than POST requests?_

if receives more POST request 
- could try to optimize the parsing logic to make it faster 

if receives more GET request 
- could add cachng to reduce load on server and imporve response time 
- improve `Power` metric calculation 

_Would any of this logic need to change to scale to millions of simultaneous connections?_

I think not , since this is a stateless app could just containerize it and put it in a container orchestration tools like k8s or aws ECS 



