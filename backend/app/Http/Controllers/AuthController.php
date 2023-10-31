<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use  App\Models\Contact;
use App\Mail\YourMailable;
use Illuminate\Support\Facades\View;
use Symfony\Component\Mime\Part\TextPart;




class AuthController extends Controller
{

    public function mail(Request $request) {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email',
        ]);

        $product = new Contact();
        $product->name = $request->input('name');
        $product->email = $request->input('email');
        $product->phone = $request->input('phone');
        $product->subject = $request->input('subject');
        $product->message = $request->input('message');
        $product->save();

        $user_data = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'subject' => $request->input('subject'),
            'message' => $request->input('message'),
            'from_email' => env('SEND_MAIL_ADDRESS'),
            'email_name' => env('MAIL_FROM_NAME'),
        ];

        try {
            // $emailContent = View::make('mail', $user_data)->render();
            // $textPart = new TextPart($emailContent);
            Mail::send('mail', $user_data, function($message) use ($user_data) {
            $message->to($user_data['email'], $user_data['name'])->subject($user_data['subject']);
            $message->from($user_data['from_email'], $user_data['email_name']);
            

            });
        } catch (\Exception $e) {
            // Log or output the error message for debugging
            dd($e->getMessage());
        }
        echo 'Email Sent. Check your inbox.';
    }
    public function sendEmail(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email',
        ]);

        $product = new Contact();
        $product->name = $request->input('name');
        $product->email = $request->input('email');
        $product->phone = $request->input('phone');
        $product->subject = $request->input('subject');
        $product->message = $request->input('message');
        $product->save();
        // dd("hhhhh");

        $data = [
            'name' => 'Arunkumar',
            'message' => 'This is a test email from Selva',
        ];

        $res = Mail::to('bera6648@gmail.com', 'Arunkumar')
        ->send(new YourMailable($data));
        dd($res);

        dd ("done");
    }

    // public function __construct()
    // {
    //     $this->middleware('auth:api', ['except' => ['login', 'refresh', 'logout']]);
    // }
    /**
     * Get a JWT via given credentials.
     *
     * @param  Request  $request
     * @return Response
     */

    public function register(Request $request) {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->save();

        return response()->json(
            [
                'message' => 'User registered successfully'
            ], 200
        );
    }

    public function login(Request $request){

        $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['email', 'password']);

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
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
    public function logout(){
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(){
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => auth()->user(),
            'role' => auth()->user()->role,
            'expires_in' => auth()->factory()->getTTL() * 60 * 24
        ]);
    }
}
