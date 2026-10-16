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

