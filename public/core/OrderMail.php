<?php
require_once __DIR__ . '/Mail.php';

class OrderMail extends Mail {


    public function getErrors($data)
    {
        $name = $data['name'] ?? '';
        $phone = $data['phone'] ?? '';

        $errors = [];
        if (!preg_match('/^[а-яёa-z_\-\s\'"]{2,}$/iu', $name))
            $errors[] = 'Имя должно содержать не менее 2 символов и состоять из символов русского или латинского алфавита.';

//        if (!preg_match('/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/', $phone))
//            $errors[] = 'Требуемый формат телефона: +7 (999) 999-99-99.';
        if (strlen($phone) == 0)
            $errors[] = 'Требуемый формат телефона: +7 (999) 999-99-99.';

        return $errors;
    }
}