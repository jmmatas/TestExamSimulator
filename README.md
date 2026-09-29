<<<<<<< HEAD
<<<<<<< HEAD
```text

                     M I N S A I T
```

---

# Exam Simulator

Simulador de examen para la certificación **ServiceNow CIS – Discovery Foundation**.

## Características

- Simulación de examen real.
- Modo práctica.
- Persistencia de resultados mediante Local Storage.
- Seguimiento de preguntas falladas.
- Marcado de preguntas para revisión.
- Estadísticas históricas.
- Banco de preguntas actualizable.

## Estructura del proyecto

| Fichero | Descripción |
|----------|-------------|
| `ExamSimulator.html` | Aplicación principal en formato página web |
| `config.js` | Configuración global |
| `storage.js` | Persistencia y estadísticas |
| `questions.js` | Banco de preguntas |
| `metadata.js` | Información adicional sobre las preguntas: explicación y dominio |
| `translations.js` | Etiquetas de los campos en cada idioma disponible |
| `test-runner.html` | Herramienta de testeo de la aplicación |
| `*.xxx.backUp` | Copia de seguridad de ficheros antiguos |
| `validate_questions.py` | Script Python para comprobar que el fichero de respuestas no tiene fallos |
| `ReadMe.md` | Este fichero de información |

## Requisitos

- Navegador moderno.
- No requiere servidor.
- No requiere conexión a Internet.

## Inicio rápido

1. Abrir `ExamSimulator.html`.
2. Seleccionar modo de examen.
3. Configurar número de preguntas.
4. Iniciar prueba.
5. Revisar resultados y estadísticas.

## Almacenamiento

Los datos se almacenan localmente en el navegador mediante `localStorage`.

Se guardan:

- Historial de exámenes.
- Preguntas falladas.
- Preguntas marcadas.
- Estadísticas de aciertos y errores.

## Personalización

### Añadir preguntas

Editar:

```javascript
questions.js
```

### Modificar configuración

Editar:

```javascript
config.js
```

### Cambiar apariencia

Modificar los estilos CSS incluidos en:

```html
ExamSimulator.html
```

## Distribución

La aplicación puede distribuirse simplemente copiando los siguientes archivos:

```text
ExamSimulator.html
config.js
storage.js
questions.js
metadata.js
```

No requiere instalación ni dependencias externas.

## FAQ

### ¿Necesita servidor web?

No.

### ¿Funciona sin Internet?

Sí.

### ¿Dónde se guardan los resultados?

En el navegador del usuario.

### ¿Cómo reiniciar todas las estadísticas?

Borrando los datos almacenados en Local Storage o utilizando la opción de reinicio de la aplicación.


---

Minsait – ServiceNow Practice Tools
=======
=======
>>>>>>> 3c6dc23ca4a63d0c37eba0e710a18406a19ecb42
# Quiz Simulator para ServiceNow

Bienvenido al proyecto del simulador de examen tipo test. Esta aplicación permite cargar un fichero JSON con preguntas, hacer una prueba, marcar preguntas, revisar resultados y practicar por dominio.

La intención es que sea fácil de reutilizar por cualquier compañero de Minsait, incluso sin conocimientos de programación.

---

## 1. Qué es esta app

Es una pequeña aplicación web estática que:

- Carga una batería de preguntas desde un fichero JSON
- Permite practicar por examen o modo revisión
- Guarda el historial en el navegador
- Marca preguntas para repasar
- Muestra estadísticas por dominio y por resultado
- Funciona sin base de datos ni backend

---

## 2. Estructura del proyecto

Los ficheros principales son:

- `index.html` — estructura principal de la interfaz web
- `script.js` — lógica principal, validación, carga y lógica del examen
- `translations.js` — textos de la interfaz
- `metadata.js` — metadatos de preguntas (dominio y explicación)
- `questions.json` — banco de preguntas por defecto
- `launch_quiz.bat` — lanzador fácil para Windows
- `README.md` — guía de uso

---

## 3. Cómo abrir la app sin ejecutar comandos

La forma más sencilla para un compañero que no quiera tocar terminales es esta:

1. Descargar la carpeta del proyecto.
2. Ir a la carpeta.
3. Hacer doble clic en `launch_quiz.bat`.
4. El navegador se abrirá automáticamente en la URL local.
5. Desde allí pulsar "Examinar equipo" y cargar tu fichero JSON.

Esto evita el problema habitual de abrir `index.html` directamente desde el explorador, porque el navegador bloquea `fetch()` por política de CORS cuando se usa `file://`.

---

## 4. Cómo abrir la app si prefieres hacerlo manualmente

Si no quieres usar el `.bat`, puedes abrir una terminal en la carpeta y ejecutar:

