<?php
header('Content-Type: application/json');

/**
 * Ответ в виде json
 *
 * @param array $data
 * @param int $code
 * @return void
 */
function sendResponse($data = [], $code = 200)
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit(0);
}