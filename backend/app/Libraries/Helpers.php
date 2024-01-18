<?php

namespace App\Libraries;

class Helpers {

    public static function pre($array, $die = false) {
        echo '<pre>';
        print_r($array);
        echo '</pre>';
        if ($die) {
            die();
        }
    }

    public static function json_response($data = array(), $http_response, $error_message, $success_message, $error_msg_details = '') {
        $developer = 'developer';
        $version = str_replace('_', '.', env('API_VERSION'));

        $raws = array();
        if ($error_message != '') {
            $raws['error_message'] = $error_message;
            if ($error_msg_details != '') {
                $raws['error_msg_details'] = $error_msg_details;
            }
        } else {
            $raws['success_message'] = $success_message;
        }

        $raws['data'] = $data;

        $raws['publish'] = array(
            'version' => $version,
            'developer' => $developer,
        );
        //echo config('app.status_code.'.$http_response);die;
        $response = array(
            'raws' => $raws,
        );

        $status_code = static::status_code($http_response);

        return response(array(
            'response' => $response,
                ), $status_code);
    }

    public static function status_code($response) {
        $status_code = '';
        if ($response == 'http_response_ok') {
            $status_code = '200';
        } elseif ($response == 'http_response_accepted') {
            $status_code = '202';
        } elseif ($response == 'http_response_ok_no_content') {
            $status_code = '204';
        } elseif ($response == 'http_response_bad_request') {
            $status_code = '400';
        } elseif ($response == 'http_response_unauthorized') {
            $status_code = '401';
        } elseif ($response == 'http_response_forbidden') {
            $status_code = '403';
        }else{
            $status_code = '500';
        }
        return $status_code;
    } 

}
