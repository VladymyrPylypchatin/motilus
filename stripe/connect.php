<?php
 header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 1);
error_reporting(E_ALL);

  define('CLIENT_ID', 'ca_EmzVoielLenakb0J3VIA5Ozrzuc64VjV');
  define('API_KEY', 'sk_live_s1rgJYQKDw5vbRzDltD7Hjrs00H8N2Yuwe');
  define('TOKEN_URI', 'https://connect.stripe.com/oauth/token');
  define('AUTHORIZE_URI', 'https://connect.stripe.com/oauth/authorize');


  if (isset($_GET['code'])) { // Redirect w/ code
    $code = $_GET['code'];
    $token_request_body = array(
      'client_secret' => API_KEY,
      'grant_type' => 'authorization_code',
      'client_id' => CLIENT_ID,
      'code' => $code,
    );
    $req = curl_init(TOKEN_URI);
    curl_setopt($req, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($req, CURLOPT_POST, true );
    curl_setopt($req, CURLOPT_POSTFIELDS, http_build_query($token_request_body));
    // TODO: Additional error handling
      $respCode = curl_getinfo($req, CURLINFO_HTTP_CODE);
      $resp = curl_exec($req);
       curl_close($req);
           
       $responseObject = json_decode($resp);
       $userId = $responseObject->stripe_user_id;
       header("Location: https://www.motil.us/specialist/myaccount?code=" . $userId);
      // echo $responseObject.stripe_user_id;
    //echo $resp;
   
  } else if (isset($_GET['error'])) { // Error
    echo $_GET['error_description'];
  } else { // Show OAuth link
    $authorize_request_body = array(
      'response_type' => 'code',
      'scope' => 'read_write',
      'client_id' => CLIENT_ID
    );
    $url = AUTHORIZE_URI . '?' . http_build_query($authorize_request_body);
    echo "<a href='$url'>Connect with Stripe</a>";
  }