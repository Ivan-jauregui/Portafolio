# Portfolio y Gestión de Proyectos - Iván Denzel Jauregui

Plataforma web moderna porfolio y panel de administración, desarrollada con **Angular** y conectada a una API REST simulada con `json-server`.

---

## Información del Desarrollador y Stack
* **Autor:** Iván Denzel Jauregui
* **Versión de Angular:** `19.2.25`

---

## Instrucciones para Instalar las Dependencias

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd <nombre-de-carpeta>

Instalar dependencias:

```bash
npm install --legacy-peer-deps
```

## 🚀 Instrucciones para Ejecutar la Aplicación

Para que la aplicación funcione correctamente y se comunique con la base de datos simulada, debes ejecutar dos servicios en terminales independientes:

### 1. Ejecutar json-server (Backend simulado)
Abre una terminal y ejecuta el servidor local de datos (asegúrate de tener tu archivo `db.json` configurado):

```bash
npx json-server --watch db.json --port 3000
```

### 2. Ejecutar la aplicación de Angular
Abre una segunda terminal y levanta el servidor de desarrollo:

```bash
npm start
```

*(O también puedes utilizar `ng serve`)*. Una vez compilado, abre tu navegador e ingresa a http://localhost:4200/.


## 🔐 Panel de Administración

Estas rutas están destinadas a la gestión interna de la aplicación, permitiendo la creación, actualización y visualización de proyectos, experiencia laboral y solicitudes de trabajo recibidas.

### 📁 Gestión de Proyectos y Experiencia
* **Crear Proyecto:** `/admin/form/project`  
  Renderiza el formulario limpio para dar de alta un nuevo proyecto en el portafolio.
* **Editar Proyecto:** `/admin/form/project/:id`  
  Carga el formulario con los datos del proyecto correspondiente al `:id` para su actualización.
* **Crear Experiencia:** `/admin/form/experience`  
  Formulario dedicado a añadir un nuevo registro de experiencia laboral.
* **Editar Experiencia:** `/admin/form/experience/:id`  
  Permite modificar un registro de experiencia existente mediante su `:id`.

### 📧 Gestión de Solicitudes (Requests)
Estas rutas administran las interacciones recibidas a través de la plataforma, funcionando como un buzón para aplicar a ofertas o enviar solicitudes de trabajo:
* **Lista de Solicitudes:** `/admin/projects/request`  
  Muestra una bandeja de entrada con el listado completo de todas las solicitudes de trabajo recibidas.
* **Detalle de Solicitud:** `/admin/projects/request/detail/:id`  
  Permite visualizar de forma detallada la información, mensajes y archivos adjuntos de una solicitud específica filtrada por su `:id`.


