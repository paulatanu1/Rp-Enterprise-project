<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Newsletter extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    public $timestamps = false;
    protected $table = 'news_letter';

    protected $fillable = [
        'id', 'email_id', 'created_at'
    ];

    public static function addRecord($insertArray){
        $result = Newsletter::create($insertArray);
        return $result;
    }

    public static function newsLetterList($page_number = null, $no_of_records=null){
        $newsLetterArr = Newsletter::select('id', 'email_id', 'created_at');

        if ($page_number && $no_of_records) {
            
            $offset = $no_of_records * ($page_number - 1);
            $newsLetterArr = $newsLetterArr
                ->offset($offset)
                ->limit($no_of_records)
                ->get();
        } else {
            $newsLetterArr = $newsLetterArr->get();
        }

        if ($newsLetterArr) {
            $newsLetterArr = $newsLetterArr;
        } else {
            $newsLetterArr = [];
        }
        return $newsLetterArr;
    }

    public static function findUser($param){
        $result = Newsletter::where('email_id',$param)->first();
        return $result;
    }

    
}
