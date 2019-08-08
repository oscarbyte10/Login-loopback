# Login-loopback
Aplicación backend desarrollada con el framework Loopback 4 para el login de usuarios utilizando la estrategia de autenticación JSON Web Token.
[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

##### 1. Crear el proyecto desde Loopback
Instalar las dependencias desde lb4
```sh
$ lb4 app
```
  - Project name: **login**
  - Project description: **login**
  - App class name: **LoginApplication**
  - Select features to enable in the project: () *Enable docker*

##### 2. Crear el modelo User
Crear el modelo con los atributos que tendrá el usuario.
```sh
$ lb4 model
```
  - Model class name: **user**
  - Enter the property name: **id**
  - Property type: **string**
  - Is **id** the ID property? **Yes**
  - Is it required?: **No**

  - Enter the property name: **email**
  - Property type: **string**
  - Is it required?: **Yes**

  - Enter the property name: **password**
  - Property type: **string**
  - Is it required?: **Yes**

  - Enter the property name: **username**
  - Property type: **string**
  - Is it required?: **Yes**

  - Enter the property name: **firstName**
  - Property type: **string**
  - Is it required?: **Yes**

  - Enter the property name: **lastName**
  - Property type: **string**
  - Is it required?: **Yes**

##### 3. Crear la database
Crear la fuente de la base de datos de MongoDB
```sh
$ lb4 datasource
```
  - Datasource name: **db**
  - Select the connector for db: **MongoDB**
  - host: **localhost**
  - port: **27017**
  - user:
  - password:
  - database: **users**
  - Feature supported by MongoDB v3.1.0 and above: **Yes**

##### 4. Crear el repositorio
Crear el repositorio del modelo user utilizando la base de datos
que se ha creado en el paso anterior
```sh
$ lb4 repository
```
  - Please select the datasource **DbDatasource**
  - Select the model(s) you want to generate a repository **User**
  - Please select the repository base class **DefaultCrudRepository** (Legacy juggler bridge)

##### 5. Crear el controlador
Crear el controlador para la base de las operaciones CRUD
```sh
$ lb4 controller
```
  - Controller class name: **user**
  - What kind of controller would you like to generate? **REST Controller with CRUD functions**
  - What is the name of your CRUD repository? **UserRepository**
  - What is the name of ID property? **id**
  - What is the type of your ID? **string**
  - What is the base HTTP path name of the CRUD operations? **/users**
