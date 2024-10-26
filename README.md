# **WorldSearch App**

## 📖 Descripción

WorldSearch es una aplicación de exploración interactiva de países donde los usuarios pueden buscar países, visualizar información detallada, y explorar imágenes relacionadas. Utiliza Vue 3, Quasar Framework, y APIs de Pexels y FlagsAPI para obtener datos e imágenes.

Puedes acceder a la aplicación desplegada en la siguiente URL: [https://fractalup-frontend-test.vercel.app/](https://fractalup-frontend-test.vercel.app/)

## 🚀 Características

- **Búsqueda de países**: Filtrado por nombre y continente.
- **Visualización de imágenes**: Utilizando la API de Pexels.
- **Banderas de países**: Integración con FlagsAPI.
- **Drawer derecho**: Mostrar detalles de cada país al hacer clic.
- **Diseño responsivo**: Adaptado para desktop y dispositivos móviles.

## 📋 **Requisitos**

- **Node.js** (versión 20.14.8+)
- **Vue 3**
- **Quasar Framework**
- **Axios** (para peticiones HTTP)
- **API Key** de [Pexels](https://www.pexels.com/api/)

### ⚙️ **Instalación**

1. Clona este repositorio:

   ```bash
   git clone https://github.com/Pieromental/fractalup_frontend_test.git
   ```

2. Navega a la carpeta del Proyecto:

   ```bash
   cd fractalup_frontend_test
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

## 🚀 **Uso**

Asegúrate de tener el entorno configurado y luego ejecuta:

```bash
quasar dev
```

Esto iniciará la aplicación en modo desarrollo.

## 🖰 **Tecnologías Utilizadas**

- Vue 3
- Quasar Framework
- Axios
- TypeScript
- GraphQL
- Apollo

## 📂 **Estructura del Proyecto**

```plaintext
fractalup_frontend_test/
├── public
│   ├── icons
│   └── favicon.ico
├── src
│   ├── apollo
│   │   └── queries
│   ├── assets
│   │   ├── continents
│   │   ├── fractal-world-logo.css
│   │   ├── fractal-world-logo.svg
│   │   ├── noCountryImage.jpg
│   │   └── quasar-logo-vertical.svg
│   ├── boot
│   │   └── apollo.ts
│   ├── components
│   │   ├── CountriesGridComponent.vue
│   │   ├── DrawerCountryComponent.vue
│   │   ├── EssentialLink.vue
│   │   └── SearchBarComponent.vue
│   ├── composables
│   │   ├── usePexels.ts
│   │   └── useTrevorBlades.ts
│   ├── css
│   │   ├── app.scss
│   │   └── quasar.variables.scss
│   ├── interface
│   │   ├── Pexels.ts
│   │   └── TrevorBlades.ts
│   ├── layouts
│   │   └── MainLayout.vue
│   ├── pages
│   │   ├── ErrorNotFound.vue
│   │   ├── HomePage.vue
│   │   ├── ViewPage.vue
│   │   └── View2Page.vue
│   ├── router
│   │   ├── index.ts
│   │   └── routes.ts
│   ├── App.vue
│   └── main.ts
├── .env
├── quasar.conf.js
├── package.json
└── ...otros archivos importantes
```

## 🤝 **Contribución**

Si deseas contribuir, por favor sigue los siguientes pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/NuevaFuncionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Envía tu rama (`git push origin feature/NuevaFuncionalidad`).
5. Abre un Pull Request.

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT.

## 🌐 **Mis Redes Sociales**

- [GitHub](https://github.com/Pieromental)
- [LinkedIn](https://www.linkedin.com/in/pierosalazarpro/)
