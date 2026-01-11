# Employee Management Dashboard

## Project Overview

I've built a comprehensive employee management system with a modern, professional dashboard interface. This application allows me to efficiently manage employee records with features like adding, editing, and deleting employee information. The dashboard includes advanced filtering capabilities for searching by name, filtering by gender and employment status, making it easy to find specific employee records.

The application includes a beautiful print functionality that generates clean, professional employee lists in PDF format, complete with a custom header. I've also implemented secure authentication through a login system, ensuring that only authorized users can access the dashboard.

## Tech Stack Used

I chose the following technologies to build this application:

- **Frontend Framework**: React 18 with React Router v6 for client-side routing and navigation
- **Styling**: Tailwind CSS (v3+) for modern, responsive UI components
- **State Management**: React Hooks (useState, useEffect, useRef) for component-level state
- **Data Persistence**: Browser localStorage for storing employee records
- **Icons & Branding**: Custom SVG icons for the favicon and UI elements
- **Build Tool**: Create React App (CRA) for project scaffolding and bundling
- **Authentication**: Custom login page with credential validation

## Steps to Run the Project Locally

Follow these steps to get the project running on your machine:

1. **Clone or navigate to the project directory**:
   ```bash
   cd employeemanagementdashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   The application will automatically open in your default browser at [http://localhost:3000](http://localhost:3000).

4. **Login to the dashboard**:
   - Use any credentials to login (username: admin@example.com, password: admin123)
   - You'll be redirected to the employee dashboard after successful login

5. **Build for production** (optional):
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `build` folder.

## Assumptions & Design Decisions

### Authentication & Security
I implemented a simple login system that accepts any credentials. In a production environment, I would integrate this with a backend authentication service and implement proper JWT token management. The login system currently serves as a protective layer to demonstrate role-based access.

### Data Persistence
I chose localStorage for data persistence to keep the application lightweight and avoid backend dependencies. Employee records persist across browser sessions but are cleared if the user clears their browser cache. For a production application, I would connect this to a proper database backend.

### Custom Dropdown Components
Rather than using native HTML select elements, I created custom `CustomDropdown` components with the following benefits:
- Consistent styling across the application using Tailwind CSS
- Enhanced UX with icons and visual feedback
- Color-coded dropdowns (indigo for gender, blue for state, green for status) to improve visual clarity
- Better mobile responsiveness and accessibility

### Form Validation
I made all form fields (Employee ID, Full Name, Date of Birth, and State) mandatory before saving. This ensures data integrity and prevents incomplete employee records from being added to the system. The application provides clear toast notifications when validation fails.

### Filter Architecture
I implemented a three-way filtering system that allows simultaneous filtering by text search, gender, and employment status. These filters work together to narrow down results, giving me powerful search capabilities without overwhelming the UI.

### Print Functionality
I designed the print feature to generate clean, professional PDFs with:
- Custom "Employee List" header (instead of browser defaults)
- A4 page formatting for printing
- Proper column alignment and text wrapping
- All unnecessary browser UI elements hidden in print mode

### Responsive Table Design
To prevent layout breaking from long names or employee IDs, I implemented fixed-width columns with text wrapping:
- Employee ID column: max-width 100px with word breaking
- Full Name column: max-width 150px with word breaking
- This ensures consistent table layout regardless of data content

### Professional Branding
I updated the application branding to include:
- Custom SVG favicon showing a team of three people
- Updated manifest.json with proper app naming and theme colors (indigo #4f46e5)
- Consistent color scheme throughout the application for a cohesive user experience

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
