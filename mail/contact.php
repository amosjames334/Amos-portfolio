<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if(empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(500);
  exit();
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$m_subject = strip_tags(htmlspecialchars($_POST['subject']));
$message = strip_tags(htmlspecialchars($_POST['message']));

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';  // Replace with your SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'your-email@gmail.com';  // Replace with your email
    $mail->Password = 'your-app-password';  // Replace with your app password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Recipients
    $mail->setFrom($email, $name);
    $mail->addAddress('jaimes.a@northeastern.edu');
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(true);
    $mail->Subject = "$m_subject: $name";
    $mail->Body = "
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Subject:</strong> $m_subject</p>
        <p><strong>Message:</strong><br>$message</p>
    ";
    $mail->AltBody = "Name: $name\nEmail: $email\nSubject: $m_subject\nMessage: $message";

    $mail->send();
    http_response_code(200);
} catch (Exception $e) {
    error_log("Mailer Error: " . $mail->ErrorInfo);
    http_response_code(500);
}
?>
