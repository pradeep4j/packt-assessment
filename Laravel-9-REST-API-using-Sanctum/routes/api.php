<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\User\UserAuthController;
use App\Http\Controllers\BookController;
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
Route::middleware('auth:sanctum')->group( function () {
//    Route::post('/add-book',[BookController::class,'store']);
    Route::get('/view-book',[BookController::class,'index']);
    Route::get('/edit-book/{id}',[BookController::class,'edit']);
   // Route::put('/update-book/{id}',[BookController::class,'update']);//->middleware('apfd');
    Route::delete('/delete-book/{id}',[BookController::class,'destroy']);
    
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 Route::post('/add-book',[BookController::class,'store']);
 Route::post('/update-book/{id}',[BookController::class,'update']);//->middleware('apfd');
Route::prefix('user')->group(function() {
    Route::post('register', [UserAuthController::class, 'register']);
    Route::post('login', [UserAuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group( function () {
        Route::get('logout', [UserAuthController::class, 'logout']);
        Route::get('/view-book',[BookController::class,'index']);
        Route::post('/searchBookRecords',[BookController::class,'show']);
    });
});
/*Route::controller(RegisterController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
});*/
     
/*Route::middleware('auth:sanctum')->group( function () {
    Route::resource('products', ProductController::class);
});*/

require __DIR__.'/admin.php';
