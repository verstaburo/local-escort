export default function grid() {
    const gridElement = $('.js-masonry');

    if (!gridElement.length) {
        return;
    }

    let COLUMNS = Math.ceil(gridElement.data('columns'));
    const blocks = $(gridElement.data('block'));

    if (!COLUMNS || !blocks.length) {
        return;
    }

    if (COLUMNS % 2 !== 0) {
        console.warn(`data-columns should be an even number, you have specified ${COLUMNS}, it just changed to ${COLUMNS - 1}`);
        COLUMNS -= 1;
    }

    const GRID_COLUMNS_COUNT = 12;
    const COLUMN_CLASSNAME = 'grid__col';

    const getColumn = n => {
        const num = n - 1 < 0 ? 0 : n - 1 >= GRID_COLUMNS_COUNT ? GRID_COLUMNS_COUNT - 1 : n - 1;

        const modifiers = [
            'one', 'two', 'three', 'four',
            'fifth', 'six', 'seven', 'eight',
            'nine', 'ten', 'eleven', 'twelve',
        ];

        const className = `${COLUMN_CLASSNAME} ${COLUMN_CLASSNAME}_${modifiers[num]}`;

        return $(`<div class="${className}"></div>`);
    };

    const columnElements = new Array(blocks.length >= COLUMNS ? COLUMNS : blocks.length)
        .fill(0)
        .map(() => getColumn(GRID_COLUMNS_COUNT / COLUMNS));

    blocks.each((i, el) => columnElements[i % columnElements.length].append(el));

    gridElement
        .html('')
        .append(columnElements)
        .trigger('rebuild');
};
