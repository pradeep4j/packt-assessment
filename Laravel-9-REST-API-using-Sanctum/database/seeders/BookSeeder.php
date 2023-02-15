<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use File;
use App\Models\Book;
class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Book::truncate();
  
        $json = File::get("database/data/bookdata.json");
        $countries = json_decode($json);
  
        foreach ($countries as $key => $value) {
            Book::create([
                "title" => $value->title,
                "author" => $value->author,
                "genres" => $value->genres,
                "description" => $value->description,
                "ISBN" => $value->ISBN,
                "Image" => $value->Image,
                "publishDate" => $value->publishDate,
                "publisher" => $value->publisher
            ]);
        }
    }
}
