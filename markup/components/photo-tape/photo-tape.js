import Swiper from 'swiper';

export default function photoTape() {
    const block = $('.photo-tape');

    if (!block.length) {
        return;
    }

    new Swiper(block, {
        slidesPerView: 'auto',
    });
}