```bash
python -m http.server 8000
```

Luego abre en el navegador:

```text
http://localhost:8000/index.html
```

Esto es el método recomendado si quieres una experiencia más limpia y estable.

---

## 5. Formato del fichero JSON de preguntas

La app acepta un array de preguntas o un objeto con `questions`.

Ejemplo mínimo válido:

```json
[
  {
    "num": 1,
    "text": "Pregunta de ejemplo",
    "options": [
      { "letter": "A", "text": "Respuesta A" },
      { "letter": "B", "text": "Respuesta B" },
      { "letter": "C", "text": "Respuesta C" },
      { "letter": "D", "text": "Respuesta D" }
    ],
    "correct": ["B"],
    "multi": false,
    "source": "Mi banco"
  }
]
```

También se acepta este formato:

```json
{
  "questions": [
    {
      "num": 1,
      "text": "Pregunta de ejemplo",
      "options": [
        { "letter": "A", "text": "Respuesta A" },
        { "letter": "B", "text": "Respuesta B" }
      ],
      "correct": ["A"],
      "multi": false,
      "source": "Mi banco"
    }
  ]
}
```

### Recomendaciones de formato

- Cada pregunta debe tener `num`
- Debe tener `text`
- Si es de opción múltiple, usa `multi: true` y `correct` con varios valores
- Si es respuesta única, usa `multi: false` y un array con un único valor
- `source` es opcional pero útil para identificar el origen

---

## 6. Usar la app con un JSON propio

Cada compañero puede:

- preparar su propio JSON
- arrastrarlo o seleccionarlo desde la pantalla inicial
- cargarlo con el botón "Examinar equipo"

La app lo valida para asegurarse de que el contenido tenga el formato esperado.

> Importante: si abres la página desde el sistema de archivos (`file://`), algunos navegadores bloquean la carga del JSON por CORS. Para evitar esto, usa `launch_quiz.bat` o un servidor local.

---

## 7. Qué hace cada parte del código

### `index.html`
Es la vista principal. Aquí se define:

- el menú superior
- la pantalla de inicio
- el cargador de archivos
- las secciones de historial y acerca de
- la estructura visual del quiz

### `script.js`
Aquí está la lógica central:

- carga del JSON
- validación del formato
- generación y renderizado de preguntas
- lógica de aciertos y fallos
- almacenamiento local en `localStorage`
- manejo de preguntas marcadas para repasar

### `metadata.js`
Contiene metadatos adicionales para cada pregunta, por ejemplo:

- dominio
- explicación
- contexto del tema

Esto permite mostrar más información útil al terminar la prueba.

### `translations.js`
Separa el texto visual de la lógica. Así la app puede adaptarse a varios idiomas sin romper el comportamiento.

---

## 8. Almacenamiento local

La app guarda resultados y estado en el navegador mediante `localStorage`.

Se conservan cosas como:

- historial de exámenes
- preguntas falladas
- preguntas marcadas
- estadísticas de rendimiento

Esto significa que cada usuario conserva su progreso en su navegador local.

---

## 9. Solución de problemas comunes

### El navegador dice que el JSON no es válido
Comprueba que:

- el fichero tiene JSON correcto
- no tiene comas extra
- las comillas son dobles
- la estructura coincide con el formato esperado

### La app falla al abrir desde `file://`
No la abras directamente desde la carpeta del sistema. Usa:

- `launch_quiz.bat`, o
- un servidor local con `python -m http.server 8000`

### No se cargan los metadatos
Asegúrate de que `metadata.js` está incluido correctamente en `index.html`.

---

## 10. Recomendación para distribución interna

Para enviar la app entre compañeros de la empresa, lo ideal es:

- empaquetar la carpeta completa
- incluir `launch_quiz.bat`
- incluir una instrucción corta: “doble clic en launch_quiz.bat y luego carga tu JSON”
- mantener la estructura de ficheros tal cual está

Así la app sigue siendo simple, útil y reutilizable para diferentes certificaciones o bancos de preguntas.

---

## 11. Resumen rápido

Si quieres usarla sin complicarte:

1. abre la carpeta del proyecto
2. haz doble clic en `launch_quiz.bat`
3. carga tu JSON desde el botón de archivo
4. ¡empieza a practicar!

---

## 12. Créditos

Proyecto pensado como herramienta práctica para formación y autoestudio en ServiceNow.

<<<<<<< HEAD
Minsait – ServiceNow Practice Tools
>>>>>>> 3603bee (Changes)
=======
Minsait – ServiceNow Practice Tools
>>>>>>> 3c6dc23ca4a63d0c37eba0e710a18406a19ecb42
