# Getting Started with my Chat App

After running git clone and obtaining the project. You will need to run the following 3 commands in the terminal
to get these dependencies: (Open the terminal in the root project directory)  
npm i --save socket.io-client  
npm i --save socket.io  
npm install react-router-dom  

After that you can start the app by typing the following commands in the terminal:  
npm start  


After doing this go to the following directory /src/server of the app and open a gitbash terminal there.
There should be a javascript file inside there named 'server'. Type the following command in the gitbash terminal
to run the server:  
node server.js

The front-end of the project will be running on http://localhost:3000 whereas the server will be running on http://localhost:4000

RUNNING TESTS:
All my tests are located at src/__tests__. To run them I am using Webstorm IDE. If you open the project using the same IDE go the tests directory and open of the test files, on the left handside of each test fucntion there will be a green run button to run the tests. Alternatively, if you open a terminal in the root directory of the project and type the following 2 commands to run the 2 tests that I have done:
npm test src/__test__/App.test.js  
npm test src/__test__/Room.test.js  
NOTE: THE GIVEN DIRECTORIES THAT ARE IN BOLD ARE NOT MEANT TO BE IN BOLD AND ITS GITLAB FORMATTING. Any word thats bold is meant to have 2 '_' before and after the word.


The reason I chose to use socket.io to build my app is socket.io is a library that allows the use of websockets which
allows bidrectional communication between a server and a client. This is good because it allows for realtime communication
which is much more suitable for a chat app. Whereas, a HTTP based API works by request-response. In a request-response
scenario the client would have to continuously ask for changes in set interval which is not real-time and ideal for a chat app. 
Additionally, HTTP is a stateless protocol and a overhead of a HTTP header is added to every message. These headers can be quiet large
and this can have a negative impact for frequent messages, specially if the message is very small. However, if I were to
do this project again I would consider looking at other libraries that offer Websockets. This is because this library is not very well maintained
anymore and the newer versions can have problems. As you may have noticed in my package.json I'm using an older version of
socket.io(2.3.0) instead of the newset which is 3.0.0. This is because of the CORS issue that the newer versions have.
This is a well known issue in socket.io community. Along with other issue such has their documentation not being maintained
and updated with some functions that are on the documentation but dont exist in the library.

I also used react-router-dom to which allows directing users to different components that render different things based on their path.
I found this extremely useful as its easy to setup because as mentioned on their website(https://reactrouter.com/web/guides/quick-start)
this tool was created and designed for create react app which is what I am using. However, according to https://www.pluralsight.com/guides/pros-and-cons-of-client-side-routing-with-react
this tool has some downsides in terms of performance. Such as 'The initial loading time is considerably large as all the routes, components, and HTML have to be loaded at once when the application first mounts . The whole website or web app needs to be loaded on the first request.' and 'There is unnecessary data download time for unusable views that'. However,
this didn't cause any performance issues for me as my application didn't contain many different views. Overall, I found this library very useful.  


ASSUMPTIONS MADE FOR REQUIRMENTS:
3) Some way to start and stop the game/collaboration/interaction:
I added a home page and asked a user to select a room to start the collaboration and I assumed if the user wants to stop the collaboration they can close the tab or go back to the home page to enter a new chat room. Therefore, in the chat room I did not add the option(such as a button) to directly end the collaboration.

PROGRAMMING PARADIGMS  
My chat app is largely an event driven program. For example, as seen in the server file(https://git.cardiff.ac.uk/c1888032/cm6311-coursework-chatapp/-/blob/master/src/server/server.js) on line 59,75 and 92 the server is listening for events which are generated by user interacting with the program. For example as seen in ChatHandler.js(https://git.cardiff.ac.uk/c1888032/cm6311-coursework-chatapp/-/blob/master/src/server/server.js) Line 78-113 are all functions that trigger an event on server side. And every other function in the useEffect (line 22-76) are all listening for events that come back from the server. A user can trigger an event by for example changing their name, avatar or writing a message.   
I have also used React Hooks which is all about Aspect-Oriented programming. Again the 'useEffect' inside Chat Handler is an example of this. Aspect-Oriented programming aims aims to increase modularity. http://bhochhi.blogspot.com/2016/06/aspect-oriented-programming-in.html explains why using this method can be useful. In short, it makes the code simpler and more readable as they help extract the logic and allows putting all related parts together(2).

Sources:
(1) https://en.wikipedia.org/wiki/Aspect-oriented_programming  
(2) https://medium.com/@vyaron/frontend-aop-react-hooks-vs-vue-composition-api-7889d917d4cf#:~:text=React%20hooks%20are%20sensitive%20to,pass%20the%20correct%20dependency%20array.  

CONVENTIONS APPLIED:  
Consolidating duplicate code. As seen in my server.js file (https://git.cardiff.ac.uk/c1888032/cm6311-coursework-chatapp/-/blob/master/src/server/server.js) line 129-157 are all functions created to reduce duplicate code. As those functions needed to be called multiple times on different events. For example the function 'generateRoomActiveUsers(roomId)' needed to be used once a user joins or leaves a chat room or when a user updates their name (line 48,89 and 113).

Comment only when necessary. I've tried to make my code as clean as possible by avoiding to cluster the code with comments. I tried using function and event names for example to explain the code without writing lines and lines of comments.

I have also tried following name conventions by starting my component names with capitals, javascript file names with capitals, folders starting with lowercase, and variables starting with lower case camal case. All tests are put in a folder named '__tests__' and all test files have (FileName).test in them with FileName being the file thats been tested.

All files related to any one component should be in a single folder. as seen in my views folder I put the css file relating for each component in the same folder. 



