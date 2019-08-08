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
