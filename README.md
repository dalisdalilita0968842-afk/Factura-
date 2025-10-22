#  API REST de Facturación (Maestro–Detalle)

Este proyecto implementa una **API REST** para gestionar **facturas y sus detalles de productos** utilizando una estructura **maestro–detalle**, desarrollada con **Node.js**, **Express** y **PostgreSQL**.  
Permite realizar un **CRUD completo**, calcular automáticamente el total de la factura, y cuenta con autenticación opcional mediante **JWT**.

---

##  Características principales

- **CRUD completo** para facturas (`factura`) y sus detalles (`detalle_factura`).
- **Relación maestro–detalle** correctamente implementada con Sequelize.
- **Cálculo automático del total** de la factura.
- **Autenticación opcional JWT** (puedes activarla con una variable de entorno).
- **Manejo de errores** con códigos HTTP adecuados (400, 404, 500, etc.).
- **Control de versiones con Git**.

---

##  Requerimientos técnicos

- Node.js v18 o superior  
- PostgreSQL  
- npm (incluido con Node.js)

---

## Librerías utilizadas

| Librería | Descripción |
|-----------|--------------|
| **express** | Framework para crear el servidor y los endpoints REST. |
| **sequelize** | ORM para interactuar con la base de datos PostgreSQL. |
| **pg** | Controlador para PostgreSQL. |
| **dotenv** | Permite usar variables de entorno desde el archivo `.env`. |
| **jsonwebtoken** | Implementa autenticación basada en tokens JWT. |
| **bcrypt** | Encriptación opcional de contraseñas (si se extiende la API). |
| **nodemon** | Herramienta de desarrollo para reinicio automático. |

---

## Instalación y configuración

### Clonar el repositorio
```bash
git clone https://github.com/tu_usuario/facturas-api.git
cd facturas-api
