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
});
