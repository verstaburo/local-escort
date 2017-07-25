export default function userMessages() {
    const scrollBlock = $('.js-user-messages-scrollable');

    if (!scrollBlock.length) {
        return;
    }

    scrollBlock.scrollbar();
}
