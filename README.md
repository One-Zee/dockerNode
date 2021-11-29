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

```
docker-compose up -d
```

### **3. run the container**

###### _down_ --- stop the cointainer.
###### _-v_ --- delete all volumes connected to the container.

```
docker-compose down -v
```