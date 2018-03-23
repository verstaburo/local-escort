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
import rating from "../../components/rating/rating";
import list from "../../components/list/list";
import navbar from "../../components/navbar/navbar";
import changeCurrency from "../../components/user-fill-profile/changeCurrency";
import checkbox from "../../components/checkbox/checkbox";
import addInput from "../../components/add-input/add-input";
import selectToRangeConnector from "./selectToRangeConnector";
import "../../components/fill-profile-nav/fill-profile-nav";
import './jquery.inputmask.bundle';

(function() {

	window.HashChangeEvent = (function() {
		var ret = function(oldURL, newURL) {
			this.oldURL = oldURL;
			this.newURL = newURL;
			this.timeStamp = (new Date()).getTime();
		};
		ret.prototype = {
			bubbles: false,
			cancelable: false,
			currentTarget: null,
			defaultPrevented: false,
			returnValue: true,
			srcElement: null,
			target: null,
			timeStamp: null,
			type: 'hashchange'
		};
		return ret;
	}());

	var fix = {

		// Bound event listeners
		listeners: {
			funcs: [ ],
			remove: function(func) {
				var arr = [ ];
				for (var i = 0, c = fix.listeners.funcs.length; i < c; i++) {
					if (fix.listeners.funcs[i] !== func) {
						arr.push(fix.listeners.funcs[i]);
					}
				}
				fix.listeners.funcs = arr;
			}
		},

		// Start the poller
		init: function() {
			// Get the starting hash
			fix.lastHash = fix.getHash();
			fix.lastLocation = String(location);
			// Patch addEventListener
			if (window.addEventListener) {
				var nativeAEL = window.addEventListener;
				window.addEventListener = function(evt, func) {
					if (evt === 'hashchange') {
						fix.listeners.funcs.push(func);
					} else {
						return nativeAEL.apply(window, arguments);
					}
				};
			}
			// Patch attachEvent
			if (window.attachEvent) {
				var nativeAE = window.attachEvent;
				window.attachEvent = function(evt, func) {
					if (evt === 'onhashchange') {
						fix.listeners.funcs.push(func);
					} else {
						return nativeAE.apply(window, arguments);
					}
				};
			}
			// Start polling
			fix.setTimeout();
		},

		// The previous hash value
		lastHash: null,
		lastLocation: null,

		// The number of miliseconds between pollings
		pollerRate: 50,

		// Read the hash value from the URL
		getHash: function() {
			return location.hash.slice(1);
		},

		// Sets the next interval for the timer
		setTimeout: function() {
			window.setTimeout(fix.pollerInterval, fix.pollerRate);
		},

		// Creates a new hashchange event object
		createEventObject: function(oldURL, newURL) {
			return new window.HashChangeEvent(oldURL, newURL);
		},

		// Runs on an interval testing the hash
		pollerInterval: function() {
			var hash = fix.getHash();
			if (hash !== fix.lastHash) {
				var funcs = fix.listeners.funcs.slice(0);
				if (typeof window.onhashchange === 'function') {
					funcs.push(window.onhashchange);
				}
				for (var i = 0, c = funcs.length; i < c; i++) {
					var evt = fix.createEventObject({
						oldURL: fix.lastLocation,
						newURL: String(location)
					});
				}
				fix.lastHash = fix.getHash();
				fix.lastLocation = String(location);
			}
			fix.setTimeout();
		}

	};

	fix.init();

}());

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

    /**
     * Inputmask
     */
    $('.js-phone-mask').inputmask('(999) 999-9999');

    svg4everybody();
    objectFitImages();
    selectbox();
    checkbox();
    navbar();
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
    addInput();
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
    changeCurrency();
    userProfile();
    map();
    modelMap();
    modelList();
    rating();
    list();
    selectToRangeConnector();

    $('.js-datepicker').datepicker({ autoHide: true });
});


$(window).on('load', function () {
    $('html').removeClass('loading');
});
