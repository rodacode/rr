# Pokemon App por Nicolas Hardmeier

Creada con [Create React App](https://github.com/facebook/create-react-app).
El test menciona ordenar los pokemons alfabeticamente, por lo que he investigado en la documentación de la API no cuenta con un parametro para ordenar alfabeticamente y es nua API paginada por lo que estoy ordenando alfabeticamente cada página.
Se podría hacer un fetch de todos los pokemones y luego ordenarlos pero no estaba seguro de si era lo requerido y sería unu poco sobre ingenieria si no es lo buscado (Toco hacer la prueba un fin de semana por lo que no pregunte esta duda para poder entregarla el lunes como se me pidio).
Los estilos claramente podrían mejorarse más.


### Instalar dependencias

Ejecutar
 ```bash
npm i
```

### Entorno de desarrollo

Ejecutar
 ```bash
npm start
```

Se ejjecuta la aplicación en el entorno de desarrollo.\
Abrir en el navegador [http://localhost:3000](http://localhost:3000).

### Test

Ejecutar
 ```bash
npm run test
```
### Modo prodcción

Ejecutar
 ```bash
npm run build
```

Por hacer:

[ ] Mejorar estilos.
[ ] Agregar más unit tests de casos en concreto, si no  hay pokemones, si no tiene moves o abilities.
[ ] Agregar React Query para cachear respuestas.