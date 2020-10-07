<?php

use app\core\Auth;

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/core/apiCommon.php';
require_once __DIR__ . '/core/rest.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $db = json_decode(file_get_contents(__DIR__ . '/../db/main.json'));
    $newPrice = $db->newPrice;
    $oldPrice = $db->oldPrice;

    sendResponse(['data' => [
        'newPrice' => $newPrice,
        'oldPrice' => $oldPrice
    ]]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'] ?? null;
    if (!$password) {
        sendResponse(['message' => 'Не введены авторизационные данные'], 401);
    }
    
    $auth = new Auth($password);
    if (!$auth->isAdmin()) {
        sendResponse(['message' => 'Неверно введены авторизационные данные'], 401);
    }
    
    $newPrice = $_POST['newPrice'] ?? null;
    $oldPrice = $_POST['oldPrice'] ?? null;
    if ($newPrice == null || $oldPrice == null) {
        sendResponse(['message' => 'Не введена старая и новая цена'], 500);
    }
    
    if (!is_numeric($newPrice) || !is_numeric($oldPrice)) {
        sendResponse(['message' => 'Цена не является числом'], 500); 
    }

    $db = json_decode(file_get_contents(__DIR__ . '/../db/main.json'));
    $db->newPrice = $newPrice;
    $db->oldPrice = $oldPrice;
    file_put_contents(__DIR__ . '/../db/main.json', json_encode($db));
    sendResponse();
}









