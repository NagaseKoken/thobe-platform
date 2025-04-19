# 🌟 **Thobe Platform** 🌟

Welcome to **Thobe Platform**, an innovative e-commerce marketplace that connects customers with skilled tailors and stores across Saudi Arabia. Experience the art of traditional Saudi thobes in a modern, digital way.

---

## 👥 **Team Members**

| Name                  | GitHub         |
|-----------------------|----------------|
| **Ali AlBugeaey**     | [@aliob04](https://github.com/aliob04) |
| **Mohammed Al Naser** | [@NagaseKoken](https://github.com/NagaseKoken) |
| **Moammal Almahfoudh**| [@MuammalZH](https://github.com/MuammalZH) |
| **Reda Alali**        | [@RedaAlali](https://github.com/RedaAlali) |
| **Husian Al Muallim** | [@HusainAlMuallim](https://github.com/HusainAlMuallim) |
| **Abdulrhman Al faleh** | N/A          |

---

## 🌍 **Project Overview**

The **Thobe Platform** revolutionizes the traditional thobe purchasing experience by offering:

- 🧵 **Custom thobe ordering** with precise measurements
- 💬 **Real-time communication** between tailors and customers
- 🏬 **Comprehensive store management** for vendors
- 🚚 **Advanced order tracking** for seamless delivery
- 📏 **Digital measurement management** for accuracy

---

## 🛠️ **Tech Stack**

### **Frontend**
- ⚡ **Next.js** 14.x
- ⚛️ **React** 18.x
- 🎨 **TailwindCSS** 3.x

### **Backend**
- 🟢 **Node.js** 18.x
- 🚀 **Express** 4.x


### **Additional Tools**
- 🖌️ **UI Components**: Radix UI, Shadcn/ui
- 🔄 **State Management**: React Query, Zustand
- 🛠️ **Development Tools**: TypeScript 5.x, ESLint, Prettier

---

## ✅ **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git**

---

## 🚀 **Getting Started**

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/thobe-platform.git
   cd thobe-platform
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```
   MONGODB_URI=your_mongodb_uri
   NEXTAUTH_SECRET=your_secret
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run database migrations**:
   ```bash
   npm run migrate
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open the app**:
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 **Project Structure**

Here’s a detailed breakdown of the project structure:

```
thobe-platform/
├── app/                    # Next.js app directory
│   ├── admin/              # Admin dashboard pages
│   │   ├── dashboard/      # Admin dashboard overview
│   │   ├── orders/         # Manage orders
│   │   ├── stores/         # Manage stores
│   │   └── requests/       # Handle admin requests
│   ├── worker/             # Worker/Tailor dashboard
│   │   ├── orders/         # Manage worker orders
│   │   ├── fabrics-products/ # Manage fabrics and products
│   │   └── profile/        # Worker profile management
│   ├── home/               # Customer-facing pages
│   │   ├── stores/         # Store listings
│   │   └── [storeId]/      # Individual store details
│   └── cart/               # Shopping cart functionality
├── components/             # Reusable UI components
│   ├── admin/              # Admin-specific components
│   ├── reusable/           # Shared components (e.g., Navbar, Footer)
│   ├── ui/                 # UI primitives (e.g., buttons, modals)
├── lib/                    # Utility functions and helpers
│   └── generated/          # Auto-generated files (e.g., Prisma client)
├── hooks/                  # Custom React hooks
├── prisma/                 # Prisma schema and database configuration
│   └── schema.prisma       # Database schema definition
├── public/                 # Static assets (e.g., images, fonts)
├── styles/                 # Global styles and Tailwind configuration
│   └── globals.css         # Tailwind CSS setup
├── types/                  # TypeScript type definitions
├── .env.example            # Example environment variables
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

---

## 📖 **API Documentation**

API documentation is available at `/api/docs` when running the development server. It includes:

- 🔑 Authentication endpoints
- 📦 Order management
- 👤 User management
- 🛍️ Product catalog
- 📏 Measurement system

---

## 🧪 **Testing**

Run the test suite to ensure everything works as expected:

- **Run all tests**:
  ```bash
  npm run test
  ```

- **Run unit tests**:
  ```bash
  npm run test:unit
  ```

- **Run end-to-end tests**:
  ```bash
  npm run test:e2e
  ```

---

## 🤝 **Contributing**

We welcome contributions! Follow these steps to contribute:

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a pull request**

---

🎉 **Thank you for being part of the Thobe Platform journey!**
