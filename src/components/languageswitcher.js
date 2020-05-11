import locales from '../i18n/locales.json';

import Button from '@primer/components/lib/Button';
import SelectMenu from '@primer/components/lib/SelectMenu';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocalStorage, useEffectOnce} from 'react-use';

export default function LanguageSwitcher() {
  const [language, setLanguage] = useLocalStorage('language', 'english');
  const {i18n} = useTranslation();

  useEffectOnce(() => {
    i18n.changeLanguage(language);
  });

  const onLanguageChange = useCallback(
    (language) => {
      i18n.changeLanguage(language);
    },
    [i18n]
  );

  return (
    <div className="LanguageSwitcher">
      <SelectMenu>
        <Button as="summary" className="button">
          {locales[language]}
        </Button>
        <SelectMenu.Modal className="select-menu-modal">
          <SelectMenu.List>
            {Object.entries(locales).map(([key, language]) => (
              <SelectMenu.Item
                key={key}
                className="select-menu-item"
                onClick={() => {
                  setLanguage(key);
                  onLanguageChange(key);
                }}
              >
                {language}
              </SelectMenu.Item>
            ))}
          </SelectMenu.List>
        </SelectMenu.Modal>
      </SelectMenu>
    </div>
  );
}
