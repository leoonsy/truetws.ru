<?php

use app\core\Auth;

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/core/apiCommon.php';
require_once __DIR__ . '/core/rest.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'] ?? null;
    if (!$password) {
        sendResponse(['message' => 'Не введен пароль'], 422);
    }

    $auth = Auth::getFromPassword($password);
    if (!$auth->isAdmin()) {
        sendResponse(['message' => 'Неверно введены авторизационные данные'], 401);
    }

    sendResponse(['data' => $auth->adminHashedPassword]);
}









