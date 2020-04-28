
// Якщо потрібен вивід дати та час + хвилин, тоді до спана з датою додаємо клас "time" <span class="date-1 time"></span>.
// Працює як в порядку спадання, так і в порядку зростання.

document.addEventListener("DOMContentLoaded", Datee);

function Datee() {
    var msInDay = 86400000,
        counterLength = 90,
        months, countryName = 'ru',  // Встановлюємо мову для місяців.
        isAbbreviated = false, // Якщо потрібно скорочений варіант місяців з трьох букв, наприклад "янв", "июн" і т.д, тоді ставим TRUE.
        localDate = new Date();

    switch(countryName) {
        case 'it':  // Italy
            months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
            break;
        case 'es':  // Spain
            months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            break;
        case 'fr':  // France
            months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            break;
        case 'pt':  // Portugal
            months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            break;
        case 'de':  // Germany
            months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
            break;
        case 'bg':  // Bulgaria
            months = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];
            break;
        case 'pl':  // Poland
            months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
            break;
        case 'ro':  // Romania
            months = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
            break;
        case 'id':  // Indonesia
            months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Nopember', 'Desember'];
            break;
        case 'cz':  // Czech Republic
            months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
            break;
        case 'hu':  // Hungary (Румунія)
            months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
            break;
        case 'gr':  // Greece
        case 'cy':  // Cyprus (Кіпр)
            months = ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'];
            break;
        case 'ar':  // Арабська
            months = ['يناير', 'فبراير', 'مسيرة', 'أبريل', 'قد', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
            break;
        case 'th':  // тайланд
            months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
            break;
        case 'ru':  // Russia
            months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
            break;
    }

    if (isAbbreviated) {
        for (var i = 0; i < months.length; i++) {
            months[i] = months[i].slice(0, 3).toLowerCase();  // Прибираємо ".toLowerCase()", якщо перша буква повинна бути великою.
        }
    }

    for (var counter = 0; counter < counterLength; counter++) {
        var dateClass = "date-" + counter,
            nodeList = document.getElementsByClassName(dateClass),
            date = new Date(localDate.getTime() - counter * msInDay),
            timeCounter = 0;
        timeArray = time(nodeList/*, true*/); // Розкоментувати, якщо необхідне сортування в порядку спадання.

        timeArray = timeFormat(timeArray);

        for(var i = 0; i < nodeList.length; i++) {
            var data = nodeList[i].dataset;

            if (data.format) {
                nodeList[i].innerHTML = format(date, data.format);
                // format: особливий формать для окремої дати. Додаєм як data-format="фомарт". Формати дивитись в switch'і нижче. dd - цифри, day - прописом.
                // <span class="date-1" data-format="dd month yyyy"></span> - мотає на 1 день назад і виводить цей span у вигляді "24 Липня 1995".
            } else {
                nodeList[i].innerHTML = format(date/*, "dd month yyyy"*/); // Default: dd.mm.yyyy ADD FORMAT HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
            }
            if (/\btime\b/.test(nodeList[i].className)) {
                nodeList[i].innerHTML += " " + timeArray[timeCounter]; // Рядок для формату виводу часу.
                timeCounter++;
            }
        }
    }

    // <span clas="date-NUMBER"></span> - мотає час назад на NUMBER днів. Наприклад, <span className="date-5"></span>
    // <span clas="dateNUMBER"></span> - мотає час вперед на NUMBER днів. Наприклад, <span className="date5"></span>

    for (var counter = 0; counter < counterLength; counter++) {
        var dateClass = "date" + counter,
            nodeList = document.getElementsByClassName(dateClass),
            date = new Date(localDate.getTime() + counter * msInDay),
            timeCounter = 0;
        timeArray = time(nodeList/*, true*/); // Розкоментувати, якщо необхідне сортування в порядку спадання.

        timeArray = timeFormat(timeArray);

        for(var i = 0; i < nodeList.length; i++) {
            var data = nodeList[i].dataset;

            if (data.format) {
                nodeList[i].innerHTML = format(date, data.format);
                // format: особливий формать для окремої дати. Додаєм як data-format="фомарт". Формати дивитись в switch'і нижче. dd - цифри, day - прописом.
                // <span class="date-1" data-format="dd month yyyy"></span> - мотає на 1 день назад і виводить цей span у вигляді "24 Липня 1995".
            } else {
                nodeList[i].innerHTML = format(date/*, "dd month yyyy"*/); // Default: dd.mm.yyyy ADD FORMAT HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
            }
        }
    }



    function time(nodeList, reverse) {
        var timeArray = [];

        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].className.match(/\btime\b/)) {
                timeArray.push(timeRandom());
            }
        }

        if (reverse) timeArray.sort(function(a, b) { return b - a; });
        else timeArray.sort(function(a, b) { return a - b; });

        return timeArray;
    }

    function timeRandom() {
        return Math.round(0 + Math.random() * 1440);
    }

    function timeFormat(timearray) {
        var array = [];

        for (var i = 0; i < timearray.length; i++) {
            var htemp = Math.floor(timearray[i] / 60), mtemp = timearray[i] % 60,
                hours = htemp < 10 ? "0" + htemp : htemp,
                minutes = mtemp < 10 ? "0" + mtemp : mtemp;
            array.push(hours + ":" + minutes);
        }


        return array;
    }

    function format(date, formatstring) {
        var innerDate = "",
            day = date.getDate(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            fo = formatstring || true;
        var  monthsAnother = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        switch (fo) {
            case "yyyy":
                innerDate += "" + year;
                return innerDate;

            case "yyyy-1":
                innerDate += "" + year - 1;
                return innerDate;

            case "mm.dd.yyyy":
                innerDate += (month < 10) ? ("0" + month) : month;
                innerDate += ".";
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += "." + year;
                return innerDate;

            case "month":
                innerDate += months[month - 1];
                return innerDate;

            case "monthAnother":
                innerDate += monthsAnother[month - 1];
                return innerDate;

            case "monthNext":
                innerDate += monthsAnother[month === 12 ? 0 : month + 0];
                return innerDate;

            case "dd":
                innerDate += (day < 10) ? ("0" + day) : day;
                return innerDate;

            case "dd month":
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += " ";
                innerDate += months[month - 1];
                return innerDate;

            case "dd month yyyy":
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += " ";
                innerDate += months[month - 1];
                innerDate += " " + year;
                return innerDate;

            case "day dd, month yyyy":
                var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
                innerDate += days[new Date(year, month - 1, day).getDay()];
                innerDate += " ";
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += " ";
                innerDate += months[month - 1];
                innerDate += " " + year;
                return innerDate;

            case "dd/mm/yyyy":
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += "/";
                innerDate += (month < 10) ? ("0" + month) : month;
                innerDate += "/" + year;
                return innerDate;

            case "dd-mm-yyyy":
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += "-";
                innerDate += (month < 10) ? ("0" + month) : month;
                innerDate += "-" + year;
                return innerDate;

            default:
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += ".";
                innerDate += (month < 10) ? ("0" + month) : month;
                innerDate += "." + year;
                return innerDate;
        }
    }
}

/* carousel* */
$(document).ready(function () {
    $(".spiner_click").on("click", function (e) {
        e.preventDefault();

        function spin() {
            if (document.querySelector('.wheel-img').classList.contains('rotated')) {
                document.querySelector('.spin-result-wrapper').style.display = "block";
            } else {
                document.querySelector('.wheel-img').classList.add('super-rotation');
                setTimeout(function () {
                    document.querySelector('.spin-result-wrapper').style.display = "block";
                }, 8000);
                setTimeout(function () {
                    $('.spin-wrapper').slideUp();
                    $('.order_block').slideDown();
                }, 10000);
                document.querySelector('.wheel-img').classList.add('rotated');
            }
        };

        spin();
    });

});
/* */
var closePopup = document.querySelector('.close-popup');

$('.close-popup, .pop-up-button').click(function (e) {
    e.preventDefault();
    $('.spin-result-wrapper').fadeOut();
    var _href = "#roulette";
});

/* */

// pop-up-button
$(document).ready(function() {
    $(".pop-up-button").on("touchend, click", function (e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: $('#scroll_form').offset().top
        }, 700);
    });
});