# ***Express app Redis and Mongo db.***

## **DOCKER**
### **1. Build image**
###### _t_ --- tag for setting name of Docker image,
###### _node-app-image_ --- name you give for new docker image,
###### _._ --- location of ***Dockerfile*** from current path.

```
 docker build -t node-app-image . 
```

### **2. List all images**
###### _ls_ --- tag for listing (in this case images).,
###### _image_ --- represents docker images

```
 docker image ls  
```

### **3. remove docker image**
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

### **4. Run container**
###### _-v_ --- tag for volumes,
###### _%cd%:/app_ --- _pathToFolderOnLocation:pathToFolderOnContainer_:
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

```
 docker run -v %cd%:/app -d -p 3000:3000 --name node-app-container node-app-image
```

### **5. Show running containers**
###### _ps_ --- shows all running containers,

```
 docker ps
```

### **6. interact with docker containers files**
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


### **7. Stop the container _'forcefully'_**
###### _rm_ --- kil specific container,
###### _node-app-container_ --- container name,
###### _-f_ --- force it to execute the command

```
 docker rm node-app-container -f
 ```