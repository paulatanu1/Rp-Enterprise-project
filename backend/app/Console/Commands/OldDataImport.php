<?php

namespace App\Console\Commands;

use Helpers;
use Illuminate\Console\Command;
use App\Models\Product;

class OldDataImport extends Command
{
    protected $signature = 'OldDataImport:old-data-import';
    protected $description = 'Cron for add from xlsx file';
    public static $process_busy = false;

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        if (self::$process_busy == false) {
            $file   = "public/uploads/" . "stock List 26-09-23.csv";
            $filename = fopen($file, "r");
            $all_data = array();
            

            while (($data = fgetcsv($filename)) !== FALSE) {
                $all_data[] = $data;
                $blank = $all_data;
                $blank = '';
                if (count($all_data) > 1 && !$blank = '') {
                    if (!empty($all_data)) {
                        if ($data[0] == "Available"){
                            $status = 1;
                        }else{
                            $status = 0;
                        }

                        if ($data[30] == "YES"){
                            $eye_clean = 1;
                        }else{
                            $eye_clean = 0;
                        }

                        $add['status'] = $status;
                        $add['lot_no'] = $data[1];
                        $add['stone_id'] = $data[2];
                        $add['location'] = $data[3];
                        $add['weight'] = $data[4];
                        $add['shape'] = $data[5];
                        $add['color'] = $data[6];
                        $add['clarity'] = $data[7];
                        $add['cut'] = $data[8];
                        $add['polish'] = $data[9];
                        $add['symmetry'] = $data[10];
                        $add['rapnet_price'] = $data[11];
                        $add['system_discount'] = $data[12];
                        // $add['system price'] = $data[13];
                        // $add['system amount'] = $data[14];
                        $add['lab'] = $data[15];
                        $add['certificate'] = $data[16];
                        $add['certi_pdf_url'] = $data[17];
                        $add['ratio'] = $data[18];
                        $add['measurements'] = $data[19];
                        $add['fluor_int'] = $data[20];
                        $add['table'] = $data[21];
                        $add['depth'] = $data[22];
                        $add['crown_ht'] = $data[23];
                        $add['crown_angle'] = $data[24];
                        $add['pavilion_dep'] = $data[25];
                        $add['pavilion_an'] = $data[26];
                        $add['stone_type'] = $data[27];
                        $add['v360'] = $data[28];
                        $add['imgurl'] = $data[29];
                        $add['eye_clean'] = $eye_clean;

                        Product::create($add);
                    } else {
                        break;
                    }
                    echo "Data Add Successfully: " . $data[24] . "\n";
                }
            }
            return true;
        } else {
            
            return false;
        }
    }
}
