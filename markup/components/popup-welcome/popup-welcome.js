export default function popupWelcome() {
    const popup = $('#popup-welcome');

    // я использую sessionStorage вместо localStorage,
    // т.к тут хранится сессия, т.е, если я закрою браузер, то sessionStorage автоматически чистится

    // записываем в статическую переменную функции значение из sessionStorage
    // для браузеров, которые не поддерживают sessionStorage
    // try catch нужен для браузеров, которые не поддежривают sessionStorage
    // они бросают исключение, если нет такого API, а мы его перехватываем
    try {
        popupWelcome.yearsAccepted = sessionStorage.getItem('yearsAccepted');
    } catch (e) {}

    // если попапа нет, то дабы избежать ошибок в консоле, останавливаем выполнение функции
    if (!popup.length) {
        return;
    }

    // для удобства оборачиваем в функцию, ибо этот код понадобится дважды.
    const showPopup = () => {
        try {
            // проверяем, если есть запись о подтверждении возраста в статической переменной функции
            // или в sessionStorage
            // если есть, то показываем попап
            if (!sessionStorage.getItem('yearsAccepted') || !popupWelcome.yearsAccepted) {
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
                // записываем в sessionStorage ключь yearsAccepted со значением true
                sessionStorage.setItem('yearsAccepted', true);
                // так же для браузеров, которые не поддерживают sessionStorage, пишем ее в статическую переменную
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
