## Node JS

### Build Node JS Application
```
npm install
```

### Run Node JS Application
```
node app.js

or

npm start
```

### Access Node JS Application
```
http://localhost:8181
```

### Kill Node JS Application
```
http://localhost:8181/error
```

### Build Docker Image
```
docker build -t nodejs-app .
```

### Run Docker Image
```
# If your application listens on port 8181, mapping it to port 8080 on the host

docker run -p 8080:8181 nodejs-app

```




