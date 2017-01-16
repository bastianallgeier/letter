<?php 

date_default_timezone_set('UTC');

// define all the stuff we need to load
$config    = __DIR__ . '/../config/config.php';
$theme     = __DIR__ . '/../config/styles.css';
$signature = __DIR__ . '/../config/signature.png';

// load all options
$data = array_replace_recursive(require(__DIR__ . '/defaults.php'), file_exists($config) ? require($config) : []);

// set the current date as default date
$data['date'] = date($data['dateFormat']);

// make it nice
$styles  = file_get_contents(__DIR__ . '/defaults.css');
$styles .= file_exists($theme) ? PHP_EOL . file_get_contents($theme) : null;

// load the signature if it exists
$data['signature'] = file_exists($signature) ? 'data:image/png;base64,' . base64_encode(file_get_contents($signature)) : null;

// set the browser title
$title = $data['title'];

// template loader
function template($data) {

  $custom   = __DIR__ . '/../config/template.php';
  $default  = __DIR__ . '/template.php';
  $file     = file_exists($custom) ? $custom : $default;

  ob_start();
  extract($data);
  require($file);
  $template = ob_get_contents();
  ob_end_clean();

  return $template;

}

$template = template($data);