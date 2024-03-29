<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->post('login', 'AuthController@login');
    $router->post('register', 'AuthController@register');
    $router->post('contact', 'AuthController@contact');
    $router->post('productList', 'AuthController@productList');
    $router->post('stoneType', 'AuthController@stoneType');
    $router->post('shape', 'AuthController@shape');
    $router->post('color', 'AuthController@color');
    $router->post('clarity', 'AuthController@clarity');
    $router->post('newArrivel', 'AuthController@newArrivel');
    $router->post('popularShapes', 'AuthController@popularShapes');
    $router->post('productView', 'AuthController@productView');
    $router->post('newsLatter', 'AuthController@newsLatter');
});

$router->group(['middleware' => 'admin'], function () use ($router) {
    $router->post('/admin/dashboard', 'AdminController@dashboard');
    $router->post('/admin/productAdd', 'AdminController@productAdd');
    $router->post('/admin/productList', 'AdminController@productList');
    $router->post('/admin/productEdit', 'AdminController@productEdit');
    $router->post('/admin/stoneType', 'AdminController@stoneType');
    $router->post('/admin/shape', 'AdminController@shape');
    $router->post('/admin/color', 'AdminController@color');
    $router->post('/admin/clarity', 'AdminController@clarity');
    $router->post('/admin/productDelete', 'AdminController@productDelete');
    $router->post('/admin/newsLetterList', 'AdminController@newsLetterList');
    // $router->post('/admin/newArrivel', 'AdminController@newArrivel');
    $router->post('logout', 'AuthController@logout');
    $router->post('refresh', 'AuthController@refresh');
    $router->post('me', 'AuthController@me');
});

$router->group(['middleware' => 'user'], function () use ($router) {
    $router->post('/user/profile', 'UserController@dashboard');
});
