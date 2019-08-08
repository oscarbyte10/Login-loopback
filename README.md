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

##### 6. Instalamos el módulo authentication
```sh
$ npm i --s @loopback/authentication
```
##### 7. Añadimos el módulo a la aplicación
En el archivo **src/application.ts**

Importamos el componente Authentication:
```
import { AuthenticationComponent } from '@loopback/authentication';
```
Y dentro del constructor lo añadimos:
```
this.component(AuthenticationComponent);
```

##### 8. Añadimos la acción de authenticate a la secuencia de la aplicación
En **src/sequence.ts** añadimos al constructor:
```
@inject(AuthenticationBindings.AUTH_ACTION) protected authenticateRequest: AuthenticateFn
```
Y después llamamos a la acción de authentication y lanzamos error en caso de que existas

```
async handle(context: RequestContext) {
  try {
    const { request, response } = context;
    const route = this.findRoute(request);

    //call authentication action
    await this.authenticateRequest(request);

    //Authentication successfull, proceed to invoke controller
    const args = await this.parseParams(request, route);
    const result = await this.invoke(route, args);
    this.send(response, result);
  } catch (err) {
    if (
      err.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
      err.code === USER_PROFILE_NOT_FOUND
    ) {
      Object.assign(err, { statusCode: 401 });
      }
    this.reject(context, err);
    return;
  }
}
```
##### 8. Creamos la estrategia de autenticación
Primero, instalamos el módulo bcryptjs
```
$ npm i --s bcryptjs
$ npm i --s @types/bcryptjs
```

Después, instalamos el módulo jsonwebtoken
```
$ npm i --s jsonwebtoken
```

Después, copiaremos el archivo **keys.ts** que se encuentra en **/src**

Cosas a destacar de este archivo son las constantes:
  - *TOKEN_SECRET_VALUE*: valor que va introducido dentro del token
  - *TOKEN_EXPIRES*: valor en tiempo hasta que el token deje de ser válido

A continuación, en el repositorio user **/src/repositories/user.repository.ts** añade el siguiente objeto fuera de la clase:
```
export type Credentials = {
 email: string;
 password: string;
};
```
Una vez creadas las keys, necesitaremos un hasher que utilice un algoritmo que convierta el texto plano y lo introduzca como hash en la base de datos.
Para ello, crearemos el directorio **/src/services** y dentro copiaremos el archivo **hash.password.bcryptjs.ts** que se encuentra en este mismo repositorio.

Ahora pasaremos a definir la estrategia de autenticación, que en este caso hemos elegido JWT.
Crearemos la carpeta **/src/authentication-strategies/** y dentro de ella copiaremos el archivo **/jwt-strategy.ts**

Y para acabar, solo nos queda registrar la estrategia de autenticación en el constructor de **/src/application.ts**:
```
registerAuthenticationStrategy(this, JWTAuthenticationStrategy);
};
```
