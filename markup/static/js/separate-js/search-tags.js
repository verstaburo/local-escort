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
            return $(this).val();
        });
    }

    var getCategories = function() {
        return $('[data-filter-element="filter-categories"]').val();
    }

    var getAge = function() {
        var min = $('[data-filter-element="filter-age"][data-type="min"]').val(),
            max = $('[data-filter-element="filter-age"][data-type="max"]').val();

        return min + ' - ' + max + ' y.o';
    }

    var getRate = function() {
        var min = $('[data-filter-element="filter-rate"][data-type="min"]').val(),
            max = $('[data-filter-element="filter-rate"][data-type="max"]').val();

        return min + ' - ' + max + ' $';
    }

    var getAvailability = function() {
        return 'availability: ' + $('[data-filter-element="filter-availability"]').val();
    }

    var getOrientation = function() {
        return 'orientation: ' + $('[data-filter-element="filter-orientation"]').val();
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
        return 'ethnicity: ' + $('[data-filter-element="filter-ethnicity"]').val();
    }

    var getRating = function() {
        var el = $('[data-filter-element="filter-rating"]').find('.rating-interactive__control:checked');
        return el.length ? 'rating - ' + el.val() : null;
    }

    var getNationality = function() {
        return 'nationality: ' + $('[data-filter-element="filter-nationality"]').val();
    }

    var getLanguage = function() {
        return 'language: ' + $('[data-filter-element="filter-language"]').val();
    }

    var getHairColor = function() {
        return 'hair color: ' + $('[data-filter-element="filter-hair-color"]').val();
    }

    var getEyeColor = function() {
        return 'eye color: ' + $('[data-filter-element="filter-eye-color"]').val();
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
    tags.push(getHeight());
    tags.push(getWeight());
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
        return !!item && !/[any|all]$/i.test((item+'').toLowerCase());
    });

    var tagElements = $.map(filteredTags, function (item) {
        return $('<div class="search-tag"><span class="search-tag__text">' + item + '</span><span class="search-tag__button"></span></div>');
    });

    tagsContainerElement.html(tagElements);
}

renderFilterTags();
