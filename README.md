# 🏦 CLI de Procesamiento de Transacciones Bancarias

## 📌 Introducción

Este proyecto es una aplicación de línea de comandos (CLI) escrita en TypeScript que procesa un archivo CSV con transacciones bancarias. Su propósito es analizar datos financieros simples para generar un reporte con información útil como el balance final, la transacción de mayor monto y el conteo de transacciones por tipo.

---

## 🚀 Instrucciones de Ejecución

### 1. Clona el repositorio:

```bash
git clone https://github.com/kedeinroga/bank-cli.git
cd bank-cli
```

### 2.  Instala las dependencias:

```bash
npm install
```

### 3. Asegúrate de tener un archivo CSV con el siguiente formato:

```
   id,tipo,monto
   1,Crédito,100.00
   2,Débito,50.00
   3,Crédito,200.00
   4,Débito,75.00
   5,Crédito,150.00
   ```

Guárdalo como `data.csv` en la raíz del proyecto (o ajusta la ruta en el script de `package.json`).

### 4. Ejecuta la aplicación:

```bash
npm start
```

## 🧠 Enfoque y Solución

### 🔍 Lógica Implementada
- ***Lectura del CSV:*** Se utiliza fs.readFileSync para leer el archivo y convertir cada línea en una instancia de Transaction; Si el archivo es muy grande, se puede usar un parser por streams como `csv-parser`.

- ***Modelo de Datos:*** Una interfaz Transaction representa cada transacción, con sus propiedades tipadas; no es una clase, esto ahorar tiempo creación de instancias.

- ***Servicios de Negocio:*** Se encapsulan las reglas de negocio como el cálculo de balance, identificación del mayor monto y conteo por tipo dentro de TransactionService.

- ***Principios Aplicados:***

  - ***DRY:*** La lógica se evita repetir gracias a funciones reutilizables.

  - ***SRP (Single Responsibility Principle):*** Cada clase tiene una única responsabilidad.

  - ***Clean Code:*** Código legible, comentado y modular.


## 🗂️ Estructura del Proyecto

```bash
interbank-academy-25/
├── src/
│   ├── cli.ts                        # Punto de entrada de la aplicación
│   ├── models/
│   │   └── transaction.ts            # Modelo de transacción bancaria
│   ├── services/
│   │   └── transaction-service.ts    # Lógica de procesamiento de transacciones
│   ├── utils/
│   │   └── csv-parser.ts             # Función utilitaria para parsear el CSV
├── data.csv                          # Archivo de entrada de ejemplo
├── .gitignore                        # Archivos a ignorar por git
├── package.json                      # Dependencias y scripts del proyecto
├── tsconfig.json                     # Configuración de TypeScript
└── README.md                         # Documentación del proyecto
```

