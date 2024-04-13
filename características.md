#### Cards:

- Utilizacion de grid y flex para representar las cards
  de los productos.

## Funciones

##### AddProduct()

- Identificamos el elemento HTML que representa
  el botón "agregar" por medio de querySelectoAll().

```JavaScript

elementList = parentNode.querySelectorAll(selectors);

```

- Imprimimos la variable por consola para ver que nos devuelve.

- Controlamos su reaacion por medio de el evento click.

- Para que el evento esté disponible en todos los botones recorremos el nodeList devuelto por
  documentQuerySelectorAll() por medio de un forEach() y asignamos un eventListener a cada boton.

- Verificamos en que boton punutal se hace el click por medio de
  e.target y si ese boton es el mismo que me llego por parametro.

- Si es el mismo lo imprimimos, generamos adicionalmente dos variables
  mas una para guardar la card que sera el resultado de busacar al ancestro
  mas cercano que coincida con las clases de mis cards.

- Si hay card asignamos el textContent/innerText de esa card como la card
- completa del producto.
