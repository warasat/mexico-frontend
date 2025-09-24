import i18n from '../core/i18n';

export const translatePage = () => {
  const elements = document.querySelectorAll('[data-key]');

  elements.forEach((element) => {
    const key = element.getAttribute('data-key');
    if (key) {
      const translation = i18n.t(key);

      if (translation && translation !== key) {
        if (element.tagName === 'INPUT') {
          const inputElement = element as HTMLInputElement;
          if (inputElement.type === 'text' || inputElement.type === 'email' || inputElement.type === 'password') {
            inputElement.placeholder = translation;
          } else if (inputElement.type === 'submit' || inputElement.type === 'button') {
            inputElement.value = translation;
          }
        } else if (element.tagName === 'BUTTON') {
          element.textContent = translation;
        } else if (element.tagName === 'SELECT') {
          const selectElement = element as HTMLSelectElement;
          if (selectElement.selectedOptions.length > 0) {
            const selectedOption = selectElement.selectedOptions[0];
            if (selectedOption.hasAttribute('data-key')) {
              const optionKey = selectedOption.getAttribute('data-key');
              if (optionKey) {
                const optionTranslation = i18n.t(optionKey);
                if (optionTranslation && optionTranslation !== optionKey) {
                  selectedOption.textContent = optionTranslation;
                }
              }
            }
          }
        } else if (element.tagName === 'OPTION') {
          const optionKey = element.getAttribute('data-key');
          if (optionKey) {
            const optionTranslation = i18n.t(optionKey);
            if (optionTranslation && optionTranslation !== optionKey) {
              element.textContent = optionTranslation;
            }
          }
        } else {
          element.textContent = translation;
        }
      }
    }
  });

  window.dispatchEvent(new CustomEvent('languageChanged', {
    detail: { language: i18n.language }
  }));

  // Force a more aggressive update by triggering multiple events
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('forceGlobalUpdate'));
    window.dispatchEvent(new CustomEvent('i18nLanguageChanged', {
      detail: { language: i18n.language }
    }));
  }, 50);
};

export const switchLanguage = (language: string) => {
  i18n.changeLanguage(language);
  localStorage.setItem('language', language);
  setTimeout(() => {
    translatePage();
    window.dispatchEvent(new CustomEvent('forceGlobalUpdate'));
  }, 100);
};

export const initializeTranslations = () => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && savedLanguage !== i18n.language) {
    i18n.changeLanguage(savedLanguage);
  }
  translatePage();
  setupAutoTranslation();
};

export const setupAutoTranslation = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            if (element.hasAttribute('data-key')) {
              translateElement(element);
            }
            element.querySelectorAll('[data-key]').forEach(translateElement);
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
  return observer;
};

const translateElement = (element: HTMLElement) => {
  const key = element.getAttribute('data-key');
  if (key) {
    const translation = i18n.t(key);
    if (translation && translation !== key) {
      element.textContent = translation;
    }
  }
};
