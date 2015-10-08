/**
 * Created by petrfomichev on 28.09.15.
 */

(function() {
    // Всякие глобальные переменные
    var reviewsClassName =
    {

        '1': 'review-rating-one',
        '2': 'review-rating-two',
        '3': 'review-rating-three',
        '4': 'review-rating-four',
        '5': 'review-rating-five'

    }

    var ReadyState = {
        'UNSENT': 0,
        'OPENED': 1,
        'HEADERS_RECEIVED': 2,
        'LOADING': 3,
        'DONE': 4
    };

    var templateContainer = document.querySelector('.reviews-list');

    //Блок ошибки загрузки
    function showLoadFailure() {
        templateContainer.classList.add('reviews-load-failure');
    }

    //Блок кода отвечающий за отрисовку комментариев
    function reviewsRender(reviewToRender) {

        var reviewsFilter = document.getElementById('reviews-filter');
        reviewsFilter.className = 'invisible';

        var templateReview = document.getElementById('review-template');

        var reviewsFragment = document.createDocumentFragment();
        // Пробегаем по данным и отрисовываем
        reviewToRender.forEach(function (reviews) {
            var newReviewElement = templateReview.content.children[0].cloneNode(true);

            newReviewElement.querySelector('.review-rating').classList.add(reviewsClassName[reviews['rating']]);
            newReviewElement.querySelector('.review-text').textContent = reviews['description'];

            reviewsFragment.appendChild(newReviewElement);
            //Обработка изображений и ошибок
            if (reviews['author']['picture']) {
                var backgroundImage = new Image();
                backgroundImage.src = reviews['author']['picture'];
                backgroundImage.style.backgroundSize = '124px 124px';
                backgroundImage.className = "review-author";

                backgroundImage.onload = function () {
                    var dummyImage = newReviewElement.querySelector('img.review-author');
                    newReviewElement.replaceChild(backgroundImage, dummyImage);
                }

                backgroundImage.onerror = function (evt) {
                    newReviewElement.classList.add('review-load-failure');
                }
            }

        });
        templateContainer.appendChild(reviewsFragment);
    }

    //Грузим JSON файл
    function loadReviews(callback) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 10000;
        xhr.open('get', 'data/reviews.js');
        xhr.send();

        xhr.onreadystatechange = function (evt) {
            var loadedXhr = evt.target;

            switch (loadedXhr.ReadyState) {
                case ReadyState.OPENED:
                case ReadyState.HEADERS_RECEIVED:
                case ReadyState.LOADING:
                {
                    templateContainer.classList.add('.pictures-loading');
                    break;
                }
                case ReadyState.DONE:
                default:
                {
                    if (xhr.status === 200) {
                        var data = loadedXhr.response;
                        templateContainer.classList.remove('.pictures-loading');
                        console.log(data);
                        callback(JSON.parse(data));
                    }
                    if (xhr.status > 400) {
                        showLoadFailure();
                    }
                    ;
                    xhr.ontimeout = function () {
                        showLoadFailure();
                    };
                }

            }
        }

    }

    //Рабочая функция фильтров
    function workingFilters (reviews, filterid)
    {
        var filteredReviews = reviews.slice(0);
        switch (filterid) {
            case 'reviews-recent':
            {
                filteredReviews.
            }
            case 'reviews-good':
            case 'reviews-bad':
            case 'reviews-popular':
            case 'reviews-all':
            default:
        }
    }

    loadReviews(reviewsRender);

    //Возврат фильтров
    var reviewsFilterAppear = document.getElementById('reviews-filter');
    reviewsFilterAppear.classList.remove('invisible');

})();