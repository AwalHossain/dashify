# Dashify - Modern React Admin Dashboard

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Query](https://img.shields.io/badge/React_Query-4.x-FF4154?logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

## 🚀 [Live Demo](https://dashify-gamma.vercel.app/)

Check out the fully functional application deployed on Vercel.

## 📋 Assessment Requirements - Completed ✓

### 1. Authentication System ✓
- ✅ JWT-based authentication with access and refresh tokens
- ✅ Secure token storage in localStorage
- ✅ Complete login form with email/username and password fields
- ✅ Axios interceptors for token handling and auto-refresh
- ✅ Clean logout flow with token clearing and redirection

### 2. Table View with API Data ✓
- ✅ Clean, reusable table component built with Tailwind CSS
- ✅ API data fetching with proper loading states
- ✅ Pagination with 10/20/30 records per page options
- ✅ Records per page selector dropdown
- ✅ Next/Previous page navigation controls
- ✅ API query parameters for pagination (limit & offset)

### 3. Search Functionality ✓
- ✅ Search input with clean design
- ✅ Debounced API calls on input change
- ✅ Search parameter handling in API requests
- ✅ Real-time results updating
- ✅ Loading states during search operations

### 4. Delete Functionality ✓
- ✅ Delete button for each table row
- ✅ Confirmation modal before deletion
- ✅ DELETE request to API with item ID
- ✅ UI update after successful deletion

### 5. Styling with Tailwind CSS ✓
- ✅ Modern, clean UI using Tailwind utility classes
- ✅ Fully responsive design for all device sizes
- ✅ Styled table rows and headers
- ✅ Attractive pagination controls
- ✅ Professional inputs and buttons
- ✅ Dark/Light theme toggle

### 6. Code Quality & Structure ✓
- ✅ Full TypeScript implementation with interfaces
- ✅ Modular, reusable components
- ✅ Separate API service layer with Axios
- ✅ React Query for efficient data fetching and caching
- ✅ Clean project structure and architecture

## 🌟 Additional Features Implemented


- ✅ **Create Products:** Form-based product creation with validation
- ✅ **Update Products:** Edit existing product information

- ✅ **Client-side Sorting:** Sort data by any column (asc/desc)
- ✅ **Custom Sortable Column Headers:** Interactive sort indicators
- ✅ **Optimistic UI Updates:** Immediate UI feedback before API response

### User Experience Improvements
- ✅ **Form Validation:** Comprehensive input validation
- ✅ **Error Handling:** User-friendly error messages
- ✅ **Loading States:** Visual feedback during async operations
- ✅ **Animations:** Smooth transitions between states
- ✅ **Toast Notifications:** Success/error notifications

### Performance Optimizations
- ✅ **Efficient React Query Caching:** Minimize API calls
- ✅ **Memoized Components:** Prevent unnecessary re-renders
- ✅ **Debounced Search:** Reduce API calls while typing

### Architecture Enhancements
- ✅ **Custom Hooks:** Reusable logic across components
- ✅ **Context API:** Global state management
- ✅ **Feature-based Folder Structure:** Scalable organization
- ✅ **Type Safety:** Comprehensive TypeScript coverage

## 🌟 Overview

Dashify is a modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS. It provides a robust foundation for building data-driven web applications with features like authentication, data tables, search, filtering, and CRUD operations.

## ✨ Features

### 🔐 Authentication System
- JWT-based authentication with access and refresh tokens
- Secure token storage in localStorage
- Auto-refresh of expired tokens via Axios interceptors
- Protected routes for authenticated users only
- Clean login/logout flow

### 📊 Data Management
- Responsive data tables with dynamic columns
- Pagination controls (10/20/30 items per page)
- Real-time search with debounced API calls
- Client-side sorting (ascending/descending) for all columns
- Delete operations with confirmation modals

###  UI/UX Features
- Responsive design for all device sizes
- Dark/Light theme toggle with system preference detection
- Clean, modern UI built with Tailwind CSS
- Interactive components (modals, dropdowns, tooltips)
- Loading states and error handling
- Form validation

###  Architecture Highlights
- Modular code organization
- React Query for efficient data fetching and caching
- TypeScript for type safety
- Custom reusable hooks
- Context API for global state management
- Axios for API communication with interceptors

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/dashify.git
cd dashify
```

2. Install dependencies
   ```bash
   npm install
   # or
yarn
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your API configuration
```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Build for production
```bash
npm run build
# or
yarn build
```

## 🔧 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── common/       # Common components used across the app
│   ├── forms/        # Form-related components
│   ├── products/     # Product-specific components
│   └── ui/           # Base UI components (buttons, inputs, etc.)
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── interface/        # TypeScript interfaces and types
├── layout/           # Layout components
├── pages/            # Page components
├── services/         # API services and data fetching logic
│   ├── auth/         # Authentication services
│   ├── core/         # Core API functionality
│   └── products/     # Product-related services
└── utils/            # Utility functions
```

## 💼 Feature Implementation Details

### Authentication Flow

```tsx
// Example login flow
const loginMutation = useLoginMutation();

const handleLogin = async (credentials) => {
  try {
    await loginMutation.mutateAsync(credentials);
    // Tokens automatically stored via the mutation
    navigate('/dashboard');
  } catch (error) {
    // Error handling
  }
};
```

### API Request Management

We've implemented a robust API management system with:

- Centralized API client configuration
- Automatic token refresh
- Request/response interceptors
- Error handling middleware
- TypeScript interfaces for all API responses

```tsx
// Example API client setup
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token interceptor
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Data Fetching with React Query

React Query provides optimized data fetching with automatic caching, background updates, and more:

```tsx
// Example query hook
export const useProductsQuery = (params: ProductQueryParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    keepPreviousData: true,
  });
};
```

### Modular Component Design

Components are designed to be reusable and composable:

```tsx
// Example Table component usage
<DataTable
  columns={productColumns}
  onSearch={handleSearch}
  onDelete={handleDelete}
  onPageChange={handlePageChange}
