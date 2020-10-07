<?php

namespace app\core;

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

class Auth
{
    public string $passwd;
    
    public function __construct($passwd) {
        $this->passwd = $passwd;
    }
    
    public function isAdmin() {
        return $this->passwd === $_ENV['ADMIN_PASSWD'];
    }
}