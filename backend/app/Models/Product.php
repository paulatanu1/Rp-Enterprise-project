<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Tymon\JWTAuth\Contracts\JWTSubject;

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
    
}
