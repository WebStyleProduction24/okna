<?php
$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;

  $tel = trim($_POST["tel"]);
  $type_okno = trim($_POST["type_okno"]);
  $kreplenie = trim($_POST["kreplenie"]);
  $remen_nuzhen = trim($_POST["remen_nuzhen"]);
  $molniya_nuzhen = trim($_POST["molniya_nuzhen"]);
  $montazh_nuzhen = trim($_POST["montazh_nuzhen"]);
  $admin_email  = "2402404@bk.ru";
  $form_subject = trim($_POST["type_form"]);

  foreach ( $_POST as $key => $value ) {
    if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {

      if ($key === "tel" ) {
        $key = "Телефон";
      }
      elseif ($key === "type_okno") {
        $key = "Тип окна";
      }
      elseif ($key === "kreplenie") {
        $key = "Точки крепления в шторе";
      }
      elseif ($key === "remen_nuzhen") {
        $key = "Нужен ремень для фиксации окон?";
      }
      elseif ($key === "molniya_nuzhen") {
        $key = "Нужна молния в двери?";
      }
      elseif ($key === "montazh_nuzhen") {
        $key = "Нужен монтаж окон?";
      }
      elseif ($key === "type_form") {
        $key = "Наименование формы";
      }
      $message .= "
      " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>" . $key. "</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
      </tr>
      ";
    }
  }

$message = "<h1>Отправлено с сайта Окна в Воронеже</h1><table style='width: 100%;'>$message</table>";

function adopt($text) {
  return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers );