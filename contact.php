<?php
// Contact form handler
header('Content-Type: application/json');

// Obfuscated email - decode at runtime
$encoded_email = 'b2xhYXMuZnJhbmNhcnRAZ21haWwuY29t';
$recipient_email = base64_decode($encoded_email);

// Validate and sanitize input
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
$subject = 'Nieuw bericht van Linux website';

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Alle velden zijn verplicht.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Ongeldig e-mailadres.']);
    exit;
}

// Email headers
$headers = [
    'From: ' . $email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Email body
$email_body = "Naam: $name\n";
$email_body .= "E-mail: $email\n\n";
$email_body .= "Bericht:\n$message\n";

// Send email
$mail_sent = mail($recipient_email, $subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    echo json_encode(['success' => true, 'message' => 'Bericht succesvol verzonden!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Fout bij verzenden. Probeer het later opnieuw.']);
}
?>
