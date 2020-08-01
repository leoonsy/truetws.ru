<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . '/../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/../vendor/phpmailer/phpmailer/src/SMTP.php';
require_once __DIR__ . '/../vendor/phpmailer/phpmailer/src/Exception.php';
require_once __DIR__ . '/MailConfig.php';

abstract class Mail {
    /**
     * Проверить данные заказа на ошибки
     *
     * @param array $data
     * @return array
     */
    public abstract function getErrors($data);

    /**
     * Отправить сообщение на почту
     *
     * @param string $txtMessage
     * @param string $htmlMessage
     * @return void
     * @throws Exception
     */
    public function send($txtMessage, $htmlMessage) {
        $mail = new PHPMailer(true);
        try {
            $mail->CharSet = "utf-8";
            $mail->isSMTP();
            $mail->SMTPAuth = true;
            $mail->Host = MailConfig::$hostSMTP;
            $mail->Port = MailConfig::$portSMTP;
            $mail->SMTPSecure = 'ssl';
            $mail->Username = MailConfig::$usernameSMTP;
            $mail->Password = MailConfig::$passwordSMTP;
            $mail->FromName = MailConfig::$nameSMTP;
            $mail->From = MailConfig::$usernameSMTP;

            foreach (MailConfig::$to as $address)
                $mail->addAddress($address['email'], $address['name']);

            $mail->isHTML(true);
            $mail->Subject = MailConfig::$topic;
            $mail->Body    = $htmlMessage;
            $mail->AltBody = $txtMessage;
            $mail->send();
        } catch (Exception $e) {
            throw new Exception($mail->ErrorInfo);
        }
    }
}