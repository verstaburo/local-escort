import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import filter from '../../components/filter/filter';
import searchBar from '../../components/search-bar/search-bar';
import modelPreview from '../../components/model-preview/model-preview';
import grid from '../../components/grid/grid';
import header from '../../components/header/header';
import userNav from '../../components/user-nav/user-nav';
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
import sendForm from '../../components/send-form/send-form';
import userMessages from '../../components/user-messages/user-messages';
import fileUpload from '../../components/file/file';
import authPopup from '../../components/auth-popup/auth-popup';
import modelInfoPopup from '../../components/model-info-popup/model-info-popup';
import textarea from '../../components/textarea/textarea';
import captcha from "../../components/captcha/captcha";
import rangeSlider from '../../components/range-slider/range-slider';
import selectbox from "../../components/selectbox/selectbox";
import help from "../../components/help/help";
import modelMap from "../../components/model-map/model-map";
import map from "../../components/map/map";
import userProfile from '../../components/user-profile/user-profile';
import userDropdownPopup from '../../components/user-dropdown-popup/user-dropdown-popup';
import modelList from "../../components/model-list/model-list";
import fullPhotoPopup from "../../components/full-photo-popup/full-photo-popup";

(function($){
    var event = 'oninput' in document.createElement('input') ? 'input' : 'keydown';

    $.fn.autoGrowInput = function(options){
        var o = $.extend({ maxWidth: 500, minWidth: 20, comfortZone: 0 }, options);

        this.each(function(){
            var input = $(this),
                val = ' ',
                comfortZone = (options && 'comfortZone' in options) ? o.comfortZone : parseInt(input.css('fontSize')),
                span = $('<span/>').css({
                    position: 'absolute',
                    top: -9999,
                    left: -9999,
                    width: 'auto',
                    fontSize: input.css('fontSize'),
                    fontFamily: input.css('fontFamily'),
                    fontWeight: input.css('fontWeight'),
                    letterSpacing: input.css('letterSpacing'),
                    textTransform: input.css('textTransform'),
                    whiteSpace: 'nowrap',
                    ariaHidden: true
                }).appendTo('body'),
                check = function(e){
                    if (val === (val = input.val()) && e.type !== 'autogrow') return;
                    if (!val) val = input.attr('placeholder') || '';
                    span.html(val.replace(/&/g, '&amp;').replace(/\s/g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
                    var newWidth = span.width() + comfortZone, mw = typeof(o.maxWidth) == "function" ? o.maxWidth() : o.maxWidth;
                    if (newWidth > mw) newWidth = mw;
                    else if (newWidth < o.minWidth) newWidth = o.minWidth;
                    if (newWidth != input.width()) input.width(newWidth);
                };
            input.on(event+'.autogrow autogrow', check);
            // init on page load
            check();
        });
        return this;
    }
}(jQuery));

$(() => {
    svg4everybody();
    objectFitImages();
    selectbox();
    header();
    userNav();
    userDropdownPopup();
    rangeSlider();
    textarea();
    photoTape();
    modelInfoPopup();
    filter();
    searchBar();
    modelPreview();
    grid();
    window.rebuildGrd = grid;
    fullPhotoPopup();
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
    sendForm();
    userMessages();
    fileUpload();
    authPopup();
    captcha();
    help();
    userProfile();
    map();
    modelMap();
    modelList();
});
