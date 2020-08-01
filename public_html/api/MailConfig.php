<?php

abstract class MailConfig
{
    public static $to = [
        [
            'email' => 'testyasha.web@ya.ru',
            'name' => 'Яшановский Сергей'
        ]
    ];

    public static $topics = [
        'order' => 'Заказ наушников i12 TWS'
    ];   

    public static $usernameSMTP = 'testyasha.web@ya.ru';
    public static $nameSMTP = 'Тест Тест';
    public static $passwordSMTP = '1234Qwer';
    public static $hostSMTP = 'ssl://smtp.yandex.ru';
    public static $portSMTP = 465;
}