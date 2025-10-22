#  API REST de Gestión de Facturas (Maestro–Detalle)

Esta es una **API REST** desarrollada con **Node.js**, **Express** y **PostgreSQL**, que permite **gestionar facturas con sus detalles de productos** (estructura maestro–detalle).  
El sistema realiza un **CRUD completo** e incluye características adicionales como:

- Cálculo automático del total de la factura.
- Manejo de errores con códigos HTTP adecuados.
- Control de versiones con **Git**.
- (Opcional) Autenticación mediante **JWT**.

---

##  Descripción del Proyecto

La API gestiona dos entidades principales:

- **Factura (maestro)** → contiene la información general (cliente, fecha, total).  
- **Detalle de Factura (detalle)** → lista de productos asociados a la factura, con cantidad, precio unitario y subtotal.

Cada factura puede tener **uno o varios detalles**, y el total se calcula automáticamente al momento de crear o actualizar una factura.

---

##  Tecnologías y Librerías Utilizadas

| Librería / Tecnología | Descripción |
|------------------------|-------------|
| **Node.js** | Entorno de ejecución de JavaScript. |
| **Express** | Framework minimalista para crear la API REST. |
| **Sequelize** | ORM para manejar la base de datos PostgreSQL. |
| **pg** | Driver oficial de PostgreSQL para Node.js. |
| **dotenv** | Manejo de variables de entorno. |
| **jsonwebtoken (JWT)** | Autenticación por tokens (opcional). |
| **nodemon** | Reinicio automático del servidor en desarrollo. |

---

## Estructura de la Base de Datos

### Tabla `factura`
| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Identificador único |
| cliente | VARCHAR(100) | Nombre del cliente |
| fecha | TIMESTAMP | Fecha de emisión |
| total | NUMERIC(12,2) | Total calculado automáticamente |

### Tabla `detalle_factura`
| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Identificador único |
| factura_id | INTEGER (FK) | Referencia a la factura |
| producto | VARCHAR(100) | Nombre del producto |
| cantidad | INTEGER | Cantidad del producto |
| precio_unitario | NUMERIC(12,2) | Precio por unidad |
| subtotal | NUMERIC(12,2) | Calculado automáticamente (cantidad * precio_unitario) |

---

## Pasos de Instalación

### Clonar el Repositorio
```bash
git clone https://github.com/tu_usuario/facturas-api.git
cd facturas-api
