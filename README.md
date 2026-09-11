# NokshaBD

A lightweight REST API for Bangladeshi administrative geography — divisions, districts, upazilas, and unions — with both English and Bengali names.

## Features

- All 8 divisions, 64 districts, 494 upazilas, and 4,540 unions of Bangladesh
- English (`name`) and Bengali (`bn_name`) names for every entry
- In-memory caching of JSON datasets for fast responses
- Type-safe environment variable validation with Zod
- Async error handling middleware
- Written in TypeScript with strict type checking

## Developer Note: Extra Work & Dependency

This project intentionally includes some work and one extra dependency that a codebase this small doesn't strictly need. They were added as a **scaffolding/base for future expansion** — if you plan to grow the project, they will help keep it organized and consistent.

What was added:

- **`http-status-codes` dependency** — used so status codes are readable constants instead of magic numbers.
- **`config/` folder** — a full env-config setup (dotenv + Zod schema) even though there are only two env values (`PORT`, `NODE_ENV`). Without it you could read `process.env` directly, but this validates everything up front.
- **`helper/ApiResponse`** — a unified success/error response formatter. For such a small codebase this is arguably unnecessary, but it keeps every response shape consistent.
- **`modules/` folder** — a route → controller → service layering (plus `helper/` and `middleware/`). Not needed for four endpoints, but it establishes the project structure pattern.
- **In-memory caching layer** in `DataReading` — avoids re-reading JSON files on every request.
- **Zod environment validation** and **strict TypeScript setup** (strict mode, source maps, declarations).

**How to extend:** to add more modules, create a new folder under `src/modules/` following the same `route.ts` → `controller.ts` → `service.ts` pattern, wire the router into `src/app.ts`, and adjust the formatting to match the existing files. The initial phase is done — the rest is up to you.

## Tech Stack

- [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/) 5
- [Zod](https://zod.dev/) for environment variable validation
- [dotenv](https://github.com/motdotla/dotenv) for configuration
- [http-status-codes](https://github.com/pret-a-porter/http-status-codes) for HTTP status helpers
- [tsx](https://tsx.is/) for development hot-reload
- [pnpm](https://pnpm.io/) as the package manager

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- pnpm 9+ (the project pins `pnpm@12.3.4` via `packageManager`)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/NokshaBD.git
cd NokshaBD

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```bash
PORT=3000
NODE_ENV=development
```

| Variable  | Required | Description                        |
| --------- | -------- | ---------------------------------- |
| `PORT`    | Yes      | Port the server listens on         |
| `NODE_ENV`| Yes      | Environment name (e.g. development) |

### Running the Server

```bash
# Development (with hot-reload)
pnpm dev

# Production build
pnpm build

# Run the built server
pnpm start
```

The server will start at `http://localhost:3000`.

## API Endpoints

Base URL: `http://localhost:3000`

### Health Check

```
GET /
```

Response:

```json
{
  "success": true,
  "message": "NokshaBD Server is running and healthy"
}
```

### Get All Divisions

```
GET /divisions
```

### Get Districts of a Division

```
GET /districts/:id
```

`:id` is the division ID.

### Get Upazilas of a District

```
GET /upazilas/:id
```

`:id` is the district ID.

### Get Unions of an Upazila

```
GET /unions/:id
```

`:id` is the upazila ID.

### Response Format

All successful responses return a `200 OK`:

```json
{
  "success": true,
  "message": "data retrived successfully",
  [
    {
      "id": "1",
      "name": "Chattagram",
      "bn_name": "চট্টগ্রাম",
      "url": "www.chittagongdiv.gov.bd"
    }
  ]
}
```

Errors:

| Status | Condition                   | Message                              |
| ------ | --------------------------- | ------------------------------------ |
| `404`  | No data for the given ID    | `Not Found please insert the currect id` |
| `500`  | Internal server error       | `internal server error`              |

> **Note:** An empty array is returned with `200 OK` when a valid parent ID has no children (e.g. a district ID that has no upazilas).

## Project Structure

```
├── src/
│   ├── config/
│   │   ├── env/
│   │   │   ├── env.ts            # Loads and parses environment variables
│   │   │   └── env.validation.ts # Zod schema for env validation
│   │   └── index.ts              # Config exports
│   ├── data/                     # JSON datasets (divisions, districts, upazilas, unions)
│   ├── helpers/
│   │   ├── ApiResponse.ts        # Unified success/error response helpers
│   │   └── DataReading.ts        # JSON reading + in-memory caching + area models
│   ├── middleware/
│   │   └── catchAsync.ts         # Async error handling wrapper
│   ├── modules/
│   │   ├── controller.ts         # Request handlers
│   │   ├── route.ts              # Express route definitions
│   │   └── service.ts            # Business logic layer
│   ├── app.ts                    # Express app setup
│   └── server.ts                 # Server entry point
├── dist/                         # Compiled output (generated by pnpm build)
├── .env                          # Local environment variables (git-ignored)
├── .env.example                  # Example environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── LICENSE
```

## Data

The data is sourced from JSON files in `src/data/` and loaded lazily with in-memory caching. Each dataset model is defined in `src/helpers/DataReading.ts`:

| Entity   | Records | Key Fields                              |
| -------- | ------- | --------------------------------------- |
| Division | 8       | `id`, `name`, `bn_name`, `url`          |
| District | 64      | `id`, `division_id`, `name`, `bn_name`, `lat`, `lon`, `url` |
| Upazila  | 494     | `id`, `district_id`, `name`, `bn_name`, `url` |
| Union    | 4540    | `id`, `upazilla_id`, `name`, `bn_name`, `url` |

## Credits

The geographical data (divisions, districts, upazilas, and unions with Bengali names) is sourced from [techno-stupid/places-in-bangladesh](https://github.com/techno-stupid/places-in-bangladesh). Big thanks to the original authors for collecting and publishing it.

## Scripts

| Command        | Description                              |
| -------------- | ---------------------------------------- |
| `pnpm dev`     | Run the server in development mode with hot-reload |
| `pnpm build`   | Compile TypeScript to `dist/`            |
| `pnpm start`   | Run the compiled server from `dist/`     |

## License

This project is licensed under the [MIT License](LICENSE).