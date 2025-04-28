// Перехватываем console.log для вывода в .info с фильтрацией
(function () {
    const oldLog = console.log;
    const infoBlock = document.querySelector('.info');

    console.log = function (message) {
        oldLog.apply(console, arguments);
        if (typeof message === 'string' && (
            message.includes('Текст успешно скопирован!') ||
            message.includes('Ошибка при копировании текста:') ||
            message.includes('Блок .info не найден!')
        )) {
            return;
        }
        if (infoBlock) {
            infoBlock.innerHTML += `<pre>${message}</pre>`;
        }
    };
})();

// Единый обработчик для кнопки create
document.getElementById('create').addEventListener('click', function () {
    // Очищаем блок .info перед новым выводом
    const infoBlock = document.querySelector('.info');
    if (infoBlock) {
        infoBlock.innerHTML = '';
    }

    // Получаем значения из input и textarea
    const lang = document.getElementById('text2').value;
    const textInput = document.getElementById('textInput').value;
    const textInput2 = document.getElementById('textInput2').value;

    // Разбиваем текст на массивы строк
    const texts = textInput.split('\n').filter(line => line.trim() !== '');
    const texts2 = textInput2.split('\n').filter(line => line.trim() !== '');

    // Автоматически определяем количество ячеек из texts
    const count = texts.length;

    // Проверяем, что количество строк в textInput и textInput2 совпадает
    if (texts.length !== texts2.length) {
        console.error('Количество заголовков и сообщений не совпадает!');
        alert('Ошибка: Количество заголовков и сообщений должно быть одинаковым.');
        return;
    }

    // Код для генерации
    console.log(`function clickButton() {
    const button = document.querySelector('.btn.btn-sm.btn-info');
    console.log('Найдена кнопка .btn.btn-sm.btn-info: ', !!button);
    for (let i = 0; i < ${count}; i++) {
        if (button) {
            button.click();
            console.log('Клик по кнопке .btn.btn-sm.btn-info, итерация: ' + (i + 1));
        } else {
            console.error('Кнопка .btn.btn-sm.btn-info не найдена!');
        }
    }
}

clickButton();

// Ожидание добавления строк
setTimeout(() => {
    // Проверка количества строк после кликов
    const rows = document.querySelectorAll('#messageDataList tr');
    console.log('После кликов найдено строк в #messageDataList: ' + rows.length);
    console.log('Ожидаемое количество новых строк: ' + ${count});

    // Выбор языка в select
    const selectElements = document.querySelectorAll('select.select2-hidden-accessible:not(#select2-uclientpush-lng_id_default-container)');
    console.log('Найдено select элементов: ' + selectElements.length);
    selectElements.forEach(selectElement => {
        selectElement.value = '${lang}';
        const event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
    });

    // Заполнение последних ${count} строк для второго столбца (td:nth-child(2))
    const texts = ${JSON.stringify(texts, null, 4)};
    console.log('Заполняем последние ' + ${count} + ' строк для второго столбца');
    const rowsToFill = Array.from(rows).slice(-${count}); // Берем последние ${count} строк
    if (rowsToFill.length < ${count}) {
        console.error('Недостаточно строк для заполнения второго столбца! Найдено: ' + rowsToFill.length + ', ожидалось: ' + ${count});
    } else {
        rowsToFill.forEach((row, index) => {
            const td = row.querySelector('td:nth-child(2)');
            if (td) {
                let textarea = td.querySelector('textarea');
                if (!textarea) {
                    textarea = document.createElement('textarea');
                    textarea.className = 'form-control';
                    textarea.name = \`UClientPush[messageData][\${rows.length - ${count} + index}][title]\`;
                    td.innerHTML = '';
                    td.appendChild(textarea);
                }
                textarea.value = texts[index];
            } else {
                console.error('td:nth-child(2) не найден в строке', index);
            }
        });
    }

    // Заполнение последних ${count} строк для третьего столбца (td:nth-child(3))
    const texts2 = ${JSON.stringify(texts2, null, 4)};
    console.log('Заполняем последние ' + ${count} + ' строк для третьего столбца');
    const rowsToFill2 = Array.from(rows).slice(-${count}); // Берем последние ${count} строк
    if (rowsToFill2.length < ${count}) {
        console.error('Недостаточно строк для заполнения третьего столбца! Найдено: ' + rowsToFill2.length + ', ожидалось: ' + ${count});
    } else {
        rowsToFill2.forEach((row, index) => {
            const td = row.querySelector('td:nth-child(3)');
            if (td) {
                let textarea = td.querySelector('textarea');
                if (!textarea) {
                    textarea = document.createElement('textarea');
                    textarea.className = 'form-control';
                    textarea.name = \`UClientPush[messageData][\${rows.length - ${count} + index}][message]\`;
                    td.innerHTML = '';
                    td.appendChild(textarea);
                }
                textarea.value = texts2[index];
            } else {
                console.error('td:nth-child(3) не найден в строке', index);
            }
        });
    }

}, 2000); // Задержка 2 секунды для ожидания добавления строк
`);
});

// Обработчик для копирования текста из .info
document.getElementById('copy').addEventListener('click', function () {
    const infoBlock = document.querySelector('.info');
    if (infoBlock) {
        const textToCopy = infoBlock.innerText;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Текст успешно скопирован!');
                alert('Текст скопирован в буфер обмена!');
            })
            .catch((err) => {
                console.error('Ошибка при копировании текста:', err);
                alert('Не удалось скопировать текст.');
            });
    } else {
        console.error('Блок .info не найден!');
    }
});