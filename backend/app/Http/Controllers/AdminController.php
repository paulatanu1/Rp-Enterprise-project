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
        return response()->json(
            [
                'message' => 'Product add successfully'
            ],
            200
        );
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

        $productListArr = Product::productList($post, $page_number, $no_of_records);
        $productListArrCount = Product::productList($post, $page_number, $no_of_records);
        if(!empty($productListArr)){
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
        return Helpers::json_response($result_arr, $http_response, $error_message, $success_message);

    }
}
