<?php
namespace app\core;

//текущая конфигурация отправки почты

abstract class MailConfig
{
    public static array $to = [
        [
            'email' => 'truelandingsmail@ya.ru',
            'name' => 'truelandingsmail truelandingsmail'
        ],
        [
            'email' => 'tsapenko.a97@ya.ru',
            'name' => 'Цапенко Александр'
        ],
        [
            'email' => 'yashanovsky.sergey@ya.ru',
            'name' => 'Яшановский Сергей'
        ],
        [
            'email' => 'tsapenko.a97@mail.ru',
            'name' => 'Цапенко Александр'
        ]
    ];

    public static string $topic = 'Заказ наушников i12 TWS';
}
