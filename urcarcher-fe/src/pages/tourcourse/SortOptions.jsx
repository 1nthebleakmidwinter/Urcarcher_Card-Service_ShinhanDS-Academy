import React from 'react';
import '../../assets/SortOptions.css';
import i18n from "locales/i18n";
import { useTranslation } from 'react-i18next';

const SortOptions = ({ setSortOption }) => {

    const { t, i18n } = useTranslation();

    return (
        <div className="sort-options">
            <button onClick={() => setSortOption('최신순')}>{t('Sort Latest')}</button>
            <span>|</span>
            <button onClick={() => setSortOption('조회순')}>{t('Sort Most Viewed')}</button>
            <span>|</span>
            <button onClick={() => setSortOption('인증순')}>{t('Sort Verified')}</button>
        </div>
    );
};

export default SortOptions;
