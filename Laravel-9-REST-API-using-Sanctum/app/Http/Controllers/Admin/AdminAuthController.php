<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;  //to store images to database and storage folder path
use Illuminate\Support\Str;  //to generate random numbers as Str::random().
use App\Models\Admin;
class AdminAuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['login', 'register']]);
    }

    public function login(Request $request) {
       $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
                return response()->json(['status'=> 400 ,'message' => $validator->messages()]);
        }
        $user = Admin::where('email', $request->email)->first();
        if(!$user)
            return response()->json(['status'=> 400 ,'message' => 'Admin User Does Not Exists!']);
        if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 400,
                    'message' => 'Email/Password is wrong!!',
                ]);
        }
        $token = $user->createToken("API TOKEN")->plainTextToken;
        return response()->json(['status' => 201 ,'message' => [
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expiration' => 525600,
        ]]);
    }
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => ['required','string'],
            'email' => ['required','email','unique:admins'],
            'password' => ['required','string','min:8','max:15']
        ]);
        try{
            if ($validator->fails()) {
                return response()->json(['status'=> 400 ,'message' => $validator->messages()]);
            }
            else{
                if($request->hasFile('image')){
                    $imageName = time().'.'.$request->image->extension();  
                    $request->image->move(public_path('admin/images/'), $imageName);
                    $user = Admin::create(array_merge($validator->validated(),['password' => Hash::make($request->input('password'))],['image' => $imageName]));
                }
                else
                {
                    $validatedData = $validator->validated();
                    $validatedData['password'] = Hash::make($request->input('password'));
                    $validatedData['image'] = '';
                    $user = Admin::create($validatedData);
                }
                $token = $user->createToken("API TOKEN")->plainTextToken;

                return response()->json(['status' => 201 ,'message' => [
                    'user' => $user,
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'expiration' => 525600,
                ]]);
            }
        }
        catch(Exception $e)
        {
            Log::error($e->getMessage());
            return response()->json(['status'=> 500 ,'message' => $e->getMessage()]);
        }    
    }
    public function logout(Request $request) {
        $user = auth()->user();  
    // revoke the users token     
    $user->tokens()->delete(); 
       
    return response()->json(['status'=> 201,'message'=>'Admin User is successfully Logged out!']); 
    }
}
