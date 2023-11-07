<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\Product;
use App\Libraries\Helpers;





class AdminController extends Controller
{


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

    public function dashboard(Request $request)
    {
        dd("hhh");

        return response()->json(
            [
                'message' => 'User registered successfully'
            ],
            200
        );
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
            'user' => auth()->user(),
            'role' => auth()->user()->role,
            'expires_in' => auth()->factory()->getTTL() * 60 * 24
        ]);
    }

    public function productAdd(Request $request){
        $error_message = $success_message = $http_response = '';
        $result_arr = $post_array = array();
        $flag = true;
        $product = new Product();
        $product->status = $request->input('status');
        $product->lot_no = $request->input('lot_no');
        $product->stone_id = $request->input('stone_id');
        $product->location = $request->input('location');
        $product->weight = $request->input('weight');
        $product->shape = $request->input('shape');
        $product->color = $request->input('color');
        $product->clarity = $request->input('clarity');
        $product->cut = $request->input('cut');
        $product->polish = $request->input('polish');
        $product->symmetry = $request->input('symmetry');
        $product->rapnet_price = $request->input('rapnet_price');
        $product->system_discount = $request->input('system_discount');
        $product->lab = $request->input('lab');
        $product->certificate = $request->input('certificate');
        $product->certi_pdf_url = $request->input('certi_pdf_url');
        $product->ratio = $request->input('ratio');
        $product->measurements = $request->input('measurements');
        $product->fluor_int = $request->input('fluor_int');
        $product->table = $request->input('table');
        $product->depth = $request->input('depth');
        $product->crown_ht = $request->input('crown_ht');
        $product->crown_angle = $request->input('crown_angle');
        $product->pavilion_dep = $request->input('pavilion_dep');
        $product->pavilion_an = $request->input('pavilion_an');
        $product->stone_type = $request->input('stone_type');
        $product->v360 = $request->input('v360');
        $product->imgurl = $request->input('imgurl');
        $product->eye_clean = $request->input('eye_clean');
        $product->save();

        $success_message = 'Data add successfully';
        $http_response = 'http_response_ok';
        return Helpers::json_response($result_arr, $http_response, $error_message, $success_message);

    }

    public function productList(Request $request){
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
        if(!empty($productListArr)){
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
                $stone_id = "RP".$items['stone_id'];
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

    public function productEdit(Request $request){
        $error_message = $success_message = $http_response = '';
        $result_arr = $post_array = array();
        $flag = true;
        if ($request->input('product_id') == '') {
            $post['product_id'] = "";
        } else {
            $post['product_id'] = $request->input('product_id');
        }

        $productArr = Product::fetchProductById($post);
        if(!empty($productArr)){
            $productId = $productArr['id'];
            $product['status'] = $request->input('status');
            $product['lot_no'] = $request->input('lot_no');
            $product['stone_id'] = $request->input('stone_id');
            $product['location'] = $request->input('location');
            $product['weight'] = $request->input('weight');
            $product['shape'] = $request->input('shape');
            $product['color'] = $request->input('color');
            $product['clarity'] = $request->input('clarity');
            $product['cut'] = $request->input('cut');
            $product['polish'] = $request->input('polish');
            $product['symmetry'] = $request->input('symmetry');
            $product['rapnet_price'] = $request->input('rapnet_price');
            $product['system_discount'] = $request->input('system_discount');
            $product['lab'] = $request->input('lab');
            $product['certificate'] = $request->input('certificate');
            $product['certi_pdf_url'] = $request->input('certi_pdf_url');
            $product['ratio'] = $request->input('ratio');
            $product['measurements'] = $request->input('measurements');
            $product['fluor_int'] = $request->input('fluor_int');
            $product['table'] = $request->input('table');
            $product['depth'] = $request->input('depth');
            $product['crown_ht'] = $request->input('crown_ht');
            $product['crown_angle'] = $request->input('crown_angle');
            $product['pavilion_dep'] = $request->input('pavilion_dep');
            $product['pavilion_an'] = $request->input('pavilion_an');
            $product['stone_type'] = $request->input('stone_type');
            $product['v360'] = $request->input('v360');
            $product['imgurl'] = $request->input('imgurl');
            $product['eye_clean'] = $request->input('eye_clean');
            $adminMaster = Product::updateRecord($productId, $product);

            $success_message = 'Data update successfully';
            $http_response = 'http_response_ok';
        }else{
            $error_message = 'Data not found';
            $http_response = 'http_response_bad_request';
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

    public function productDelete(Request $request){
        $error_message = $success_message = $http_response = '';
        $result_arr = $post_array = array();
        $flag = true;
        if ($request->input('product_id') == '') {
            $post['product_id'] = "";
        } else {
            $post['product_id'] = $request->input('product_id');
        }

        $productArr = Product::fetchProductById($post);
        
        if (!empty($productArr)) {
            $deleteProduct = Product::deleteProduct($post['product_id']);
            $success_message = 'Data deleted successfully';
            $http_response = 'http_response_ok';
        } else {
            $error_message = 'Data not found';
            $http_response = 'http_response_bad_request';
        }
        return Helpers::json_response($result_arr, $http_response, $error_message, $success_message);
    }
    
    
}
