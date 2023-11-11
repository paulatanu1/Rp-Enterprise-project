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

class Product extends Model implements
    AuthenticatableContract,
    AuthorizableContract
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
        'id',
        'status',
        'lot_no',
        'stone_id',
        'location',
        'weight',
        'shape',
        'color',
        'clarity',
        'cut',
        'polish',
        'symmetry',
        'rapnet_price',
        'system_discount',
        'lab',
        'certificate',
        'certi_pdf_url',
        'ratio',
        'measurements',
        'fluor_int',
        'table',
        'depth',
        'crown_ht',
        'crown_angle',
        'pavilion_dep',
        'pavilion_an',
        'stone_type',
        'v360',
        'imgurl',
        'eye_clean',
    ];

    public static function addRecord($insertArray)
    {
        $result = Product::create($insertArray);
        return $result;
    }

    public static function productList(
        $post,
        $page_number = '',
        $no_of_records = ''
    ) {
        $productArr = Product::select(
            'id',
            'status',
            'lot_no',
            'stone_id',
            'location',
            'weight',
            'shape',
            'color',
            'clarity',
            'cut',
            'polish',
            'symmetry',
            'rapnet_price',
            'system_discount',
            'lab',
            'certificate',
            'certi_pdf_url',
            'ratio',
            'measurements',
            'fluor_int',
            'table',
            'depth',
            'crown_ht',
            'crown_angle',
            'pavilion_dep',
            'pavilion_an',
            'stone_type',
            'v360',
            'imgurl',
            'eye_clean'
        );

        if (!empty($post['sort_by']) && !empty($post['order_by'])) {
            $productArr->orderBy($post['sort_by'], $post['order_by']);
        } elseif (empty($post['sort_by']) && !empty($post['order_by'])) {
            $productArr->orderBy('lot_no', $post['order_by']);
        }

        if (!empty($post['search'])) {
            $search_by = ['stone_type', 'weight', 'shape', 'color', 'clarity'];
            if (!empty($post['search_by'])) {
                $search_by = $post['search_by'];
            }

            $search_word = $post['search'];

            $productArr->where(function ($productArr) use (
                $search_by,
                $search_word
            ) {
                foreach ($search_by as $key => $val) {
                    if ($key == 0) {
                        if ($val == 'weight') {
                            $productArr->where($val, '<=', $search_word);
                        } else {
                            $productArr->where(
                                $val,
                                'LIKE',
                                '%' . $search_word . '%'
                            );
                        }
                    } else {
                        $productArr->orWhere(
                            $val,
                            'LIKE',
                            '%' . $search_word . '%'
                        );
                    }
                }
            });
        }
        if (!empty($post['stone_type'])) {
            $productArr->where('stone_type', $post['stone_type']);
        }
        if (!empty($post['weight'])) {
            $productArr->where('weight', $post['weight']);
        }
        if (!empty($post['shape'])) {
            $productArr->where('shape', $post['shape']);
        }
        if (!empty($post['color'])) {
            $productArr->where('color', $post['color']);
        }
        if (!empty($post['clarity'])) {
            $productArr->where('clarity', $post['clarity']);
        }

        if ($page_number && $no_of_records) {
            $offset = $no_of_records * ($page_number - 1);
            $productArr = $productArr
                ->offset($offset)
                ->limit($no_of_records)
                ->get();
        } else {
            $productArr = $productArr->get();
        }

        if ($productArr) {
            $productArr = $productArr;
        } else {
            $productArr = [];
        }
        return $productArr;
    }

    public static function fetchProductById($id)
    {
        $result = Product::where('id', $id['product_id'])->first();
        return $result;
    }

    public static function stoneType()
    {
        $result = Product::select('stone_type')
            ->groupBy('stone_type')
            ->get();
        return $result;
    }
    public static function shape()
    {
        $result = Product::select('shape')
            ->groupBy('shape')
            ->get();
        return $result;
    }
    public static function color()
    {
        $result = Product::select('color')
            ->groupBy('color')
            ->get();
        return $result;
    }
    public static function clarity()
    {
        $result = Product::select('clarity')
            ->groupBy('clarity')
            ->get();
        return $result;
    }

    public static function deleteProduct($product_id)
    {
        $result = Product::where('id', $product_id)->delete();
        return $result;
    }
    public static function weight()
    {
        $result = DB::table('product')
            ->select(
                'product.id',
                'product.shape',
                'weight as max_weight',
                'product.stone_id',
                'product.clarity',
                'product.cut',
                'product.v360',
                'product.imgurl',
                'product.certi_pdf_url',
                DB::raw('CONCAT("RP", product.stone_id) AS product_name'),
                'product.rapnet_price',
                'product.system_discount',
                'product.weight'
            )

            ->orderBy('max_weight', 'desc')
            ->limit(9)
            ->get()
            ->toArray();

        return $result;
    }
    public static function popularShapes()
    {
        $result = DB::table('product')
            ->select(
                'product.shape',
                'subquery.max_weight',
                'product.stone_id',
                'product.clarity',
                'product.cut',
                'product.v360',
                'product.imgurl',
                'product.certi_pdf_url',
                DB::raw('CONCAT("RP", product.stone_id) AS product_name'),
                'product.rapnet_price',
                'product.system_discount',
                'product.weight'
            )
            ->from(
                DB::raw(
                    '(SELECT shape, MAX(weight) as max_weight FROM product GROUP BY shape) as subquery'
                )
            )
            ->join('product', function ($join) {
                $join
                    ->on('subquery.shape', '=', 'product.shape')
                    ->on('subquery.max_weight', '=', 'product.weight');
            })
            ->orderBy('max_weight', 'desc')
            ->get()
            ->toArray();
        return $result;
    }
}
