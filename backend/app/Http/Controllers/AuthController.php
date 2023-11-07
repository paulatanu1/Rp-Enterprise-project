<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use  App\Models\Contact;
use  App\Models\Product;
use App\Libraries\Helpers;




class AuthController extends Controller
{

    public function contact(Request $request) {
        $error_message = $success_message = $http_response = '';
        $result_arr = $post_array = array();
        $flag = true;
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

            $maildata = array('name' => (string)$request->input('name'), "body" => (string)$request->input('email'), "mess" => (string)$request->input('message'), "mobile" => (string)$request->input('phone'));

            Mail::send('mail', $maildata, function ($message) use ($user_data) {
                $message->to(env('SEND_MAIL_ADDRESS'), env('MAIL_FROM_NAME'))
                ->subject($user_data['subject']);
                $message->from(env('SEND_MAIL_ADDRESS'), env('MAIL_FROM_NAME'));
            });

            // Mail::send('mail', $user_data, function ($message) use ($user_data) {
            //     $message->to($user_data['from_email'], $user_data['email_name'])->subject($user_data['subject']);
            //     $message->from($user_data['from_email'], $user_data['email_name']);
            // });
            $success_message = 'Email sent successfully';
            $http_response = 'http_response_ok';
            
            return Helpers::json_response($result_arr, $http_response, $error_message, $success_message);
        } catch (\Exception $e) {
            // Log or output the error message for debugging
            dd($e->getMessage());
        }
        
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

    public function productList(Request $request)
    {
        $error_message = $success_message = $http_response = '';
        $result_arr = $post_array = array();
        $flag = true;
        if ($request->input('sort_by') == '') {
            $post['sort_by'] = "";
        } else {
            $post['sort_by'] = $request->input('sort_by');
        }
        if ($request->input('order_by') == '') {
            $post['order_by'] = "";
        } else {
            $post['order_by'] = $request->input('order_by');
        }

        if ($request->input('page_number') == '') {
            $page_number = 1;
        } else {
            $page_number = $request->input('page_number');
        }
        if ($request->input('no_of_records') == '') {
            $no_of_records = env('NO_OF_RECORDS');
        } else {
            $no_of_records = $request->input('no_of_records');
        }
        if ($request->input('search') == '') {
            $post['search'] = "";
        } else {
            $post['search'] = $request->input('search');
        }
        if ($request->input('search_by') == '') {
            $post['search_by'] = "";
        } else {
            $post['search_by'] = $request->input('search_by');
        }
        if ($request->input('stone_type') == '') {
            $post['stone_type'] = '';
        } else {
            $post['stone_type'] = $request->input('stone_type');
        }
        if ($request->input('weight') == '') {
            $post['weight'] = '';
        } else {
            $post['weight'] = $request->input('weight');
        }
        if ($request->input('shape') == '') {
            $post['shape'] = '';
        } else {
            $post['shape'] = $request->input('shape');
        }
        if ($request->input('color') == '') {
            $post['color'] = '';
        } else {
            $post['color'] = $request->input('color');
        }
        if ($request->input('filter_by') == '') {
            $post['filter_by'] = '';
        } else {
            $post['filter_by'] = $request->input('filter_by');
        }
        if ($request->input('clarity') == '') {
            $post['clarity'] = '';
        } else {
            $post['clarity'] = $request->input('clarity');
        }

        $productListArrCount = Product::productList($post);
        $productListArr = Product::productList($post, $page_number, $no_of_records);
        if (!empty($productListArr)) {
            foreach ($productListArr as $key => $items) {
                // Original price
                // $originalPrice = $items['rapnet_price']; // Replace this with your original price
                $originalPrice = $items['rapnet_price']; // Replace this with your original price

                // Discount percentage
                $discountPercentage = $items['system_discount']; // Replace this with your discount percentage

                // Calculate the discount amount
                $discountAmount = ($originalPrice * $discountPercentage) / 100;

                // Calculate the discounted price
                $discountedPrice = $originalPrice - $discountAmount;
                $discountedPrice = number_format($discountedPrice, 2, '.', ',');

                $weight = $items['weight'];
                $system_amount = $discountedPrice * $weight;
                $system_amount = number_format($system_amount, 2, '.', ',');

                $stone_id = "RP" . $items['stone_id'];
                $productListArr[$key]['system_price'] = $discountedPrice;
                $productListArr[$key]['system_amount'] = $system_amount;
                $productListArr[$key]['product_name'] = $stone_id;
            }

            if (!empty($productListArr)) {
                $success_message = 'Fetch successfully';
                $http_response = 'http_response_ok';
                $result_arr['dataset'] = $productListArr;
                $result_arr['total_count'] = count($productListArrCount);
            } else {
                $result_arr['dataset'] = array();
                $result_arr['total_count'] = 0;
                $error_message = 'Result not found';
                $http_response = 'http_response_ok_no_content';
            }
        }

        return Helpers::json_response($result_arr, $http_response, $error_message, $success_message);
    }
    public function stoneType(Request $request){
        $error_message = $success_message = $http_response = '';
        $result_arr = $post_array = array();
        $flag = true;
        $stoneType = Product::stoneType();
        if (!empty($stoneType)) {
            $result_arr['dataset'] = $stoneType;
            $success_message = 'Data Fetch successfully';
            $http_response = 'http_response_ok';
        } else {
            $error_message = 'Data not found';
            $http_response = 'http_response_bad_request';
        }
        return Helpers::json_response($result_arr, $http_response, $error_message, $success_message);
    }

