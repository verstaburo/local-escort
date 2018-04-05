function renderFilterTags() {
    var tags = [],
        tagsContainerElement = $('.search-tags');

    if (!tagsContainerElement.length) {
        return;
    }

    /**
     * Получаем значения элементов фильтра
     */

    var getCheckboxes = function(name) {
        return $('[name="'+name+'"][data-filter-element]:checked').map(function() {
            var el = $(this);

            return { el: el.data('filter-element'), val: el.val() };
        });
    }

    var getCategories = function() {
        return { el: 'filter-categories"', val: 'categories: ' + $('[data-filter-element="filter-categories"]').val() };
    }

    var getAge = function() {
        var min = $('[data-filter-element="filter-age"][data-type="min"]').val(),
            max = $('[data-filter-element="filter-age"][data-type="max"]').val();

        return { el: 'filter-age', val: min + ' - ' + max + ' y.o' };
    }

    var getRate = function() {
        var min = $('[data-filter-element="filter-rate"][data-type="min"]').val(),
            max = $('[data-filter-element="filter-rate"][data-type="max"]').val();

        return { el: 'filter-age', val: min + ' - ' + max + ' $' };
    }

    var getAvailability = function() {
        return { el: 'filter-availability"', val: 'availability: ' + $('[data-filter-element="filter-availability"]').val() };
    }

    var getOrientation = function() {
        return { el: 'filter-orientation"', val: 'orientation: ' + $('[data-filter-element="filter-orientation"]').val() };
    }

    var getHeight = function() {
        var min = $('[data-filter-element="filter-height"][data-type="min"]').val(),
            max = $('[data-filter-element="filter-height"][data-type="max"]').val(),
            type = $('[data-filter-element="filter-height-type"]').val();

        return min + ' - ' + max + ' ' + type;
    }

    var getWeight = function() {
        var min = $('[data-filter-element="filter-weight"][data-type="min"]').val(),
            max = $('[data-filter-element="filter-weight"][data-type="max"]').val(),
            type = $('[data-filter-element="filter-weight-type"]').val();

        return min + ' - ' + max + ' ' + type;
    }

    var getEthnicity = function() {
        return { el: 'filter-ethnicity"', val: 'ethnicity: ' + $('[data-filter-element="filter-ethnicity"]').val() };
    }

    var getRating = function () {
        var el = $('[data-filter-element="filter-rating"]').find('.rating-interactive__control:checked');

        return { el: 'filter-rating', val: el.length ? 'rating - ' + el.val() : null };
    }

    var getNationality = function() {
        return { el: 'filter-ethnicity"', val: 'nationality: ' + $('[data-filter-element="filter-nationality"]').val() };
    }

    var getLanguage = function() {
        return { el: 'filter-language"', val: 'language: ' + $('[data-filter-element="filter-language"]').val() };
    }

    var getHairColor = function() {
        return { el: 'filter-hair-color"', val: 'hair color: ' + $('[data-filter-element="filter-hair-color"]').val() };
    }

    var getEyeColor = function() {
        return { el: 'filter-eye-color"', val: 'eye color: ' + $('[data-filter-element="filter-eye-color"]').val() };
    }

    var getBreastSize = function() {
        var min = $('[data-filter-element="filter-breast-size"][data-type="min"]').val(),
            max = $('[data-filter-element="filter-breast-size"][data-type="max"]').val();

        return 'breast size: ' + min + ' A - ' + max + ' FF';
    }

    var getShoeSize = function() {
        var min = $('[data-filter-element="filter-shoe-size"][data-type="min"]').val(),
            max = $('[data-filter-element="filter-shoe-size"][data-type="max"]').val();

        return 'shoue size: ' + min + ' - ' + max;
    }

    tags.push(getCategories());
    tags.push(getAge());
    tags.push(getRate());
    tags.push(getAvailability());
    tags.push(getOrientation());
    // tags.push(getHeight());
    // tags.push(getWeight());
    tags.push(getEthnicity());
    $.merge(tags, getCheckboxes('additional-params'));
    tags.push(getRating());
    tags.push(getNationality());
    tags.push(getLanguage());
    tags.push(getHairColor());
    tags.push(getEyeColor());
    $.merge(tags, getCheckboxes('service-for'));
    $.merge(tags, getCheckboxes('keywords'));
    $.merge(tags, getCheckboxes('services-sex'));
    $.merge(tags, getCheckboxes('services-massage'));
    $.merge(tags, getCheckboxes('services-striptease'));
    $.merge(tags, getCheckboxes('services-bdsm'));
    $.merge(tags, getCheckboxes('services-extreme'));
    $.merge(tags, getCheckboxes('services-other'));

    /**
     * Рендер тегов
     */

    //  Фильтрация значений undefined, null, false, '' и строк, который заканчиваются на any || all
    var filteredTags = $.grep(tags, function(item) {
        return !!item.val && !/[any|all]$/i.test((item.val+'').toLowerCase());
    });

    var tagElements = $.map(filteredTags, function (item) {
        return $('<div class="search-tag js-search-tag" data-filter-target-element="' + item.el + '"><span class="search-tag__text">' + item.val + '</span><span class="search-tag__button"></span></div>');
    });

    tagsContainerElement.html(tagElements);
}

/**
 * Закрытие тегов
 */

$(document).on('click touchstart', '.js-search-tag', function (e) {
    e.preventDefault();

    var tag = $(this),
        target = $('[data-filter-element="' + tag.data('filter-target-element') + '"]');

    // чекбокс
    if (target.hasClass('checkbox__input')) {
        target.prop('checked', false);
        target.trigger('change');
    }

    // рейтинг

    if (target.hasClass('rating-interactive')) {
        target.find('.rating-interactive__reset').click();
    }

    // селект

    if (target.hasClass('selectbox__control')) {
        target.prop('selectedIndex', 0).trigger('change');
    }

    // рендж слайдер

    if (target.hasClass('range-slider__input')) {
        var parent = target.eq(0).parents('.range-slider');

        var min = target.filter(function () {
            return $(this).data('type', 'min');
        });

        var max = target.filter(function () {
            return $(this).data('type', 'max');
        });

        min.val(parent.data('min')).trigger('change');
        max.val(parent.data('max')).trigger('change');

        var type = target.data('filter-type-element');

        if (type) {
            $('[data-filter-element="' + type + '"]').prop('selectedIndex', 0).trigger('change');
        }
    }

    $('.filter_extended').trigger('submit');

    tag.fadeOut(250, function() {
        $(this).remove();
    });
});


/**
 * Отправка фильтра
 */

$(document).on('submit', '.filter_extended', function (e) {
    e.preventDefault();
    renderFilterTags();

    // ajax query

    $(this).parents('.popup ').trigger('hide');
});

renderFilterTags();
