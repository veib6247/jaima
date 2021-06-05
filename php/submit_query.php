<?php
// return cURL reponse
echo execute_query($_GET['query']);


// cURL function to do the API call to mangadex
function execute_query($manga_title) {
  $curl = curl_init();

  curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.mangadex.org/manga?title=" . urlencode($manga_title), // encode the query to prevent errors
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "GET"
  ]);

  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  if ($err) {
    return "cURL Error #:" . $err;
  } else {
    return $response;
  }
}