    public function shape(Request $request){
        $error_message = $success_message = $http_response = '';
        $result_arr = $post_array = array();
        $flag = true;
        $shape = Product::shape();
        if (!empty($shape)) {
            $result_arr['dataset'] = $shape;
            $success_message = 'Data Fetch successfully';
            $http_response = 'http_response_ok';
        } else {
            $error_message = 'Data not found';
            $http_response = 'http_response_bad_request';
        }
        return Helpers::json_response($result_arr, $http_response, $error_message, $success_message);
    }

    public function color(Request $request){
        $error_message = $success_message = $http_response = '';
        $result_arr = $post_array = array();
        $flag = true;
        $color = Product::color();
        if (!empty($color)) {
            $result_arr['dataset'] = $color;
            $success_message = 'Data Fetch successfully';
            $http_response = 'http_response_ok';
        } else {
            $error_message = 'Data not found';
            $http_response = 'http_response_bad_request';
        }
        return Helpers::json_response($result_arr, $http_response, $error_message, $success_message);
    }

    public function clarity(Request $request){
        $error_message = $success_message = $http_response = '';
        $result_arr = $post_array = array();
        $flag = true;
        $clarity = Product::clarity();
        if (!empty($clarity)) {
            $result_arr['dataset'] = $clarity;
            $success_message = 'Data Fetch successfully';
            $http_response = 'http_response_ok';
        } else {
            $error_message = 'Data not found';
            $http_response = 'http_response_bad_request';
        }
        return Helpers::json_response($result_arr, $http_response, $error_message, $success_message);
    }
    public function newArrivel(Request $request){
        $error_message = $success_message = $http_response = '';
        $result_arr = $post_array = array();
        $flag = true;
        $productArr = Product::weight();
        // dd($productArr);
        
        if (!empty($productArr)) {
            foreach ($productArr as $key => $item) {
                // dd($item); // Check the content of the item

                // Original price
                $originalPrice = $item->rapnet_price;

                // Discount percentage
                $discountPercentage = $item->system_discount;

                // Calculate the discount amount
                $discountAmount = ($originalPrice * $discountPercentage) / 100;

                // Calculate the discounted price
                $discountedPrice = $originalPrice - $discountAmount;
                
                // $discountedPrice = number_format($discountedPrice, 2, '.', ',');

                // Calculate the system amount
                $weight = $item->weight;
                // dump($discountedPrice,$item->id);
                $systemAmount = $discountedPrice * $weight;
                $systemAmount = number_format($systemAmount, 2, '.', ',');
                // dd($systemAmount);

                // Update the object with the calculated values
                $item->system_price = $discountedPrice;
                $item->system_amount = $systemAmount;
            }

            if (!empty($productArr)) {
                $result_arr['dataset'] = $productArr;
                $success_message = 'Data fetch successfully';
                $http_response = 'http_response_ok';
            } else {
                $error_message = 'Data not found';
                $http_response = 'http_response_ok_no_content';
            }
        } else {
            $error_message = 'Data not found';
            $http_response = 'http_response_bad_request';
        }
        return Helpers::json_response($result_arr, $http_response, $error_message, $success_message);
    }
    public function popularShapes(Request $request){
        $error_message = $success_message = $http_response = '';
        $result_arr = $post_array = array();
        $flag = true;
        $productArr = Product::popularShapes();
        if (!empty($productArr)) {
            foreach ($productArr as $key => $item) {
                // dd($item); // Check the content of the item

                // Original price
                $originalPrice = $item->rapnet_price;

                // Discount percentage
                $discountPercentage = $item->system_discount;

                // Calculate the discount amount
                $discountAmount = ($originalPrice * $discountPercentage) / 100;

                // Calculate the discounted price
                $discountedPrice = $originalPrice - $discountAmount;
                // $discountedPrice = number_format($discountedPrice, 2, '.', ',');

                // Calculate the system amount
                $weight = $item->weight;
                $systemAmount = $discountedPrice * $weight;
                $systemAmount = number_format($systemAmount, 2, '.', ',');

                // Update the object with the calculated values
                $item->system_price = $discountedPrice;
                $item->system_amount = $systemAmount;
            }
            if (!empty($productArr)) {
                $result_arr['dataset'] = $productArr;
                $success_message = 'Data fetch successfully';
                $http_response = 'http_response_ok';
            } else {
                $error_message = 'Data not found';
                $http_response = 'http_response_ok_no_content';
            }
        } else {
            $error_message = 'Data not found';
            $http_response = 'http_response_bad_request';
        }
        
        return Helpers::json_response($result_arr, $http_response, $error_message, $success_message);
    }
}
