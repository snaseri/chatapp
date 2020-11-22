# Getting Started with my Chat App

After running git clone and obtaining the project. You will need to run the following 3 commands in the terminal
to get these dependencies:  
npm i --save socket.io-client  
npm i --save socket.io  
npm install react-router-dom  

After that you can start the app by typing either of the following commands in the terminal:  
npm start  
react-scripts start  

After doing this go to the following directory /src/server of the app and open a gitbash terminal there.
There should be a javascript file inside there named 'server'. Type the following command in the gitbash terminal
to run the server:  
node server.js

The front-end of the project will be running on http://localhost:3000 whereas the server will be running on http://localhost:4000

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
