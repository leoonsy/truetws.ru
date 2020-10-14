<?php
namespace app\core;

use Exception;
use PHPMailer\PHPMailer\PHPMailer;

abstract class Mail {
    /**
     * Проверить данные заказа на ошибки
     *
     * @param array $data
     * @return array
     */
    public abstract function getErrors(array $data);

    /**
     * Отправить сообщение на почту
     *
     * @param string $txtMessage
     * @param string $htmlMessage
     * @return void
     * @throws Exception
     */
    public function send(string $txtMessage, string $htmlMessage) {
        $mail = new PHPMailer(true);
        try {
            $mail->CharSet = "utf-8";
            $mail->isSMTP();
            $mail->SMTPAuth = true;
            $mail->Host = $_ENV['HOST_SMTP'];
            $mail->Port = (int)$_ENV['PORT_SMTP'];
            $mail->SMTPSecure = 'ssl';
            $mail->Username = $_ENV['USERNAME_SMTP'];
            $mail->Password = $_ENV['PASSWORD_SMTP'];
            $mail->FromName = $_ENV['NAME_SMTP'];
            $mail->From = $_ENV['USERNAME_SMTP'];

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