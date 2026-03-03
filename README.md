# Playone

A real-time web application built with WebSocket, Express, Node.js, Drizzle ORM, PostgreSQL, and Zod for schema validation.

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **WebSocket** - Real-time bidirectional communication
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **Zod** - Schema validation and type safety

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Playone
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/playone
PORT=8000
NODE_ENV=development
```

4. Set up the database:
```bash
# Run database migrations
npm run db:migrate

# (Optional) Seed the database
npm run db:seed
```

## Usage

### Development Mode
Start the development server with hot-reload:
```bash
npm run dev
```

### Production Mode
Start the production server:
```bash
npm start
```

The server will start on `http://localhost:8000` (or the PORT specified in your .env file).

## Project Structure

```
Playone/
├── src/
│   ├── server.js          # Main application entry point
│   ├── config/            # Configuration files
│   ├── db/                # Database schemas and migrations
│   ├── routes/            # API route handlers
│   ├── controllers/       # Business logic
│   ├── models/            # Drizzle ORM models
│   ├── validators/        # Zod validation schemas
│   ├── websocket/         # WebSocket handlers
│   └── utils/             # Helper functions
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## API Endpoints

### REST API
- `GET /` - Health check endpoint
- Add your endpoints here as you build them

### WebSocket Events
- Document your WebSocket events here

## Database Schema

Using Drizzle ORM with PostgreSQL. Database schemas are defined in `src/db/schema/`.

Example migration command:
```bash
npm run db:migrate
```

## Validation

Zod is used for runtime type checking and validation. Validation schemas are located in `src/validators/`.

Example usage:
```javascript
import { z } from 'zod';

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `PORT` | Server port number | No (default: 8000) |
| `NODE_ENV` | Environment mode (development/production) | No |

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature-name`
4. Submit a pull request

## License

ISC

## Author

Your Name

---

**Status**: 🚧 Under Development
