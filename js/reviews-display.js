/**
 * Created by petrfomichev on 28.09.15.
 */

(function()
{
    var reviewsClassName =
    {

    '1': 'review-rating-one',
    '2': 'review-rating-two',
    '3': 'review-rating-three',
    '4': 'review-rating-four',
    '5': 'review-rating-five'

    }

    var reviewsFilter = document.getElementById('reviews-filter');
    reviewsFilter.className = 'invisible';

    var templateContainer = document.querySelector('.reviews-list');
    var templateReview = document.getElementById('review-template');

    var reviewsFragment = document.createDocumentFragment();

    reviews.forEach(function (reviews, i)
    {
        var newReviewElement = templateReview.content.children[0].cloneNode(true);

        newReviewElement.querySelector('.review-rating').classList.add(reviewsClassName[reviews['rating']]);
        newReviewElement.querySelector('.review-text').textContent = reviews['description'];

        reviewsFragment.appendChild(newReviewElement);

        if (reviews['author']['picture']) {
            var backgroundImage = new Image();
            backgroundImage.src = reviews['author']['picture'];
            backgroundImage.style.backgroundSize = '124px 124px';
            backgroundImage.className = "review-author";

            backgroundImage.onload = function ()
            {
                var dummyImage = newReviewElement.querySelector('img.review-author');
                newReviewElement.replaceChild(backgroundImage, dummyImage);
            }

            backgroundImage.onerror = function(evt)
            {
                newReviewElement.classList.add('review-load-failure');
            }
        }

    });

    templateContainer.appendChild(reviewsFragment);

    var reviewsFilterAppear = document.getElementById('reviews-filter');
    reviewsFilterAppear.classList.remove('invisible');
})();