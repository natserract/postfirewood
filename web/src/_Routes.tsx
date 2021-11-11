// // NOT USED, WE NEED TO CUSTOM THIS ROUTE PLEASE CHECK Routes.tsx
// // In this file, all Page components from 'src/pages` are auto-imported. Nested
// // directories are supported, and should be uppercase. Each subdirectory will be
// // prepended onto the component name.
// //
// // Examples:
// //
// // 'src/pages/HomePage/HomePage.js'         -> HomePage
// // 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage
// //
// // Handle private routes @see https://redwoodjs.com/docs/router#sets-of-routes

// import { Router, Route, Set, Private } from '@redwoodjs/router'
// import ContainerLayout from './layouts/ContainerLayout/ContainerLayout'
// import DashboardPage from './pages/DashboardPage/DashboardPage'

// const Routes = () => {
//   return (
//     <Router>
//       <Set wrap={ContainerLayout}>
//         <Route path="/" page={LoginPage} name="login" />

//         <Private unauthenticated="login">
//           <Route path="/dashboard" page={DashboardPage} name="dashboard" />
//         </Private>
//         <Route notfound page={NotFoundPage} />
//       </Set>
//     </Router>
//   )
// }

// export default Routes
