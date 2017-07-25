import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import filter from '../../components/filter/filter';
import searchBar from '../../components/search-bar/search-bar';
import modelPreview from '../../components/model-preview/model-preview';
import grid from '../../components/grid/grid';
import header from '../../components/header/header';
import photoTape from '../../components/photo-tape/photo-tape';
import arrowUp from '../../components/arrow-up/arrow-up';
import citySuggest from '../../components/city-suggest/city-suggest';
import accordion from '../../components/accordion/accordion';
import ratingInteractive from '../../components/rating-interactive/rating-interactive';
import popup from '../../components/popup/popup';
import popupWelcome from '../../components/popup-welcome/popup-welcome';
import selectCityPopup from '../../components/select-city-popup/select-city-popup';
import cityList from '../../components/city-list/city-list';
import recommendedSlider from '../../components/recommended-slider/recommended-slider';
import profilePopup from '../../components/profile-popup/profile-popup';
import dottedDropdown from '../../components/dotted-dropdown/dotted-dropdown';
import { profileReportPopup } from '../../components/profile-common-popup/profile-common-popup';
import youtubeVideo from '../../components/youtube-video/youtube-video';
import profilePhotoPopup from '../../components/profile-photo-popup/profile-photo-popup';
import reviews from '../../components/reviews/reviews';
import agency from '../../components/agency/agency';
import map from '../../components/map/map';
import sendForm from '../../components/send-form/send-form';

$(() => {
    svg4everybody();
    objectFitImages();
    header();
    photoTape();
    filter();
    searchBar();
    modelPreview();
    grid();
    window.rebuildGrd = grid;
    arrowUp();
    citySuggest();
    accordion();
    ratingInteractive();
    popup();
    popupWelcome();
    selectCityPopup();
    cityList();
    recommendedSlider();
    profilePopup();
    dottedDropdown();
    profileReportPopup();
    youtubeVideo();
    profilePhotoPopup();
    reviews();
    agency();
    map();
    sendForm();
});
