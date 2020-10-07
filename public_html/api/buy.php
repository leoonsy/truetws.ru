<?php
require_once __DIR__ . '/../core/apiCommon.php';
require_once __DIR__ . '/../core/rest.php';
require_once __DIR__ . '/../core/Mail.php';
require_once __DIR__ . '/../core/OrderMail.php';
require_once __DIR__ . '/../core/MailConfig.php';
require_once __DIR__ . '/../core/View.php';

//использую json для взаимодействия, так привычней
$name = $_POST['name'];
$phone = $_POST['phone'];
$hdn = $_POST['hdn'];
$price = json_decode(file_get_contents(__DIR__ . '/../db/main.json'))
    ->new_price;

if ($hdn) {
    sendResponse([
        'type' => 'botDetected',
        'message' => 'Вы, вероятно, бот'
    ], 403);
}

$mail = new OrderMail();
$errors = $mail->getErrors(['name' => $name, 'phone' => $phone]);
if ($errors) {
    sendResponse([
        'type' => 'validationError',
        'message' => 'Неверно заполнены данные',
        'errors' => $errors
    ], 422);
}

if (!is_numeric($price)) {
    sendResponse([
        'type' => 'priceError',
        'message' => 'Не определена цена'
    ], 500);
}

$renderData = [
    'name' => $name,
    'phone' => $phone,
    'price' => $price,
    'ip' => $_SERVER['REMOTE_ADDR'],
    'date' => date('Y-m-d H:i:s')
];

$orderTxt = View::render(__DIR__ . '/../templates_mail/orderText.tpl', $renderData, true);
$orderHtml = View::render(__DIR__ . '/../templates_mail/orderHTML.tpl', $renderData, true);

try {
    $mail->send($orderTxt, $orderHtml);
    sendResponse(['message' => "Сообщение успешно отправлено"]);
} catch (Exception $e) {
    sendResponse([
        'type' => 'mailError',
        'message' => $e->getMessage()
    ]);
}







