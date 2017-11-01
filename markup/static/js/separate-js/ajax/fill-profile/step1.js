// $(function() {
//     var pageWrapper = $('.user-fill-profile');

//     /*
//      UPLOAD PHOTO
//     */

//     pageWrapper.on('change', '.js-user-fill-profile-photos .file__control', function() {
//         var control = this;

//         if (!control.files.length) {
//             return;
//         }

//         // put it into ajax query (success callback)
//         var reader = new FileReader(),
//             photosWrapper = pageWrapper.find('.js-user-fill-profile-photos');

//         reader.onload = function (e) {
//             $(`<div class="uploaded-photo user-fill-profile__masonry-item js-masonry-item">
//                 <img class="uploaded-photo__img" src="${e.target.result}">
//                 <div class="uploaded-photo__actions">
//                     <a class="uploaded-photo__action" href="#">Remove</a>
//                     <a class="uploaded-photo__action" href="#">Set as main</a>
//                 </div>
//             </div>`).appendTo(photosWrapper)

//             control.type = '';
//             control.type = 'file';

//             rebuildGrd();
//         };

//         reader.readAsDataURL(control.files[0]);
//     });
// });

