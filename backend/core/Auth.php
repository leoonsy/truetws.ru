<?php

namespace app\core;

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

class Auth
{
    public string $adminHashedPassword;
    public string $password;
    public string $hashedPassword;
    public bool $fromHashedPassword;
    
    public static function getFromHashedPassword($hashedPassword) {
        return new Auth(['hashedPassword' => $hashedPassword]);
    }

    public static function getFromPassword($password) {
        return new Auth(['password' => $password]);
    }

    public function isAdmin() {
        if ($this->fromHashedPassword) {
            return $this->hashedPassword === $this->adminHashedPassword;
        } else {
            return password_verify($this->password, $this->adminHashedPassword);
        }
    }
    
    private function __construct($params) {
        if(isset($params['password'])) {
            $this->fromHashedPassword = false;
            $this->password = $params['password'];
        }

        if(isset($params['hashedPassword'])) {
            $this->fromHashedPassword = true;
            $this->hashedPassword = $params['hashedPassword'];
        }
        
        $this->adminHashedPassword = $_ENV['ADMIN_PASSWORD'];
    }
}