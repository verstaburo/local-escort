import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import filter from '../../components/filter/filter';
import searchBar from '../../components/search-bar/search-bar';
import modelPreview from '../../components/model-preview/model-preview';
import grid from '../../components/grid/grid';
import header from '../../components/header/header';

$(() => {
    svg4everybody();
    objectFitImages();
    header();
    filter();
    searchBar();
    modelPreview();
    grid();
    window.rebuildGrd = grid;
});
