(function() {

    var formElements = document.forms['review-form'];

    var nameField = formElements['review-name'];
    var textField = formElements['review-text'];
    var nameFieldnotOK = true;
    var textFieldnotOK = true;
    var userMark = 0;
    var userName = '';


    nameField.onchange = function (evt) {

        var nameLabel = document.getElementById('label-name');
        if (nameField.value === '') {
            nameLabel.style.display = '';
        }
        else {
            nameLabel.style.display = 'none';
            nameFieldnotOK = false;
        }
    };


    textField.onchange = function (evt) {

        var textLabel = document.getElementById('label-text');
        if (textField.value === '') {
            textLabel.style.display = '';
        }
        else {
            textLabel.style.display = 'none';
            textFieldnotOK = false;
        }
    };

    formElements.onsubmit = function(evt) {
        var timeBirth = new Date(1992, 11, 17);
        var myAgeInMS = new Date - timeBirth;

        var myAgeDays = parseInt(myAgeInMS/1000/60/60/24, 10);
        var timeExpires = new Date;
        timeExpires.setDate(timeExpires.getDate() + myAgeDays);

        userMark = formElements['review-mark'].value;
        userName = nameField.value;

        if (nameFieldnotOK == true) {
            alert("Вы не заполнили имя!");
        }
        else {
            if (textFieldnotOK == true) {
                alert('Вы не заполнили текст отзыва!');
            }
                else {
                    alert('Все работает!');

                    docCookies.setItem('userName', userName, timeExpires.toUTCString());
                    docCookies.setItem('userMark', userMark, timeExpires.toUTCString());

                    formElements.submit();
                }
            }
        }


    })();


