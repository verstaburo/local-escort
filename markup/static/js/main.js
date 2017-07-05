import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import filter from '../../components/filter/filter';
import searchBar from '../../components/search-bar/search-bar';

$(() => {
    svg4everybody();
    objectFitImages();
    filter();
    searchBar();
});
