# Cache Dashboard

A Next.js frontend application to view session cache data from the dashboard API.

## Features

- Search sessions by Session ID
- Display Budget Pay information with limits and installments
- Show order details with tracking information
- View refund messages
- Beautiful, responsive UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### API Configuration

The application expects the API to be running at:
```
http://localhost:8081/api/dashboard/cache/{session_id}
```

Make sure your backend API is running on port 8081 before using the frontend.

## Usage

1. Enter a Session ID in the search box (e.g., `982fd766-4b7e-4ba3-8f00-ed3db1b65837`)
2. Click "Search" or press Enter
3. View the cache data including:
   - Budget Pay information
   - Order details with tracking
   - Refund messages

## Build for Production

```bash
npm run build
npm start
```

## Technology Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
