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
    $hashedPassword = $_POST['hashedPassword'] ?? null;
    if (!$hashedPassword) {
        sendResponse(['message' => 'Не введены авторизационные данные'], 401);
    }
    
    $auth = Auth::getFromHashedPassword($hashedPassword);
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
    
    if ((int)$newPrice < 0 || (int)$oldPrice < 0) {
        sendResponse(['message' => 'Цена не может быть отрицательной'], 500);
    }

    $db = json_decode(file_get_contents(__DIR__ . '/../db/main.json'));
    $db->newPrice = $newPrice;
    $db->oldPrice = $oldPrice;
    file_put_contents(__DIR__ . '/../db/main.json', json_encode($db));
    sendResponse();
}









