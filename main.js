


document.getElementById('create').addEventListener('click', function() {
    // Получаем значения из input
    var count = document.getElementById('text1').value;
    var lang = document.getElementById('text2').value;

    // Выводим первый блок кода (clickButton)
    console.log(`function clickButton() {
    var button = document.querySelector('.btn.btn-sm.btn-info');
    for (var i = 0; i < ${count}; i++) {
        button.click();
    }
}
    
clickButton();

`);

    // Выводим второй блок кода (selectElements) с исключением элемента по id
    console.log(`const selectElements = document.querySelectorAll('select.select2-hidden-accessible:not(#select2-uclientpush-lng_id_default-container)');

selectElements.forEach(selectElement => {
    selectElement.value = '${lang}'; // Замените 'en' на нужное значение
    const event = new Event('change', { bubbles: true });
    selectElement.dispatchEvent(event);
});`);
});



document.getElementById('create').addEventListener('click', function() {
    // Получаем текст из textarea и разбиваем его на массив строк
    const textInput = document.getElementById('textInput').value;
    const texts = textInput.split('\n').filter(line => line.trim() !== ''); // Убираем пустые строки

    // Выводим код в консоль
    console.log(`// Текст, который нужно добавить
const texts = ${JSON.stringify(texts, null, 4)};

// Получаем все элементы tr
const rows = document.querySelectorAll('#messageDataList tr');

// Проверяем, что количество строк совпадает с количеством текстов
if (rows.length !== texts.length) {
    console.error('Количество строк и текстов не совпадает!');
} else {
    // Проходим по каждой строке
    rows.forEach((row, index) => {
        // Находим второй td в строке
        const td = row.querySelector('td:nth-child(2)');
        if (td) {
            // Находим textarea внутри td
            const textarea = td.querySelector('textarea');
            if (textarea) {
                // Добавляем текст в textarea
                textarea.value = texts[index];
            } else {
                console.error('Textarea не найден в строке', index);
            }
        } else {
            console.error('td:nth-child(2) не найден в строке', index);
        }
    });
}`);
});

document.getElementById('create').addEventListener('click', function() {
    // Получаем текст из textarea и разбиваем его на массив строк
    const textInput2 = document.getElementById('textInput2').value;
    const texts2 = textInput2.split('\n').filter(line => line.trim() !== ''); // Убираем пустые строки

    // Выводим код в консоль для третьего столбца
    console.log(`// Текст, который нужно добавить
const texts2 = ${JSON.stringify(texts2, null, 4)};

// Получаем все элементы tr
const rows2 = document.querySelectorAll('#messageDataList tr');

// Проверяем, что количество строк совпадает с количеством текстов
if (rows2.length !== texts2.length) {
    console.error('Количество строк и текстов не совпадает!');
} else {
    // Проходим по каждой строке
    rows2.forEach((row, index) => {
        // Находим третий td в строке
        const td = row.querySelector('td:nth-child(3)');
        if (td) {
            // Находим textarea внутри td
            const textarea = td.querySelector('textarea');
            if (textarea) {
                // Добавляем текст в textarea
                textarea.value = texts2[index];
            } else {
                console.error('Textarea не найден в строке', index);
            }
        } else {
            console.error('td:nth-child(3) не найден в строке', index);
        }
    });
}`);
});











// Перехватываем вывод console.log
(function () {
    const oldLog = console.log; // Сохраняем оригинальный console.log
    const infoBlock = document.querySelector('.info'); // Находим блок .info

    console.log = function (message) {
        // Выводим сообщение в консоль (оригинальный функционал)
        oldLog.apply(console, arguments);

        // Добавляем сообщение в блок .info
        if (infoBlock) {
            infoBlock.innerHTML += `<pre>${message}</pre>`; // Используем <pre> для форматирования
        }
    };
})();








document.getElementById('copy').addEventListener('click', function() {
    // Получаем текст из блока .info
    const infoBlock = document.querySelector('.info');
    if (infoBlock) {
        const textToCopy = infoBlock.innerText; // Получаем текст без HTML-тегов

        // Копируем текст в буфер обмена
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Текст успешно скопирован!');
                alert('Текст скопирован в буфер обмена!'); // Уведомление пользователя
            })
            .catch((err) => {
                console.error('Ошибка при копировании текста:', err);
                alert('Не удалось скопировать текст.'); // Уведомление об ошибке
            });
    } else {
        console.error('Блок .info не найден!');
    }
});