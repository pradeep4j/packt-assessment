<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; ///for making datbase validation before insert or update
use Illuminate\Support\Facades\Hash; //for making password encryption
use Illuminate\Support\Facades\File;  //to store images to database and storage folder path
use Illuminate\Support\Str;  //to generate random numbers as Str::random().
use App\Services\ParseInputStream;  //this class is used for getting values from html forms via put/patch/delete which was unable to find in $request->all() variable
use Illuminate\Support\Facades\Log;
class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum',['except' => ['store','update']]);
    }
    public function index()
    {
       // return 
       $allbooks = Book::orderBy('id', 'DESC')->get();
        if(count($allbooks)>0){
             return response()->json(['status' => 201, 'message' => $allbooks]);
            }
             else{
                return response()->json(['status' => 404, 'message' => 'No records founds!']);
             }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => ['required', 'string', 'max:100'],
            'author' => ['required', 'string', 'max:300'],
            'genres' => ['required', 'string'],//];, 'confirmed'],
            'description' => ['required','max:5000'],
          //  'image' => ['required','image','mimes:jpeg,png,jpg,gif,svg','max:3000'],
            'ISBN' => ['required','max:20'],
            'publishDate' => ['required','max:255'],
            'publisher' => ['required','max:255'],

        ]);
        try{
            //return response()->json(['status' => 202, 'message' => $request->hasFile('image')]);
            if(!$validator->fails()) {
                if($request->hasFile('Image')){
                    $imageName = time().'.'.$request->Image->extension();  
                    $request->Image->move(public_path('book/images/'), $imageName);
                    Book::create(array_merge($validator->validated(),['Image' => $imageName]));
                }
                else {
                    Book::create($validator->validated());
                }

                return response()->json(['status' => 201, 'message' => 'Book Inserted successfully!!']);
            }
            else{
                return response()->json(['status' => 400, 'message' => $validator->messages()]);
            }

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json(['status' => 500, 'message'=>'Something went wrong. Kindly check via try and catch!!']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        //return response()->json(['status' => 201, 'selectedBookRecord' => $request->searchValue]);
       $bookWithId = Book::where('title','like',"%" . $request->searchValue . "%")
                          ->orWhere('author','like',"%" . $request->searchValue . "%")
                          ->orWhere('publishDate','like',"%" . $request->searchValue . "%")
                          ->orWhere('isbn','like',"%" . $request->searchValue . "%")
                          ->orWhere('genres','like',"%" . $request->searchValue . "%")
                          ->get();
        if($bookWithId)
            return response()->json(['status' => 201, 'selectedBookRecord' => $bookWithId]);
            else{
                return response()->json(['status' => 404, 'selectedBookRecord' => 'No record found!']);
            }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $bookWithId = Book::find($id);
        if($bookWithId)
            return response()->json(['status' => 201, 'selectedBookRecord' => $bookWithId]);
        else
            return response()->json(['status' => 404, 'selectedBookRecord' => 'No Book ID Found!']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $bookid)
    {
        $Record=Book::find($bookid);
       // return response()->json(['status' => 400, 'message' => $request->all()]);
        $validator = Validator::make($request->all(),[
            'title' => ['required', 'string', 'max:100'],
            'author' => ['required', 'string', 'max:300'],
            'genres' => ['required', 'string'],//, 'min:20'],//];, 'confirmed'],
            'description' => ['required','max:5000'],
          //  'image' => ['required','image','mimes:jpeg,png,jpg,gif,svg','max:3000'],
            'ISBN' => ['required','max:20'],
            'publishDate' => ['required','max:255'],
            'publisher' => ['required','max:255'],

        ]);
        try{
            if(!$validator->fails()) {
                if($request->hasFile('Image')!==null){
                // remove old image
                    $imageR = $Record['Image'];
                    $exists = public_path('book/images/').$imageR;
                    if (File::exists($exists)) {
                        File::delete($exists);
                    }
                    //upload new image
                    $imageName = time().'.'.$request->Image->extension(); 
                    $request->Image->move(public_path('book/images/'), $imageName);
                   // $params['Image'] = $imageName;  
                    Book::whereId($bookid)->update(array_merge($validator->validated(),['Image' => $imageName])); //updating book records
                    return response()->json(['status' => 201, 'message' => 'Book Updated Successfully!!']);
                }
                else{
                    //when new image has not be uploaded same old image remains
                   // $params['image'] = $Record['image'];
                    Book::whereId($bookid)->update(array_merge($validator->validated(),['Image' => $Record['image']])); //updating book records
                    return response()->json(['status' => 201, 'message' => $request->file('Image')]);
                }
               
                
            }
            else{
                return response()->json(['status' => 400, 'message' => $validator->messages()]);
            }

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json(['status' => 500, 'message'=>'Something goes wrong while updating a book. Something went wrong. Kindly check via try and catch!!'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $BookTodelete = Book::findOrFail($id);
            $BookTodelete->delete();
            return response()->json(['status' => 201,'message' => 'Seleted Book deleted successfully!']);

        }
        catch(Exception $e){
            return response()->json(['status' => 400,'message'=> $e->message]);
        }
    }
    
}
