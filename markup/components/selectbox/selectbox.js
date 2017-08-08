const CONTAINER         = 'selectbox';
const BOX               = 'selectbox__box';
const VALUE             = 'selectbox__value';
const CONTROL           = 'selectbox__control';
const ACTIVE            = 'selectbox_active';
const DISABLED          = 'selectbox_disabled';
const LIST              = 'selectbox__list';
const LIST_ITEM         = 'selectbox__item';
const LIST_ITEM_VALUE   = 'span';
const LIST_ITEM_ACTIVE  = 'selectbox__item_active';
const DROPDOWN          = 'selectbox__list_dropdown';
const DURATION          = 250;

const generateList = (selectbox) => {
    if (!selectbox.length || !selectbox.hasClass(CONTAINER)) {
        return
    }

    const control = selectbox.find(`.${CONTROL}`);
    const value = selectbox.find(`.${VALUE}`);

    if (!control.length) {
        return
    }

    const existingList = selectbox.find(`.${LIST}`);
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

                const dropdownItem = generateListItem(item.prop('label')).appendTo(list);

                const dropdown = $('<ul></ul>')
                    .addClass(LIST)
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

    if (!existingList.length) {
        selectbox.append(list)
    } else {
        existingList.replaceWith(list)
    }
};

export default function selectbox() {
    $(`.${CONTAINER}`).each(function() {
        generateList($(this));
    });

    const onSelectboxClick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        const selectbox = $(this);
        const list = selectbox.find(`.${LIST}`);
        const isActive = selectbox.hasClass(ACTIVE);

        if (isActive) {
            list.slideUp(DURATION, () => {
                selectbox.removeClass(ACTIVE);
            });
        } else {
            list.slideDown(DURATION, () => {
                selectbox.addClass(ACTIVE);
            });
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
        .on('click', function() {
            $(this)
                .find(`.${CONTAINER}`)
                .removeClass(ACTIVE)
                .find(`.${LIST}`)
                .slideUp(DURATION);
        });
}
