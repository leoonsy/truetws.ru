<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/core/apiCommon.php';
require_once __DIR__ . '/core/rest.php';

$db = json_decode(file_get_contents(__DIR__ . '/../db/main.json'));
$newPrice = $db->newPrice;
$oldPrice = $db->oldPrice;

sendResponse(['data' => [
    'newPrice' => $newPrice,
    'oldPrice' => $oldPrice
]]);









