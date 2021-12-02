# ***Express app Redis and Mongo db.***

## **How to create node app with dockerfile**

### **1. setting up Dockerfile**
- **1 step** -> _FROM_ = what image to pull / _node:15_ = name of the image and its version. 
- **2 step** -> _WORKDIR_ = set up you directory / _/app_ = your working directory inside docker container.
- **3 step** -> _COPY_ = copy the following from /  _package.json_ = what to copy / _._ = where to copy.
- **4 step** -> _RUN_ = run the following  / _npm install_ = a command docker should run to install dependencies for project.
- **5 step** -> _COPY_ = copy the following from / _._ = copy all the files and folders from your curent directory / _./_ = to docker working _/app_ directory.
- **6 step** -> _ENV_ = envoriment variable / _PORT_ = variableName / _3000_ = variableValue .
- **7 step** -> _EXPOSE_ = exposing port / _${PORT}_ = port number , its manly used for documentacional purposes.
- **8 step** -> _CMD_ = what command  to run / _["npm","run","dev"]_ = development script using nodemon.

#### **Exemple of _Dockerfile_**
```
FROM node:15

WORKDIR /app

COPY package.json .

RUN npm install

COPY . ./

ENV PORT 3000

EXPOSE ${PORT}

CMD ["npm","run","dev"]
```



### **2. Build image from Dockerfile**
###### _-t_ --- tag for setting name of Docker image,
###### _node-app-image_ --- name you give for new docker image,
###### _._ --- location of ***Dockerfile*** from current path.

```
 docker build -t node-app-image . 
```



### **3. List all images**
###### _ls_ --- tag for listing (in this case images).,
###### _image_ --- represents docker images

```
 docker image ls  
```



### **4. remove docker image**
###### _rm_ --- tag for removing,
###### _image_ --- represents docker images,
###### _d23a8cc69a73_ --- represents docker image id
###### _node-app-container_ --- represents docker image nameTag

```
 docker image rm d23a8cc69a73  
```
or
```
 docker image rm node-app-image  
```



### **5. Run container**
###### _-v_ --- tag for volumes,
###### _%cd%:/app_ --- _pathToFolderOnLocation:pathToFolderOnContainer_

#### **Commands to get current path:** 
- cmd or Command shell:  
```
%cd%
```
- Powershell:  
```
${pwd}
```
- mac os:  
```
$(pwd)
```
###### _-p_ --- tag for setting your ports,
###### _3000:3000_ --- portNumOutsideContainer:portNumInsideContainer
###### _node-app-image_ --- docker image that you run,
###### _-d_ --- detach from terminal,
###### _--name_ --- tag  for naming your new docker container,
###### _node-app-container_ --- name you give for new docker container,
###### _run_ --- run container
###### _-v_ --- tag for docker volume:
###### _%cd%:/app:ro_ --- _pathToFolderOnLocation:pathToFolderOnContainer_ , ***:ro*** what it means is that it only reads files from our **local host machine** and not creating or deleting files that we changed in docker container **/app** directory.
###### _/app/node_modules_ --- with tag **-v** preventing **bindMount** from deleting files in specified path.
###### _--env | -e_ is used to set enviroment variables directly through command line.
###### _PORT=4000_ setting env variable _PORT_ to _4000_ 
###### _--env-file_ is used to set enviroment varible using .env file.
###### _./.env_ path to your .env file.

