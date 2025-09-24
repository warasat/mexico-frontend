import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ALLRoutes from './routes/router'
import store from './core/redux/store'
// import { base_path } from './environment'
import { AuthProvider } from './core/context/AuthContext'

// Initialize i18n
import './core/i18n'
import { initializeTranslations } from './utils/translationUtils'

// Initialize translations when the app starts
initializeTranslations();


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-datepicker/src/stylesheets/datepicker.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/css/iconsax.css'
import './assets/css/feather.css'
import './assets/css/language-switcher.css'
import './assets/css/scrollable-dropdown.css'

// Conditional imports based on route
if (window.location.pathname.includes("system-admin")) {
  // Admin-specific styles
  import('./assets/admin/assets/css/feathericon.min.css');
  import('./assets/admin/assets/scss/main.scss');
}else {
  // Client-specific styles
  import('./assets/scss/main.scss');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <ALLRoutes />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </StrictMode>
)
