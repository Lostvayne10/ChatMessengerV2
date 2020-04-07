<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\User;
use Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', [ 'except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        
        Auth::login(User::where('email', request(['email']))->get()->first());

        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => User::where('email', request(['email']))->get()->first()
        ], 200);
        
       /* $credentials = request(['email', 'password']);
        
        //return $credentials;
        $validator = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $token = JWTAuth::attempt($credentials);
  

        if($token){
            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => User::where('email', request(['email']))->get()->first()
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Wron Validation',
                
                
            ],401);
        }

        return $token;*/

    }

    public function register(Request $request)
    {
    
        $credentials = request(['email', 'password']);


        $validator = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'confirm_password' => 'required_with:password|same:password|min:6'
        ]);
        
    

        User::create(
            [
                'name' => $request['name'],
                'email' => $request['email'],
                'password' => bcrypt($request['password']),
            ]
        );
        
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        
       
        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => auth()->user()
        ], 200);

        /*
        $token = JWTAuth::attempt($credentials);
  

        if($token){
            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => User::where('email', request(['email']))->get()->first()
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Wron Validation',
                
                
            ],401);
        }

        return $token;*/

    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}