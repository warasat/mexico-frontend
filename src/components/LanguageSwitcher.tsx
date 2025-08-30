import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`language-switcher ${className}`}>
      <div className="dropdown">
        <button 
          className="btn btn-outline-primary dropdown-toggle" 
          type="button" 
          id="languageDropdown" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          <i className="fas fa-globe me-2"></i>
          {i18n.language === 'es' ? 'Mexican' : 'English'}
        </button>
        <ul className="dropdown-menu" aria-labelledby="languageDropdown">
          <li>
            <button 
              className={`dropdown-item ${i18n.language === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
            >
              <span className="flag-icon flag-icon-us me-2"></span>
              English
            </button>
          </li>
          <li>
            <button 
              className={`dropdown-item ${i18n.language === 'es' ? 'active' : ''}`}
              onClick={() => changeLanguage('es')}
            >
              <span className="flag-icon flag-icon-mx me-2"></span>
              Mexican
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
