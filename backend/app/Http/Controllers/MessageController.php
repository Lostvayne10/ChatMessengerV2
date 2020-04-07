<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use DB;

class MessageController extends Controller
{


    public function index(Request $request)
    {
        $userId = $request->from_id;
        $contactId = $request->contact_id;
        return Message::select(
                'id',
                //DB::raw("IF(`from_id`=$userId, TRUE, FALSE) as written_By_Me"),
                DB::raw("(CASE WHEN from_id = $userId THEN '1' ELSE '0' END) as written_By_Me"), 
                'created_at',
                'content')
            ->where(function ($query) use ($userId, $contactId){
                $query->where('from_id', $userId)->where('to_id', $contactId);
            })
            ->orWhere(function ($query) use ($userId, $contactId){
                $query->orWhere('from_id', $contactId)->where('to_id', $userId);
            })->get();
    }

    public function store(Request $request)
    {   
        $message = new Message();
        $message->from_id= $request->from_id;
        $message->to_id= $request->to_id;
        $message->content=$request->content;
        $saved = $message->save();

        $data = [];
        $data['success'] = $saved;
        $data['message'] = $message;
        return $data;
    }
}
