<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminAuthController;
Route::prefix('admin')->group(function() {
    Route::post('login',[AdminAuthController::class,'login']);
    Route::post('register', [AdminAuthController::class, 'register']);
    Route::middleware('auth:sanctum')->group( function () {
        Route::get('logout', [AdminAuthController::class,'logout']);
    });
});


?>