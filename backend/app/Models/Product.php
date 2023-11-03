<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use DB;


class Product extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    public $timestamps = false;
    protected $table = 'product';

    protected $fillable = [
        'id', 'status', 'lot_no', 'stone_id', 'location', 'weight', 'shape', 'color', 'clarity', 'cut', 'polish', 'symmetry', 'rapnet_price', 'system_discount', 'lab', 'certificate', 'certi_pdf_url', 'ratio', 'measurements', 'fluor_int', 'table', 'depth', 'crown_ht', 'crown_angle', 'pavilion_dep', 'pavilion_an', 'stone_type', 'v360', 'imgurl', 'eye_clean'
    ];

    public static function addRecord($insertArray){
        $result = Product::create($insertArray);
        return $result;
    }


    public static function productList($post,$page_number = '', $no_of_records = ''){
        $productArr = Product::select('id', 'status', 'lot_no', 'stone_id', 'location', 'weight', 'shape', 'color', 'clarity', 'cut', 'polish', 'symmetry', 'rapnet_price', 'system_discount', 'lab', 'certificate', 'certi_pdf_url', 'ratio', 'measurements', 'fluor_int', 'table', 'depth', 'crown_ht', 'crown_angle', 'pavilion_dep', 'pavilion_an', 'stone_type', 'v360', 'imgurl', 'eye_clean');

        if (!empty($post['sort_by']) && !empty($post['order_by'])) {
            $productArr->orderBy($post['sort_by'], $post['order_by']);
        } else if (empty($post['sort_by']) && !empty($post['order_by'])) {
            $productArr->orderBy('lot_no', $post['order_by']);
        }

        if (!empty($post['search'])) {
            $search_by = ["stone_type","weight", "shape", "color", "clarity"];
            if (!empty($post['search_by'])) {
                $search_by = $post['search_by'];
            }

            $search_word = $post['search'];

            $productArr->where(function ($productArr) use ($search_by, $search_word) {
                foreach ($search_by as $key => $val) {                    
                    if ($key == 0) {
                        $productArr->where($val, 'LIKE', '%' . $search_word . '%');
                    } else {
                        $productArr->orWhere($val, 'LIKE', '%' . $search_word . '%');
                    }
                }
            });
        }
        if (!empty($post['stone_type'])) {
            $productArr->whereIn('stone_type', $post['stone_type']);
        }
        if (!empty($post['weight'])) {
            $productArr->whereIn('weight', $post['weight']);
        }
        if (!empty($post['shape'])) {
            $productArr->whereIn('shape', $post['shape']);
        }
        if (!empty($post['color'])) {
            $productArr->whereIn('color', $post['color']);
        }
        if (!empty($post['clarity'])) {
            $productArr->whereIn('clarity', $post['clarity']);
        }
        
        if ($page_number && $no_of_records) {
            $offset = $no_of_records * ($page_number - 1);
            $productArr = $productArr->offset($offset)->limit($no_of_records)->get();
        } else {
            $productArr = $productArr->get();
        }

        if ($productArr) {
            $productArr = $productArr;
        } else {
            $productArr = array();
        }
        return $productArr;
    }

    public static function fetchProductById($id){
        $result = Product::where('id',$id['product_id'])->first();
        return $result;
    }

    public static function stoneType(){
        $result = Product::select('stone_type')->groupBy('stone_type')->get();
        return $result;
    }
    public static function shape(){
        $result = Product::select('shape')->groupBy('shape')->get();
        return $result;
    }
    public static function color(){
        $result = Product::select('color')->groupBy('color')->get();
        return $result;
    }
    public static function clarity(){
        $result = Product::select('clarity')->groupBy('clarity')->get();
        return $result;
    }

    public static function deleteProduct($product_id){
        $result = Product::where('id', $product_id)->delete();
        return $result;
    }
    public static function weight(){
        
        $result = Product::select(DB::raw("CONCAT('RP','stone_id') AS stone_id"), 'weight')->orderBy('weight', 'desc')->limit(10)->get();
        return $result;
    }
    public static function popularShapes(){

        $result = Product::select('shape', DB::raw('MAX(weight) as max_weight'), DB::raw("CONCAT('RP','stone_id') AS stone_id"))
        ->groupBy('shape')
        ->orderBy('max_weight', 'desc')
        ->get();    
        return $result;
    }
    
}