/>
```

## 🌙 Dark Mode Implementation

The application features a robust dark mode implementation:

- System preference detection
- Manual toggle option
- Persistent preference (saved to localStorage)
- Smooth transitions between themes
- Tailwind CSS dark mode utilities

```tsx
// Theme toggle implementation
const { toggleTheme } = useTheme();

<button
  onClick={toggleTheme}
  className="theme-toggle-button"
>
  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
</button>
```

## 📱 Responsive Design

The dashboard is fully responsive with a mobile-first approach:

- Adapts to all screen sizes (mobile, tablet, desktop)
- Responsive tables with horizontal scrolling on small screens
- Collapsible sidebar for mobile views
- Optimized forms and inputs for touch devices

## 🔍 Search Implementation

Implemented an efficient search mechanism with:

- Debounced input to reduce API calls
- Real-time results updating
- Clear search button
- Loading states during search
- No results handling

## 🛠️ Advanced Features

### Form Handling
- Field validation with error messages
- Form submission with loading states
- API error mapping to form fields

### Error Handling
- Global error handling for API requests
- User-friendly error messages
- Form-specific error handling
- Network error detection

### Code Organization
- Modular architecture using feature-based folder structure
- Separation of concerns between API, UI, and business logic
- Custom hooks for reusable functionality
- Consistent naming conventions and coding style

## 🌟 Beyond the Requirements

This project goes beyond the basic requirements by implementing:

1. **Advanced State Management**:
   - React Context for global state
   - React Query for server state
   - Optimistic updates for better UX

2. **Complete Form Solution**:
   - Structured validation logic
   - Field-level error messages
   - Form-level error handling
   - API error integration

3. **Code Refactoring**:
   - Converted monolithic services to modular architecture
   - Split large components into smaller, focused ones
   - Implemented reusable patterns for common operations

4. **UI Enhancements**:
   - Interactive form components
   - Loading states for all async operations
   - Animated transitions between states
   - Comprehensive error visualization

5. **Type Safety**:
   - Full TypeScript implementation
   - Interface definitions for all data structures
   - Type guards for runtime safety
   - Generics for reusable components

6. **Sorting Functionality**:
   - Client-side sorting implementation for all data columns
   - Custom sort icons with interactive state feedback
   - Support for string, numeric, and boolean values
   - State management for sort field and direction
   - Optimized performance with memoized sorting

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [React Query](https://tanstack.com/query/latest) for data fetching
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Heroicons](https://heroicons.com/) for beautiful icons
- [Vite](https://vitejs.dev/) for fast development and building 