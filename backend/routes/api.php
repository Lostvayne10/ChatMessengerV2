<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::group([

    'middleware' => 'jwt.auth',
    'prefix' => 'v1'

], function ($router) {

    Route::post('/auth/logout', 'AuthController@logout');
    Route::post('/auth/refresh', 'AuthController@refresh');
    Route::get('/auth/expire', 'AuthController@respondWithToken');
    

});

   

Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'v1' ] , function() {
    Route::get('/chat', 'HomeController@index')->name('chat');
    Route::get('/chat/{conversationId}', 'HomeController@index')->name('chat');

    Route::post('/profile', 'ProfileController@update');
    Route::get('/conversations', 'ConversationController@index');
    Route::get('/messages', 'MessageController@index');
    Route::post('/messages', 'MessageController@store');
});


Route::group([

    'prefix' => 'v1'

], function ($router) {

    Route::post('/auth/login', 'AuthController@login');
    Route::post('/auth/register', 'AuthController@register');

});

