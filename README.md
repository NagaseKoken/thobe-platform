# Thobe Platform

An e-commerce platform specializing in traditional Saudi thobes, connecting customers with skilled tailors and stores.

## Team Members

| Name | GitHub |
|------|--------|
| Ali AlBugeaey | @aliob04 |
| Mohammed Al Naser | @NagaseKoken |
| Moammal Almahfoudh | @MuammalZH |
| Reda Alali | @RedaAlali |
| Husian Al Muallim | N/A |
| Abdulrhman Al faleh | N/A |

## Project Overview

Thobe Platform revolutionizes the traditional thobe purchasing experience by providing a digital marketplace that connects customers with skilled tailors and stores across Saudi Arabia.

### Key Features
- Custom thobe ordering with precise measurements
- Real-time tailor-customer communication
- Comprehensive store management system
- Advanced order tracking
- Digital measurement management

## Tech Stack

- **Frontend**: 
  - Next.js 14.x
  - React 18.x
  - TailwindCSS 3.x
- **Backend**:
  - Node.js 18.x
  - Express 4.x
  - MongoDB 6.x
- **Authentication**: 
  - NextAuth.js
- **UI Components**: 
  - Radix UI
  - Shadcn/ui
- **State Management**:
  - React Query
  - Zustand
- **Development Tools**:
  - TypeScript 5.x
  - ESLint
  - Prettier

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- MongoDB 6.x
- Git

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/thobe-platform.git
cd thobe-platform
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration:
```
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Install dependencies:
```bash
npm install
```

4. Run database migrations:
```bash
npm run migrate
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
thobe-platform/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── worker/            # Worker/Tailor dashboard
│   ├── home/              # Customer-facing pages
│   └── cart/              # Shopping cart
├── components/            # Reusable components
├── lib/                  # Utility functions
├── hooks/               # Custom React hooks
├── types/               # TypeScript definitions
├── prisma/              # Database schema
└── public/              # Static assets
```

## API Documentation

API documentation is available at `/api/docs` when running the development server. It includes:
- Authentication endpoints
- Order management
- User management
- Product catalog
- Measurement system

## Testing

Run the test suite:
```bash
npm run test              # Run all tests
npm run test:unit        # Run unit tests
npm run test:e2e         # Run end-to-end tests
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

### Code Style Guide
- Use TypeScript for all new code
- Follow the existing code formatting rules
- Write meaningful commit messages
- Add tests for new features

## Deployment

Deployment instructions for different environments:

### Production
```bash
npm run build
npm run start
```

### Docker
```bash
docker-compose up -d
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support

For support, please:
1. Check the [FAQ](docs/FAQ.md)
2. Open an issue
3. Contact the development team

## Acknowledgments

- KFUPM Software Engineering Department
- Our mentors and advisors
- All contributors to this project