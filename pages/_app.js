// Your pages/_app.js file is set up to use Redux for state management and apply global styles. Here’s a breakdown of what each part does:

import { wrapper } from "@/store"; //wrapper: This is likely a Redux wrapper for integrating Redux with Next.js. It probably comes from your store configuration file.


import "@/styles/main.scss"; //main.scss: This imports global styles that will be applied to your entire application.


// App: This is a custom App component that wraps every page in your application. It receives Component and pageProps as props. Component is the active page, and pageProps are the initial props preloaded for that page.
function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default wrapper.withRedux(App); //wrapper.withRedux(App): This enhances the App component with Redux functionality using the wrapper. It means that Redux will be available throughout your application, and you'll be able to use Redux for state management in your pages and components.




/*

Key Points:
Global Styles: The main.scss file is loaded globally, meaning any styles you define in this file will affect your entire application.

Redux Integration: By wrapping your App component with Redux (wrapper.withRedux(App)), you ensure that Redux state management is available across all pages.

Page Component Rendering: The App component renders the Component for each page with its associated pageProps. This is the default behavior of Next.js’s custom App component.


*/