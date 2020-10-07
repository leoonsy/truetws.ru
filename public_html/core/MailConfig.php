<?php
namespace app\core;

//текущая конфигурация отправки почты

abstract class MailConfig
{
    public static array $to = [
        [
            'email' => 'yashanovsky.sergey@ya.ru',
            'name' => 'Яшановский Сергей'
        ]
    ];

    public static string $topic = 'Заказ наушников i12 TWS';
}
