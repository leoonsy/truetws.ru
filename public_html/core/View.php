<?php

class View
{
	/**
	 * Отрисовывает вид
	 *
	 * @param string $path Пусть до частей шаблона
	 * @param array $vars Массив замен
	 * @param boolean $return Записать результат в переменную
	 * @return void|string
	 */
	public static function render($path, $vars = [], $return = false)
	{
		extract($vars);
		ob_start();
		require_once($path);
		if ($return)
			return ob_get_clean();
		echo ob_get_clean();
	}
}
