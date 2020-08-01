<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once  '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require_once  '../vendor/phpmailer/phpmailer/src/SMTP.php';
require_once  '../vendor/phpmailer/phpmailer/src/Exception.php';

class Mail {
    /**
     * Отправить сообщение на почту
     *
     * @param array $params
     * @return void
     * @throws Exception
     */
    public function send($params) {
        $mail = new PHPMailer(true);
        try {
            $mail->CharSet = "utf-8";
            $mail->isSMTP();
            $mail->SMTPAuth = true;
            $mail->SMTPDebug = 2;
            $mail->Host = $params['host'];
            $mail->Port = $params['port'];
            $mail->SMTPSecure = 'ssl';
            $mail->Username = $params['username'];
            $mail->Password = $params['password'];
            $mail->FromName = $params['from']['name'];
            $mail->From = $params['from']['email'];

            foreach ($params['to'] as $address)
                $mail->addAddress($address['email'], $address['name']);

            $mail->isHTML(true);
            $mail->Subject = $params['topic'];
            $mail->Body    = $params['bodyHTML'];
            $mail->AltBody = $params['bodyText'];
            $mail->send();
        } catch (Exception $e) {
            throw new Exception("Ошибка отправки письма: {$mail->ErrorInfo}");
        }
    }
}