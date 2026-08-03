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
