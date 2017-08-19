const CONTAINER         = 'selectbox';
const VALUE             = 'selectbox__value';
const CONTROL           = 'selectbox__control';
const ACTIVE            = 'selectbox_active';
const LIST              = 'selectbox__list';
const LIST_WRAPPER      = 'selectbox__list-wrapper';
const LIST_ITEM         = 'selectbox__item';
const LIST_ITEM_VALUE   = 'span';
const LIST_ITEM_ACTIVE  = 'selectbox__item_active';
const DROPDOWN          = 'selectbox__dropdown';

const normalizeList = (list) => {
    const footer = $('.footer');
    const wrap = list.parents(`.${LIST_WRAPPER}`);
    const w = $(window);

    // direction -> to top
    if (footer.offset().top + footer.outerHeight() < wrap.outerHeight() + wrap.offset().top) {
        wrap.css({
            marginTop: 0,
            marginBottom: list.css('margin-top'),
            top: '-100%',
            transform: 'translateY(-100%)',
        });
    }

    if (wrap.offset().left < 0) {
        if (wrap.css('right') === 'auto') {
            wrap.css('left', 0);
        } else if (list.css('left') === 'auto') {
            wrap.css('right', 0);
        } else {
            wrap.css({
                left: 0,
                right: 'initial'
            });
        }

    }
};

const generateList = (selectbox) => {
    if (!selectbox.length || !selectbox.hasClass(CONTAINER)) {
        return
    }

    const wrap = selectbox.find(`.${LIST_WRAPPER}`);
    const control = selectbox.find(`.${CONTROL}`);
    const value = selectbox.find(`.${VALUE}`);

    if (!control.length) {
        return
    }

    const list = $('<ul></ul>').addClass(LIST);

    const generateListItem = title => {
        const item = $('<li></li>')
            .addClass(LIST_ITEM);

        $('<span></span>')
            .text(title)
            .appendTo(item);

        $('<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../svg-symbols.svg#ok"></use></svg>')
            .appendTo(item);

        return item;
    };

    let hasDropdown = false;

    control
        .children()
        .each(function() {
            const item = $(this);
            const isOption = item.prop('tagName') === 'OPTION';
            const isOptgroup = item.prop('tagName') === 'OPTGROUP';

            if (isOption) {
                const listItem = generateListItem(item.text()).appendTo(list);

                if (item.prop('selected')) {
                    listItem.addClass(LIST_ITEM_ACTIVE);
                    value.text(item.text());
                }
            }

            if (isOptgroup) {

                hasDropdown = true;
                const dropdownItem = generateListItem(item.prop('label')).appendTo(list);

                const dropdown = $('<ul></ul>')
                    .addClass(DROPDOWN)
                    .appendTo(dropdownItem);

                item
                    .children()
                    .each(function() {
                        const optItem = $(this);
                        const listItem = generateListItem(optItem.text(), optItem.prop('value')).appendTo(dropdown);

                        if (optItem.prop('selected')) {
                            listItem.addClass(LIST_ITEM_ACTIVE);
                            value.text(item.prop('label'));
                        }
                    })
            }
        });

    wrap.append(list);

    if (hasDropdown) {
        wrap.addClass('selectbox__list-wrapper_has_dropdown');
    }

    normalizeList(list);
};

export default function selectbox() {
    $(`.${CONTAINER}`).each(function() {
        generateList($(this));
    });

    const deactivateAll = function() {
        $(document)
            .find(`.${CONTAINER}`)
            .removeClass(ACTIVE)
    };

    const onSelectboxClick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        const selectbox = $(this);
        const list = selectbox.find(`.${LIST}`);
        const isActive = selectbox.hasClass(ACTIVE);

        deactivateAll();

        if (isActive) {
            selectbox.removeClass(ACTIVE);
        } else {
            selectbox.addClass(ACTIVE);
        }
    };

    const onListItemClick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        const item = $(this);
        const selectbox = item.parents(`.${CONTAINER}`);
        const dropdownItem = item.parents(`.${LIST_ITEM}`);
        const value = selectbox.find(`.${VALUE}`);

        let text = '';
        let selectedIndex = 0;

        if (item.children(`.${DROPDOWN}`).length) {
            return;
        }

        if (dropdownItem.length) {
            selectedIndex = dropdownItem.index() + item.index();
            text = dropdownItem.find(LIST_ITEM_VALUE).eq(0).text();
        } else {
            selectedIndex = item.index();
            text = item.find(LIST_ITEM_VALUE).text();
        }

        selectbox
            .find(`.${LIST_ITEM}`)
            .removeClass(LIST_ITEM_ACTIVE);

        item.addClass(LIST_ITEM_ACTIVE);

        selectbox
            .find(`.${CONTROL}`)
            .prop('selectedIndex', selectedIndex)
            .trigger('change')
            .trigger('click');

        value.text(text);
    };

    $(document)
        .on('click', `.${CONTAINER}`, onSelectboxClick)
        .on('click', `.${LIST_ITEM}`, onListItemClick)
        .on('click', deactivateAll);

    window.initSelectbox = (selectbox = null) => {
        if (!selectbox) {
            $(`.${CONTAINER}`).each(function() {
                generateList($(this));
            });
        } else {
            generateList(selectbox)
        }
    };

    window.setSelectboxListPosition = (selectbox = null) => {
        if (!selectbox) {
            $(`.${LIST}`).each(function() {
               normalizeList($(this));
            });
        } else {
            normalizeList(selectbox.find(`.${LIST}`));
        }
    }

    $(document).on('aftershow', '.popup', function() {
       $(this).find(`.${CONTAINER}`).each(function() {
          normalizeList($(this));
       });
    });
}
