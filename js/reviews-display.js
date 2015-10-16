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
    var reviews;

  //Добавляем класс invisible
  /**var reviewsFilterAppear = document.getElementById('reviews-filter');
  reviewsFilterAppear.classList.add('invisible');
  console.log(reviewsFilterAppear, 'invis on');**/

    //Блок ошибки загрузки
    function showLoadFailure() {
        templateContainer.classList.add('reviews-load-failure');
    }

    //Блок кода отвечающий за отрисовку комментариев
    function reviewsRender(reviewToRender) {
      templateContainer.classList.remove('hotels-list-failure');
      templateContainer.innerHTML = '';

        var templateReview = document.getElementById('review-template');
        console.log(reviewToRender);
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

      /**var reviewsFilterAppear = document.getElementById('reviews-filter');
      reviewsFilterAppear.classList.remove('invisible');
      console.log(reviewsFilterAppear, 'invis off');**/
      templateContainer.appendChild(reviewsFragment);
    }

    //Грузим JSON файл
    function loadReviews(callback) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 10000;
        xhr.open('get', 'data/reviews.json');
        xhr.send();

        xhr.onreadystatechange = function (evt) {
            var loadedXhr = evt.target;

            switch (loadedXhr.readyState) {
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
  //Функция инициализации фильтров
  function initFilters()
  {
    var filtersContainer = document.querySelector('.reviews-filter');
    for (var i = 0, l = filtersContainer.length; i < l; i++) {
      filtersContainer.onclick = function (evt)
      {
        var clickedFilter = evt.target;
        console.log(clickedFilter.value, '- это айди кнопки');
        setActiveFilter(clickedFilter.value);
      }
    }

  }

  function setActiveFilter(filterID) {
   var filteredReviews = workingFilters(reviews, filterID);
    reviewsRender(filteredReviews);
  }


  //Функция работы фильтров
    function workingFilters (reviews, filterID)
    {
        var filteredReviews = reviews.slice(0);
        switch (filterID) {
            case 'reviews-recent':
            {
              filteredReviews = filteredReviews.sort(function(a, b)
                {
                  aa = new Date(a.date);
                  bb = new Date(b.date);
                  if (aa < bb)
                  {
                    return 1;
                  }
                  if (aa > bb)
                  {
                    return -1;
                  }
                  if (aa === bb)
                  {
                    return 0;
                  }
                });
                  break;
            }
            case 'reviews-good':
            {
              filteredReviews = filteredReviews.sort(function(a, b)
              {
                if (a.rating < b.rating)
                {
                  return 1;
                }
                if (a.rating > b.rating)
                {
                  return -1;
                }
                if (a.rating === b.rating)
                {
                  return 0;
                }
              });
                break;
            }

            case 'reviews-bad':
            {
              filteredReviews = filteredReviews.sort(function(a, b)
              {
                if (a.rating > b.rating)
                {
                  return 1;
                }
                if (a.rating < b.rating)
                {
                  return -1;
                }
                if (a.rating === b.rating)
                {
                  return 0;
                }
              });
              break;
            }

          case 'reviews-popular':
          {
            filteredReviews = filteredReviews.sort(function(a, b)
            {
              if (a.review-rating > b.review-rating)
              {
                return 1;
              }
              if (a.review-rating < b.review-rating)
              {
                return -1;
              }
              if (a.review-rating === b.review-rating)
              {
                return 0;
              }
            });
            break;
          }

          case 'reviews-all':
            default:
            {
              var filteredReviews = reviews.slice(0);
              break;
            }
        }
      return(filteredReviews);
    }

  initFilters();
  loadReviews(function(loadedReviews) {
    reviews = loadedReviews;
    setActiveFilter('reviews-all');
  });

})();