#### **Docker Volumes** allows us to have ***persistant*** data.
#### In this case we used specific type of volume :
> ***[bindMount](https://docs.docker.com/storage/bind-mounts/)***
###### **bind mount** allows us to sync a folder in our _local host machine_, to a folder in our _Docker container_.

#### In combination with devDependencies
> ***[nodemon](https://www.npmjs.com/package/nodemon)*** 
###### We can take all files inside our directory and sync them into the _'/app'_ directory of our container ,so that we dont have to continiously rebuild our image and redeploy container every time we make changes to our code or files.It will automatically _sync_ those two for us , to really speed up developmnent proccess.

#### During development:
```
 docker run -v %cd%:/app:ro -d -v /app/node_modules -p 3000:3000 --name node-app-container node-app-image
```
#### During production:
```
 docker run -d -p 3000:3000 --name node-app-container node-app-image
```
#### set **ENV** variables directly
```
 docker run -v %cd%:/app:ro -d -v /app/node_modules --env PORT=4000 -p 3000:4000 --name node-app-container node-app-image
```
#### set **ENV** variables from .env file in your directory
```
 docker run -v %cd%:/app:ro -d -v /app/node_modules --env-file ./.env -p 3000:3000 --name node-app-container node-app-image
```

### **6. Show running containers**
###### _ps_ --- shows all running containers,
###### _-a_ --- tag for show all

```
 docker ps
```
```
$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAM
```
#### or if you want see all containers started or crashed.
```
 docker ps -a
```
#### Response
```
CONTAINER ID   IMAGE            COMMAND                  CREATED         STATUS                       PORTS     NAMES
c3f516b19f4c   node-app-image   "docker-entrypoint.s…"   2 minutes ago   Exited (127) 2 minutes ago             node-app-container
```


### **7. Interact with docker container files**
###### _it_ --- tag for interactive mode,
###### _exec_ --- exucute following,
###### _node-app-container_ --- represents docker image nameTag,
###### _bash_ --- command to access our docker container files

#### **#Note1#** You can only run this command once the node-app-container is deployed.

``` 
 docker exec -it node-app-container bash 
```

### **#Note2#** You can only run this commands inside cli of running container.

#### Basic commands:
- _Enter folder:_
``` 
 cd folderName
```
- _List all files and folders:_
``` 
 ls 
```
- _Print out file content:_
``` 
 cat fileName
```
- _Exit file system:_
``` 
 exit 
```
- _Create new file:_
``` 
 touch fileName 
```
- _Create new folder:_
``` 
 mkdir folderName
```
-_List all enviroment variables_
``` 
 printenv
```


### **8. Stop the container _'forcefully'_**
###### _rm_ --- kil specific container,
###### _node-app-container_ --- container name,
###### _-f_ --- force it to execute the command

```
 docker rm node-app-container -f
```

### **9. List all volumes**
###### _volume_ --- volume tag.
###### _ls_ --- list all.

```
 docker volume ls
```
#### Response
```
DRIVER    VOLUME NAME
local     2c26089b24a337d9b50b45a7e4fa19107fb346cf01178d2a935e235293f42e5b
local     07d2547628b9bbb0b26d13d00b3653f89d76d9d8fec73bdaa9d2b9437dc2c4d6
```

### **10. delete volumes**
###### _volume_ --- volume tag.
###### _rm_ --- remove.
###### _07d2547628b9bbb0b26d13d00b3653f89d76d9d8fec73bdaa9d2b9437dc2c4d6_ --- volume name

#### Removes one volume
```
 docker volume rm 07d2547628b9bbb0b26d13d00b3653f89d76d9d8fec73bdaa9d2b9437dc2c4d6
```

#### Removes all volumes that are not being used curently
```
 docker volume prune
```

## **How to create node app with docker-compose**

### **1. Create docker-compose.yml file.**

####  _docker-compose.yml_ file is blueprint for how should docker run our container.

> _version:'3'_ 
###### Set version of ***docker-compose.yml*** file for more _[click_here](https://docs.docker.com/compose/compose-file/compose-versioning/)_.

> _services:_ 
###### Set up your services.

> _node-app-container_
###### Name of the service for your node app.

> _build: ._
###### Points to a directory where your **Dockerfile** resides.

> _ports:_
###### Set What ports should we listen to.

> -"3000:3000"
###### portNumOutsideContainer:portNumInsideContainer

> _volumes:_
###### Mechanism for persisting data generated by and used by Docker containers

> _-./:/app _
###### pathToFolderOnLocation:pathToFolderOnContainer

> _- /app/node_modules_
###### Preventing **bindMount** from deleting files in specified path.

> _environment:_
###### Allows developers to set and manage environment variables. Environment variables that will be included.

> _-PORT=3000_
###### Set **ENVIRONMENT** variable.

>_env_file:_
###### Set file that has all **ENVIRONMENT** varibles.

> _-./.env_
###### env file location.

```
version: '3'

services:
  node-app-container:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./:/app
      - /app/node_modules
    environment:
      - PORT=3000
    #env_file:
    # - ./.env   

```

### **2. run the container**

###### _docker-compose_ --- when running _docker-compose.yml_ file.
###### _up_ --- run the cointainer.
###### _-d_ --- detach from console.
###### _--build_ --- it will force brand new build

```
docker-compose up -d 
```
```
docker-compose up -d --build
```

### **3. run the container**

###### _down_ --- stop the cointainer.
###### _-v_ --- delete all volumes connected to the container.

```
docker-compose down -v
```

## **How to separate production and development enviroments using docker-compose**

### **1. Set the _Dockerfile_**

###### _ARG_ --- Argument that gets past into our Dockerfile when its building our docker image.

```
FROM node:15

WORKDIR /app

COPY package.json .

ARG NODE_ENV

RUN if [ "NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . ./

ENV PORT 3000

EXPOSE ${PORT}

CMD ["node","server.js"]
```


### **1. Create docker-compose.yml file.**

```
version: '3'

services:
  node-app-container:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000  

```

### **2. Create docker-compose.dev.yml file.**

```
version: '3'

services:
  node-app-container:
    build:
      context: .
      args: 
        - NODE_ENV:development
    volumes:
      - ./:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
```

### **3. Create docker-compose.prod.yml file.**

```
version: '3'

services:
  node-app-container:
    build:
      context: .
      args: 
        - NODE_ENV:production
    environment:
      - NODE_ENV=production
    command: node server.js
```

>**NOTE**- Order of files mentioned in command prompt matters!.

- Add _--build_ tag at the end if needed.
```
--build
```

### **4. How to run in **development** mode.**

###### _-f_ --- tag represents file.
###### _docker-compose.yml_ --- **First file**. yml File that shares properties of _dev_ and _prod_
###### _docker-compose.dev.yml_ --- **Second file**. What a _development_ build should contain.

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d 
```
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v 
```

### **5. How to run in **production** mode.**

###### _docker-compose.prod.yml_ --- **Second file**. What a _production_ build should contain.

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d 
```
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```

## **How to add mongodb in docker with node js app**

### **1. Add new service to _docker-compose.yml_ file.**

#### New service is our mongodb database _mongo_.

> _mongo:_
###### db service called _mongo_

> _image: mongo_
###### The image that will be pulled for the service.
###### Name of the official docker image for mongodb.

>  _volumes:_
  _- mongo-db:/data/db_
######  ***mongo-db:/data/db*** This is called **named** volume.
######  **/data/db** path to our data stored in a container.

> _volumes:_
  _mongo-db:_
###### You have to declare service used by this container.

>**NOTE** When doing bringing down a container dont use -v flag if you dont want to delete data form your db.  

```
version: '3'

services:
  node-app-container:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
  mongo:
    image: mongo
    environment:
      - MONGO_INITDB_ROOT_USERNAME=one_zee
      - MONGO_INITDB_ROOT_PASSWORD=password1
    volumes:
      - mongo-db:/data/db


volumes:
  mongo-db:
```

### **2. How to login into mongodb through CLI.**

#### **#Note1#** You can only run this command once the node-app-container is deployed.

##### **First** step get service name:
``` 
 docker ps 
```
![docker ps](./img/dockerPs1.png)

##### **Second** step take the service name and run:
``` 
 docker exec -it dockernode-mongo-1 bash 
```

##### **Third** step login using username and password set in _docker-compose.yml_ file.

> _-u_
###### tag for username.
> _-p_
###### tag for password.

``` 
 mongo -u "one_zee" -p "password1" 
```

##### Or do last 2 steps in one line:
``` 
 docker exec -it dockernode-mongo-1 mongo -u "one_zee" -p "password1"
```

### **3. How to Connect to mongodb**

##### ***host*** is _ip address_ of mongo service.

###### mongoose.connect('mongodb://username:password@host:port/database?options...');
```
const mongoose = require('mongoose');

mongoose.connect('mongodb://one_zee:password1@mongo:27017/?authSource=admin',{ useNewUrlParser: true , useUnifiedTopology: true},(err)=>{
    if(!err){
        console.log("connected to mongodb..")
    }else{
        console.log("not connected...");
    }
});
```

#### **3.1. How to get ip address of _mongo service_**

##### **First** step run 'docker ps' to get exact name of your mongo service: ***dockernode-mongo-1***.

##### **Second** step get all details about mongo service. 
```
docker inspect dockernode-mongo-1
```
##### Under Networks you will find ip address _"172.19.0.2"_ of mongo service.
![ip Address](./img/ipAddress.png)

##### Using **DNS** in docker.

###### When one docker container wants to talk to another docker container we can use the name _ex. mongo_ of that container or the name of that service to talk to that container.
###### So if I call **mongo** inside my _node app_ it will automatically grab _ip address_ of our mongo service.
###### DNS is built into docker.
```
mongo = 172.19.0.2
```

#### **4. Docker Network**

#### Lists all networks.
```
docker network ls
```
![networks](./img/network.png)

#### Get all details of specific network.
```
docker network inspect dockernode_default
```