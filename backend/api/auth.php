<?php

use app\core\Auth;

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/core/apiCommon.php';
require_once __DIR__ . '/core/rest.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hashedPassword = $_POST['hashedPassword'] ?? null;
    if (!$hashedPassword) {
        sendResponse(['message' => 'Не введен пароль'], 422);
    }

    $auth = Auth::getFromHashedPassword($hashedPassword);
    if (!$auth->isAdmin()) {
        sendResponse(['message' => 'Неверно введены авторизационные данные'], 401);
    }

    sendResponse(['data' => true]);
}









