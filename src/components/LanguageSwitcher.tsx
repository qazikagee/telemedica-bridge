
import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation } from 'react-router-dom';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const getLanguageNativeName = (code: string) => {
    switch (code) {
      case 'en':
        return t('language.english');
      case 'uz':
        return t('language.uzbek');
      case 'ru':
        return t('language.russian');
      default:
        return code;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Select language">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          className={i18n.language === 'en' ? 'bg-muted' : ''}
          onClick={() => changeLanguage('en')}
        >
          {t('language.english')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={i18n.language === 'uz' ? 'bg-muted' : ''}
          onClick={() => changeLanguage('uz')}
        >
          {t('language.uzbek')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={i18n.language === 'ru' ? 'bg-muted' : ''}
          onClick={() => changeLanguage('ru')}
        >
          {t('language.russian')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
