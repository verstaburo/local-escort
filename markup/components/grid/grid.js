/**
 * @param grid
 * @returns {number} number of columns for current resulution
 */
const getColumnsCount = (grid) => {
    const cols = grid.data('cols') || {};

    const desktop = Number(cols.desktop) || 4;
    const laptop = Number(cols.laptop) || 3;
    const tablet = Number(cols.tablet) || 2;
    const mobile = Number(cols.mobile) || 1;

    const isLaptop = window.matchMedia('(max-width: 1024px)').matches;
    const isTablet = window.matchMedia('(max-width: 768px)').matches;
    const isMobile = window.matchMedia('(max-width: 540px)').matches;

    if (isMobile) {
        return mobile;
    } else if (isTablet) {
        return tablet;
    } else if (isLaptop) {
        return laptop;
    }

    return desktop;
};

/**
 * @param {Number} columns
 * if columns were provided, then use it to build grid, otherwise, detect columns count automatically
 * @param {Boolean} resort
 * if we need to resort (for example, after breakpoint change) we regroup all items
 */
export default function grid(columns, resort = false) {
    const gridElement = $('.js-masonry');

    if (!gridElement.length) {
        return;
    }

    // grid settings
    const GRID_COLUMNS_COUNT = 12;
    const COLUMN_CLASSNAME = 'grid__col';

    const existingColumns = gridElement.find('.grid__col');
    const newItems = gridElement.find('.js-masonry-item').filter(function() {
        return $(this).parent().hasClass('js-masonry');
    });

    const totalItemsCount = gridElement.find('.js-masonry-item').length;

    let columnsCount = Number(columns) > 0 ? Number(columns) : getColumnsCount(gridElement);

    if (totalItemsCount < columnsCount) {
        columnsCount = totalItemsCount;
    }

    // matrix
    // example: [[], [], [], []]
    const mtx = new Array(columnsCount).fill('').map(() => []);

    const pushElementIntoMtx = function(i, item) {
        mtx[i % columnsCount].push(item || $(this));
    };

    // existing columns, if new items were appended to the container (old items, for example if new items just added via ajax)
    // shift items from the columns in the same order as we append it
    // skip if resort === true
    if (existingColumns.length && !resort) {
        existingColumns.each(function(i) {
            $(this).find('.js-masonry-item').each(function() {
                pushElementIntoMtx(i, $(this));
            });
        });
    }

    // first load (grid build) or new items which added via ajax
    // skip if resort === true
    if (newItems.length && !resort) {
        newItems.addClass('preload');
        newItems.each(pushElementIntoMtx);
    }

    if (resort) {
        gridElement.find('.js-masonry-item').each(pushElementIntoMtx);
    }

    const modifiers = [
        'one', 'two', 'three', 'four',
        'fifth', 'six', 'seven', 'eight',
        'nine', 'ten', 'eleven', 'twelve',
    ];

    // make DOM elements from the matrix
    const cols = mtx.map(item => {
        const num = Math.floor(GRID_COLUMNS_COUNT / columnsCount) - 1;
        const className = `${COLUMN_CLASSNAME} ${COLUMN_CLASSNAME}_${modifiers[num]}`;
        return $(`<div class="${className}"></div>`).append(item);
    });

    gridElement
        .data('columns-count', columnsCount)
        .html('')
        .append(cols)
        .trigger('rebuild')
        .find('.preload')
        .removeClass('preload');
};

// rebuild grid when breakpoint just changed
$(window).on('resize', function() {
   const gridElement =  $('.js-masonry');
   const oldCount = Number(gridElement.data('columns-count'));
   const nextCount = getColumnsCount(gridElement);

   if (oldCount === nextCount) {
       return;
   }

   grid(nextCount, true);
});
