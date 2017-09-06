export default function popupWelcome() {
    const popup = $('#popup-welcome');

    // записываем в статическую переменную функции значение из localStorage
    // для браузеров, которые не поддерживают localStorage
    // try catch нужен для браузеров, которые не поддежривают localStorage
    // они бросают исключение, если нет такого API, а мы его перехватываем
    try {
        popupWelcome.yearsAccepted = localStorage.getItem('yearsAccepted');
    } catch (e) {}

    // если попапа нет, то дабы избежать ошибок в консоле, останавливаем выполнение функции
    if (!popup.length) {
        return;
    }

    // для удобства оборачиваем в функцию, ибо этот код понадобится дважды.
    const showPopup = () => {
        try {
            // проверяем, если есть запись о подтверждении возраста в статической переменной функции
            // или в localStorage
            // если есть, то показываем попап
            if (!localStorage.getItem('yearsAccepted') || !popupWelcome.yearsAccepted) {
                popup.trigger('show');
            }
        } catch(e) {
            return;
        }
    };

    // через 500ms вызываем функцию выше
    setTimeout(showPopup, 500);

    // эти события реализованы в попапе
    popup
        .on('click', '.js-popup-welcome-accept', (e) => {
            e.preventDefault();

            try {
                // при клике на кнопку - yes, I have 18
                // записываем в localStorage ключь yearsAccepted со значением true
                localStorage.setItem('yearsAccepted', true);
                // так же для браузеров, которые не поддерживают localStorage, пишем ее в статическую переменную
                popupWelcome.yearsAccepted = true;
                // скрываем попап
                popup.trigger('hide');
            } catch(e) {
                return;
            }
        })
        .on('hide', () => {
            // при скрытии попапа, опять пытаемся его показать (скорее всего тут будет какой-то редирект)
            // но пока пусть будет так, если попап закрыли без подтверждения возраста,
            // то функция showPopup проверит это и откроет его снова
            // иначе, ничего не произойдет
            setTimeout(showPopup, 1000);
        });
};
