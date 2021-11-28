# ***Express app Redis and Mongo db.***

## **How to create node app with docker**

### **1. setting up Dockerfile**
- **1 step** -> _FROM_ = what image to pull / _node:15_ = name of the image and its version. 
- **2 step** -> _WORKDIR_ = set up you directory / _/app_ = your working directory inside docker container.
- **3 step** -> _COPY_ = copy the following from /  _package.json_ = what to copy / _._ = where to copy.
- **4 step** -> _RUN_ = run the following  / _npm install_ = a command docker should run to install dependencies for project.
- **5 step** -> _COPY_ = copy the following from / _._ = copy all the files and folders from your curent directory / _./_ = to docker working _/app_ directory.
- **6 step** -> _EXPOSE_ = exposing port / _3000_ = port number.
- **7 step** -> _CMD_ = what command  to run / _["npm","run","dev"]_ = development script using nodemon.

#### **Exemple of _Dockerfile_**
```
FROM node:15

WORKDIR /app

COPY package.json .

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm","run","dev"]
```



### **2. Build image from Dockerfile**
###### _t_ --- tag for setting name of Docker image,
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
###### _--mount_ --- tag for docker mount:
###### _-v_ --- tag for docker volume or mount:

#### **Docker Volumes** allows us to have ***persistant*** data.
#### In this case we used specific type of volume :
> ***[bindMount](https://docs.docker.com/storage/bind-mounts/)***
###### **bind mount** allows us to sync a folder in our _local host machine_, to a folder in our _Docker container_.
#### In combination with devDependencies
> ***[nodemon](https://www.npmjs.com/package/nodemon)*** 
###### We can take all files inside our directory and sync them into the _'/app'_ directory of our container ,so that we dont have to continiously rebuild our image and redeploy container every time we make changes to our code or files.It will automatically _sync_ those two for us , to really speed up developmnent proccess.
```
 docker run -v %cd%:/app -d -p 3000:3000 --name node-app-container node-app-image
```
#### ***or***
```
 docker run --mount %cd%:/app -d -p 3000:3000 --name node-app-container node-app-image
```



### **6. Show running containers**
###### _ps_ --- shows all running containers,

```
 docker ps
```



### **7. Interact with docker container files**
###### _it_ --- tag for interactive mode,
###### _exec_ --- exucute following,
###### _node-app-container_ --- represents docker image nameTag,
###### _bash_ --- command to access our docker container files

### **#Note#** You can only run this command inside running container.

``` 
 docker exec -it node-app-container bash 
```

#### Basic git bash commands:
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



### **8. Stop the container _'forcefully'_**
###### _rm_ --- kil specific container,
###### _node-app-container_ --- container name,
###### _-f_ --- force it to execute the command

```
 docker rm node-app-container -f
```